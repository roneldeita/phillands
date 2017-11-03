<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h5 style="float:left; color:#999999;margin-top:5px">Amenities</h5>
      <div style="float: right;">
        <el-button v-if="!editTip" size="tiny" icon="edit" @click="editTip = true">Edit</el-button>
        <el-button v-if="editTip" type="success" class="btn-pl-green" size="tiny" icon="circle-check" @click="saveTip">Save</el-button>
        <el-button v-if="editTip" size="tiny" icon="circle-cross" @click="editTip = false">Cancel</el-button>
      </div>
    </div>
    <screentip-three v-if="!editTip"></screentip-three>
    <div v-if="editTip" class="card text-left" style="width: 350px;">
      <div class="card-block">
        <h5 class="card-title"><span style="font-size:2em" class="pe-7s-light txt-pl-green"></span></h5>
        <p class="card-text">
          <textarea  class="form-control" v-model="tipContent" rows="12"></textarea>
        </p>
      </div>
    </div>
  </el-card>
</template>

<script>
import axios from 'axios'
import ScreentipThree from '../../content/Screentip-three.vue'
import { baseUrl } from '../../../assets/utils/properties-api.js'
export default {
  name:'edit-screentip-three',
  data(){
    return{
      editTip:false,
      tip:'',
      tipContent:{}
    }
  },
  methods:{
    handleCommand(command){
      if(command === 'edit'){
        this.editTip = true;
      }
    },
    loadContent:function(){
      const self = this;
      axios.get(baseUrl()+'/content/content/publish_property_3')
      .then(function(response){
        self.tip = response.data[0];
        self.tipContent = response.data[0].content;
      }).catch(function(error){
        console.log(error);
      });
    },
    saveTip:function(){
      const self = this;
      var content = {
        content_id:this.tip.id,
        content:this.tipContent
      }
      axios.post(baseUrl()+'/content/page/edit', content)
      .then(function(response){
        self.$notify({
          title: 'Success',
          message: 'The contant was updated',
          type: 'success'
        });
        self.editTip = false;
      }).catch(function(error){
        console.log(error)
      })
    }
  },
  mounted(){
    this.loadContent()
  },
  components:{ ScreentipThree }
}
</script>
<style scoped>
.tip{
  outline: none !important;
  font-size: 10px !important
}
.el-card{
  box-shadow: 0px 0px 0px 0px !important;
  border-radius: 2px !important;
}
.pe-7s-pen{
  font-size: 16px
}
</style>
