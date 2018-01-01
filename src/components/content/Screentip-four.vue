<template>
  <div class="card text-left" style="width: 100%">
    <div class="card-block">
      <h5 class="card-title"><span style="font-size:2em" class="pe-7s-light txt-pl-green"></span></h5>
      <p class="card-text" v-html="tip"></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'screen-tip-four',
  data(){
    return{
      tip:''
    }
  },
  methods:{
    loadContent:function(){
      axios.get(process.env.API_URL+'/content/content/publish_property_4')
      .then(response =>{
        this.tip = response.data[0].content;
      }).catch(error =>{
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
