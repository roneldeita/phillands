<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h5 style="float:left; color:#999999;margin-top:5px">Description And Photos</h5>
      <div style="float: right;">
        <el-button v-if="!editTip" size="tiny" icon="edit" @click="editTip = true">Edit</el-button>
        <el-button v-if="editTip" type="success" class="btn-pl-green" size="tiny" icon="circle-check" @click="saveTip">Save</el-button>
        <el-button v-if="editTip" size="tiny" icon="circle-cross" @click="editTip = false">Cancel</el-button>
      </div>
    </div>
    <screentip-five v-if="!editTip"></screentip-five>
    <div v-if="editTip" class="card text-left">
      <div class="card-block">
        <h5 class="card-title"><span style="font-size:2em" class="pe-7s-light txt-pl-green"></span></h5>
        <p class="card-text">
          <textarea  class="form-control" v-model="tipContent" rows="6"></textarea>
        </p>
      </div>
    </div>
  </el-card>
</template>

<script>
import ScreentipFive from '../../content/Screentip-five.vue'
export default {
  name:'edit-screentip-five',
  data(){
    return{
      editTip:false,
      tip:{},
      tipContent:''
    }
  },
  methods:{
    handleCommand(command){
      if(command === 'edit'){
        this.editTip = true;
      }
    },
    loadContent:function(){
      this.axios.get(process.env.API_URL+'/content/content/publish_property_5')
      .then(response =>{
        this.tip = response.data[0];
        this.tipContent = response.data[0].content;
      }).catch(function(error){
        console.log(error);
      });
    },
    saveTip:function(){
      var content = {
        content_id:this.tip.id,
        content:this.tipContent
      }
      this.axios.post(process.env.API_URL+'/content/page/edit', content)
      .then(response =>{
        this.$notify({
          title: 'Success',
          message: 'The contant was updated',
          type: 'success'
        });
        this.editTip = false;
      }).catch(error =>{
        console.log(error)
      })
    }
  },
  mounted(){
    this.loadContent();
  },
  components:{ ScreentipFive }
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
