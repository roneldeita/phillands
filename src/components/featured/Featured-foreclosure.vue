<template lang="html">
  <div>
    <el-row>
      <el-col :span="24" class="view-all" >
        <span class="sub-title pull-left">Featured Properties</span>
        <el-button class="pull-right" style="padding-top:15px;" type="text text-muted" @click="ViewAll">View All <span class="fa fa-chevron-right "></span></el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :lg="6" class=" property-block" v-for="property in properties" v-bind:data="property" v-bind:key="property.id">
        <property-card
          :property="property">
        </property-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//component
import PropertyCard from '.././Property-card.vue'
//json
//import Properties from '../../../static/json/properties.json'
//api
import { getProperties } from '../../assets/utils/properties-api.js'

export default {
  name:'featured-sale',
  data(){
    return{
      property_source:'',
      properties:'',
    }
  },
  methods:{
    loadProperties(){
      var arr = [];
      for (var elem in this.property_source) {
         arr.push(this.property_source[elem]);
      }
      var items = arr.slice(0, 8);
      this.properties = JSON.parse(JSON.stringify(items));
    },
    ViewAll(){
        this.$router.push({name:'foreclosure', params:{property_type:'1', location:''}})
    },
    getRents() {
      getProperties(4).then((property) => {
        this.property_source = property.properties.reverse();
        this.loadProperties();
      });
    }
  },
  components:{PropertyCard },
  mounted(){
    //this.loadProperties()
    this.getRents();
  }
}
</script>

<style scoped>
  .view-all{
    display: block;
    margin: -20px 0 0 0;
    font-size: 16px;
  }
  .fa-chevron-right{
    font-size: 12px;
  }
  .sub-title{
    font-size: 26px;
    text-align: left;
    font-weight: bold;
    margin-bottom: 10px;
  }
</style>
