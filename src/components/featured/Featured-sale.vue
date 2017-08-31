<template lang="html">
  <div class="">
    <el-row>
      <el-col :span="24" class="text-right">
        <el-button type="text" @click="ViewAll">View All</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="6" :lg="6" class=" property-block" v-for="property in properties" v-bind:data="property" v-bind:key="property.id">
        <property-card
          :title="property.title"
          :location="property.location"
          :img="property.img">
        </property-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//component
import PropertyCard from '.././Property-card.vue'
//json
import Properties from '../../../static/json/properties.json'
export default {
  name:'featured-sale',
  data(){
    return{
      properties:Properties
    }
  },
  methods:{
    loadProperties(){
      var arr = [];
      for (var elem in Properties) {
         arr.push(Properties[elem]);
      }
      var items = arr.slice(0, 4);
      this.properties = JSON.parse(JSON.stringify(items));
    },
    ViewAll(){
      	this.$router.push('sale')
    }
  },
  components:{PropertyCard },
  mounted(){
    this.loadProperties()
  }
}
</script>

<style scoped>
  .view-all{
    display: block;
    margin: 8px 0;
    font-size: 14px;
  }
  .pe-7s-angle-right{
    font-weight: bold;
  }
</style>
