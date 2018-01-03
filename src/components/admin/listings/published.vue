<template>
  <div>
    <!-- <div style="margin-bottom: 10px">
      <el-input placeholder="Please input" v-model="search" style="width:100%">
        <el-select v-model="searchType" slot="prepend" placeholder="Select" style="width:120px">
          <el-option label="Property ID" value="property_no"></el-option>
        </el-select>
        <el-button slot="append" icon="search"></el-button>
      </el-input>
    </div> -->
    <el-table
      v-loading.body="loading"
      :data="properties"
      style="">
      <el-table-column type="expand">
        <template scope="props">
          <el-row :gutter="20">
            <el-col :span="5" style="overflow:hidden">
              <img v-lazy="imgUrl+props.row.property_media[0].uploaded_filename" style="height:100px;"></img>
            </el-col>
            <el-col :span="19" class="text-left">
              <h4>{{props.row.property_detail.title}}</h4>
              <p>{{props.row.property_location.formatted_address}}</p>
              <p style="color:#666666">Updated {{props.row.updatedAt | moment("from")}}</p>
            </el-col>
          </el-row>
        </template>.row.
      </el-table-column>
      <el-table-column class="border"
        label="Date Created"
        prop="createdAt"
        align="left"
        sortable>
        <template scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ scope.row.createdAt | moment("from") }}</span>
        </template>
      </el-table-column>
      <el-table-column class="border"
        label="Offer Type"
        prop="offer_type"
        align="left"
        sortable>
        <template scope="scope">
          <span style="margin-left: 10px">{{ offerType(scope.row.offer_type) }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="Date Updated"
        prop="updatedAt"
        align="left"
        sortable>
        <template scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ scope.row.updatedAt | moment("from") }}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        label="Title"
        prop="property_detail.title"
        align="left"
        sortable>
      </el-table-column>
      <el-table-column
        label="Property ID"
        prop="property_no"
        align="left"
        sortable>
      </el-table-column>
      <el-table-column
        align="left"
        label="Operations">
        <template scope="scope">
          <el-button type="warning" size="small" @click="handleUnpublish(scope.row.id)" icon="circle-cross">Unpublish</el-button>
          <el-button type="text" size="small" @click="handlePreview(scope.row.property_no)">Preview</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="text-left" style="margin-top:10px"
      layout="total, prev, pager, next"
      :page-size="item_per_page"
      :total="total_properties"
      @current-change="switchToPage">
    </el-pagination>
  </div>
</template>

<script>
import { getProperties } from '../../../assets/utils/properties-api.js';

export default {
  name:'published',
  computed: {
    token : function () {
      return this.$store.getters.phillandsIdToken
    }
  },
  data(){
    return{
      loading: true,
      imgUrl:'',
      item_per_page: 10,
      total_properties:0,
      property_source:'',
      properties:[],
      searchType:'property_no',
      search:'',
      current_page:0
    }
  },
  methods:{
    handleUnpublish:function(propertyId){
      var property ={
        property_id:propertyId,
         status:0
      }
      this.axios.defaults.headers.common['token'] = this.token;
      this.axios.post(process.env.API_URL+'/admin/property/update', property)
      .then(response => {
        this.getPublished();
        this.$notify({
          title: 'Success',
          message: 'You have unpublish the property',
          type: 'success'
        });
      });
    },
    handlePreview: function(propertyNo){
      this.$router.push({name:'view-property', params:{property_no:propertyNo}})
    },
    loadPublished(start, end){
      var arr = [];
      for (var elem in this.property_source) {
         arr.push(this.property_source[elem]);
      }
      var items = arr.slice(start, end);
      this.properties = items;
    },
    switchToPage(page){
      var end = this.item_per_page * page;
      var start = end - this.item_per_page;
      this.loadPublished(start, end);
      this.current_page = page;
    },
    offerType:function(type){
      let offer_type=type;
      switch(offer_type){
        case 1:
          offer_type = 'For Sale'
          break;
        case 2:
          offer_type = 'For Rent'
          break;
        case 3:
          offer_type = 'Pre-Selling'
          break;
        case 4:
          offer_type = 'Foreclosure'
          break;
        default:
          offer_type = 'Property'
      }
      return offer_type;
    },
    getPublished:function(){
      this.axios.defaults.headers.common['token'] = null;
      this.axios.get(process.env.API_URL+'/property',{ params:{ status: 1}})
      .then(response => {
        this.property_source = response.data.properties.reverse();
        if(this.property_source.length > 0){
          this.loadPublished(0, this.item_per_page);//load the properties
          this.total_properties = Object.keys(this.property_source).length ;//get the total numbers of properties
          this.loading = false;
        }
        if(this.current_page !=0){
          this.switchToPage(this.current_page);
        }
        this.loading = false;
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  },
  mounted(){
    this.getPublished();
    this.imgUrl = process.env.API_URL + '/images/';
  }
}
</script>

<style scoped>
  img[lazy=loading] {
    background-image: url('../../../../static/cube.gif');
    background-repeat: no-repeat;
    background-position: center;
  }
</style>
