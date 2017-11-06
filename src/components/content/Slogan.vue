<template>
  <div class="text-left">
    <p class="slogan" v-html="slogan"></p>
  </div>
</template>

<script>
import axios from 'axios'
import { baseUrl } from '../../assets/utils/properties-api.js'
export default {
  name:'slogan',
  data(){
    return{
      slogan:''
    }
  },
  methods:{
    loadContent:function(){
      axios.get(baseUrl()+'/content/content/index_slogan')
      .then(response => {
        this.slogan = response.data[0].content;
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

<style lang="css">
  .slogan{
    font-size: 46px;
    line-height: 52px;
    color: #636363;
  }
</style>
