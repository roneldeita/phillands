<template>
  <el-card class="box-card text-left">
    <div slot="header">
      <p>{{info.status === 1? 'For Approval' : 'Published'}}  <span class="pull-right"> <span class="txt-pl-green">{{ info.property_no }}</span></span></p>
    </div>
      <el-row :gutter="10">
        <el-col :xs="24" :span="8" class="">
          <img v-if="info.property_media.length != 0" v-lazy="'http://103.16.170.117:8090/images/'+info.property_media[0].uploaded_filename" alt="">
        </el-col>
        <el-col :xs="24" :span="16">
          <h4>Title Goes Heres</h4>
          <p>{{ info.property_location.formatted_address }}</p>
          <el-button>Edit</el-button>
          <el-button type="success" class="btn-pl-green" @click="previewProperty">Preview</el-button>
        </el-col>
      </el-row>
  </el-card>
</template>

<script>
export default {
  name:'property-card',
  props:['name', 'info'],
  methods:{
    previewProperty: function(propertyNo){
      window.open('/property/'+this.info.property_no, '_blank')
    }
  }
}
</script>
<style>
  img[lazy=loading] {
    background-image: url('../../../static/cube.gif');
    background-repeat: no-repeat;
    background-position: center;
  }
  .el-card__header{
    padding: 15px 20px 0px 20px !important;
    background-color: #f0f0f0;
  }
</style>

<style scoped>
  .el-card{
    box-shadow: 0px 0px 0px 0px !important;
    border-radius: 2px !important;
    margin-bottom: 20px;
  }
  img{
    width: 100%;
    margin: 0px 10px 10px 0;
  }
  .el-button{
   width:120px;
   margin: 5px;
  }
</style>
