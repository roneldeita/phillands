<template>
  <div style="width:100%">
    <el-row :gutter="15" style="margin:-15px 5px 10px 5px">
      <el-col :span="24">
        <h6 class="text-left" style="margin-bottom:15px">{{ total_properties }} properties found</h6>
      </el-col>
      <el-col :xs="24" :md="20" v-loading="propertyLoading" element-loading-text="Loading Properties">
        <el-row :gutter="15">
          <el-col :xs="24" :sm="8" :md="6" :lg="6" v-for="property in properties" v-bind:data="property" v-bind:key="property.id">
            <property-card :property="property"></property-card>
          </el-col>
        </el-row>
        <div class="" style="width:100%">
          <!-- <paginate
            :page-count="page_count"
            :click-handler="switchToPage"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :page-class="'page-item'"
            :page-link-class="'page-link'"
            :prev-class="'page-item'"
            :prev-link-class="'page-link'"
            :next-class="'page-item'"
            :next-link-class="'page-link'"
            :containerClass="'pagination justify-content-center'">
          </paginate> -->
          <el-pagination v-if="!propertyLoading"
            layout="total, prev, pager, next"
            :page-size="item_per_page"
            :total="total_properties"
            @current-change="switchToPage">
          </el-pagination>
          <br>
          <br>
        </div>
      </el-col>
      <el-col :sm="24" :md="4" :lg="4">
        <el-row :gutter="15">
          <el-col :sm="8" :md="24" class="property-block" v-for="add in adds" v-bind:data="add" v-bind:key="add.id">
            <a :href="add.link" target="_blank"><advertisement :img="add.img"></advertisement></a>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
//components
import PropertyCard from './Property-card.vue'
import Advertisement from './../Advertisement.vue'
//json
//import Properties from '../../static/json/properties.json'
//api
import { getProperties } from '../../assets/utils/properties-api.js'

export default {
  name: "pre-selling",
  props:['search'],
  data:function(){
    return{
      propertyLoading:true,
      property_source:{},
      properties:[],
      total_properties:0,
      page_count:0,
      item_per_page: 20,
      adds:[
        { id:1, img:'/static/adds/Ads1.jpg', link:'https://iremitglobal.com/' },
        { id:2, img:'/static/adds/Ads2.jpg', link:'https://www.upsexpress.com.ph/' },
        { id:3, img:'/static/adds/Ads3.jpg', link:'https://www.upsexpress.com.ph/' },
        { id:4, img:'/static/adds/Ads4.jpg', link:'https://www.upsexpress.com.ph/' },
        { id:5, img:'/static/adds/Ads5.jpg', link:'https://www.upsexpress.com.ph/' }
      ]
    }
  },
  methods:{
    loadProperties(start, end){
      var arr = [];
      for (var elem in this.property_source) {
         arr.push(this.property_source[elem]);
      }
      var items = arr.slice(start, end);
      this.properties = items;
      this.propertyLoading = false
    },
    switchToPage(page){
      var end = this.item_per_page * page;
      var start = end - this.item_per_page;
      this.loadProperties(start, end);
      document.documentElement.scrollTop = 0;
    },
    getSales(property_type, location) {
      getProperties(3, Number(property_type), location).then((property) => {
        this.property_source = property.properties;
        this.loadProperties(0, this.item_per_page);//load the properties
        this.total_properties = Object.keys(this.property_source).length ;//get the total numbers of properties
        this.page_count = Object.keys(this.property_source).length / this.item_per_page;//identify how many page
      });
    }
  },
  mounted(){
    document.documentElement.scrollTop = 0;
    this.getSales(this.$route.params.property_type, this.$route.params.location);
  },
  components:{ PropertyCard, Advertisement },
  watch:{
    'search':function(value){
      this.getSales(value.property_type, value.location)
    }
  }
}
</script>
<style scoped>
  .property-block{
    padding-bottom: 20px;
  }
</style>
