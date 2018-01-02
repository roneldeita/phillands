<template>
  <div>
    <div style="margin-bottom: 10px">
      <el-input placeholder="Please input" v-model="search" style="width:100%">
        <el-select v-model="searchType" slot="prepend" placeholder="Select" style="width:120px">
          <el-option label="Email" value="email"></el-option>
        </el-select>
        <el-button slot="append" icon="search"></el-button>
      </el-input>
    </div>
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
        label="Member since"
        prop="createdAt"
        align="left"
        sortable>
        <template scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ scope.row.createdAt | moment("from") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Email"
        prop="property_detail.title"
        align="left"
        sortable>
      </el-table-column>
      <el-table-column
        label="Name"
        prop="property_no"
        align="left"
        sortable>
      </el-table-column>
      <el-table-column
        align="left"
        label="Operations">
        <template scope="scope">
          <el-button type="warning" size="small">Unpublish</el-button>
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
import axios from 'axios';
import { getProperties } from '../../../assets/utils/properties-api.js';

export default {
  name:'seller',
  data(){
    return{
      loading: true,
      imgUrl:'',
      item_per_page: 10,
      total_properties:0,
      property_source:'',
      properties:[],
      searchType:'email',
      search:''
    }
  },
  methods:{
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
      // console.log(this.published);
    },
    switchToPage(page){
      var end = this.item_per_page * page;
      var start = end - this.item_per_page;
      this.loadPublished(start, end);
    },
    getPublished:function(){
      axios.defaults.headers.common['token'] = null;
      axios.get(process.env.API_URL+'/property',{ params:{ status: 1}})
      .then(response =>{
        // this.property_source = response.data.properties
        // if(this.property_source.length > 0){
        //   this.loadPublished(0, this.item_per_page);//load the properties
        //   this.total_properties = Object.keys(this.property_source).length ;//get the total numbers of properties
        //}
        this.loading = false;
      })
      .catch(error => {
        console.log(error);
        this.loading = false;
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
