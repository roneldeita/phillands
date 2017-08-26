<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12 col-md-9">
        <div class="row">
          <div class="col-sm-6 col-md-4 property-block" v-for="property in properties">
            <property-card :title="property.title" :location="property.location" :img="property.img">
            </property-card>
          </div>
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
        </div>
      </div>
      <div class="col-sm-12 col-md-3">
        <div class="row">
          <div class="col-sm-6 col-md-12 property-block" v-for="add in adds">
            <advertisement :img="add.img"></advertisement>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//components
import PropertyCard from './Property-card.vue'
import Advertisement from './Advertisement.vue'
//json
import Properties from '../assets/json/properties.json'

export default {
  name: "sale",
  data:function(){
    return{
      properties:[],
      total_properties:0,
      item_per_page: 6,
      adds:[
        {img:'/static/adds/exotiq.jpg'},
        {img:'/static/adds/selling.jpg'},
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
    }
  },
  mounted(){
    this.total_properties = Object.keys(Properties).length / this.item_per_page;
    this.loadProperties(0, this.item_per_page);
  },
  components:{ PropertyCard, Advertisement }
}
</script>
<style scoped>
  .property-block{
    padding-bottom: 20px;
  }
</style>
