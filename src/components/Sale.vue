<template>
  <div class="container-fluid">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="18" :md="18">
        <el-row :gutter="20">
          <el-col :sm="12" :md="12" :lg="8" v-for="property in properties" v-bind:data="property" v-bind:key="property.id">
            <!-- <advertisement :img="property.img"></advertisement> -->
            <property-card
              :title="property.title"
              :location="property.location"
              :img="property.img">
            </property-card>
          </el-col>
        </el-row>
        <div class="" style="width:100%">
          <paginate
            :page-count="total_properties"
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
          </paginate>
        </div>
      </el-col>
      <el-col :xs="24" :sm="6" :md="6">
        <el-row>
          <el-col :span="24" class="property-block" v-for="add in adds" v-bind:data="add" v-bind:key="add.id">
            <advertisement :img="add.img"></advertisement>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
//components
import PropertyCard from './Property-card.vue'
import Advertisement from './Advertisement.vue'
//json
import Properties from '../../static/json/properties.json'
//api
import { getPublicStartupBattles } from '../assets/utils/battles-api.js'

export default {
  name: "sale",
  data:function(){
    return{
      publicBattles:'',
      properties:[],
      total_properties:0,
      item_per_page: 6,
      adds:[
        { id:1, img:'/static/adds/exotiq.jpg' },
        { id:2, img:'/static/adds/selling.jpg' },
      ]
    }
  },
  methods:{
    loadProperties(start, end){
      var arr = [];
      for (var elem in Properties) {
         arr.push(Properties[elem]);
      }
      var items = arr.slice(start, end);
      this.properties = JSON.parse(JSON.stringify(items));
    },
    switchToPage(page){
      var end = this.item_per_page * page;
      var start = end - this.item_per_page;
      this.loadProperties(start, end);
    },
    getPublicStartupBattles() {
      getPublicStartupBattles().then((battles) => {
        this.publicBattles = battles;
      });
    }
  },
  mounted(){
    this.total_properties = Object.keys(Properties).length / this.item_per_page;
    this.loadProperties(0, this.item_per_page);
    this.getPublicStartupBattles();
  },
  components:{ PropertyCard, Advertisement }
}
</script>
<style scoped>
  .property-block{
    padding-bottom: 20px;
  }
</style>
