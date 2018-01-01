<template>
  <div class="text-left">
    <p class="slogan" v-html="slogan"></p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'slogan',
  data(){
    return{
      slogan:''
    }
  },
  methods:{
    loadContent:function(){
      axios.get(process.env.API_URL+'/content/content/index_slogan')
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
    font-size: 40px;
    line-height: 52px;
    color: #484848;
    font-weight: 500;
  }
</style>
