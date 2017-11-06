<template>
  <div class="card text-left" style="width: 350px;">
    <div class="card-block">
      <h5 class="card-title"><span style="font-size:2em" class="pe-7s-light txt-pl-green"></span></h5>
      <p class="card-text" v-html="tip"></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { baseUrl } from '../../assets/utils/properties-api.js'
export default {
  name:'screen-tip-two',
  data(){
    return{
      tip:''
    }
  },
  methods:{
    loadContent:function(){
      axios.get(baseUrl()+'/content/content/publish_property_2')
      .then(response => {
        this.tip = response.data[0].content;
      }).catch(error => {
        console.log(error);
      });
    }
  },
  mounted(){
    this.loadContent()
  }
}
</script>

<style>
</style>
