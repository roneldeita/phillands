<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h5 style="float:left; color:#999999;margin-top:5px">Edit Slogan</h5>
      <div style="float: right;">
        <el-button v-if="!editSlogan" icon="edit" @click="editSlogan = true">Edit</el-button>
        <el-button v-if="editSlogan" type="success" class="btn-pl-green" icon="circle-check" @click="saveSlogan">Save</el-button>
        <el-button v-if="editSlogan" icon="circle-cross" @click="editSlogan = false">Cancel</el-button>
      </div>
    </div>
    <slogan v-if="!editSlogan"></slogan>
    <textarea  v-if="editSlogan" class="form-control slogan" v-model="sloganContent" rows="2"></textarea>
  </el-card>
</template>

<script>
import axios from 'axios'
import Slogan from '../../content/Slogan.vue'
import { baseUrl } from '../../../assets/utils/properties-api.js'
export default {
  name:'edit-slogan',
  data(){
    return{
      loading:false,
      editSlogan:false,
      slogan:{},
      sloganContent:''
    }
  },
  methods:{
    handleCommand:function(command){
      if(command === 'edit'){
        this.editSlogan = true;
      }
    },
    loadContent:function(){
      const self = this;
      axios.get(baseUrl()+'/content/content/index_slogan')
      .then(function(response){
        self.slogan = response.data[0];
        self.sloganContent = response.data[0].content;
      }).catch(function(error){
        console.log(error);
      });
    },
    saveSlogan:function(){
      const self = this;
      var content = {
        content_id:this.slogan.id,
        content:this.sloganContent
      }
      axios.post(baseUrl()+'/content/page/edit', content)
      .then(function(response){
        self.$notify({
          title: 'Success',
          message: 'The contant was updated',
          type: 'success'
        });
        self.editSlogan = false;
      }).catch(function(error){
        console.log(error)
      })
    }
  },
  mounted(){
    this.loadContent()
  },
  components:{ Slogan }
}
</script>
<style scoped>
.slogan{
  font-size: 42px;
  outline: none !important;
}
.el-card{
  box-shadow: 0px 0px 0px 0px !important;
  border-radius: 2px !important;
}
.pe-7s-pen{
  font-size: 16px
}
</style>
