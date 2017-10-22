<template>
  <div>
    <h4 class="pull-left txt-pl-green" style="margin-bottom:15px">Property Images</h4>
    <el-col :span="24" class="input">
      <el-upload
        class="upload-images"
        action=""
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :on-change="handleChange"
        :auto-upload="false"
        list-type="picture-card"
        multiple>
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog v-model="dialogVisible" size="small">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog><br>
    </el-col>
  </div>
</template>

<script>
//dependency
import axios from 'axios';
//api
import { baseUrl,getProperty } from '../../../assets/utils/properties-api.js'
import { getIdToken } from '../../../assets/utils/auth.js'

export default {
  name:'edit-media',
  data(){
    return{
      fileList: [],
      dialogImageUrl: '',
      dialogVisible:false,
      imgUrl:''
    }
  },
  methods:{
    getProperty:function(property_no){
    var self = this;
    getProperty(property_no).then((property) =>{
          //console.log(property);
          this.property_id = property.id;
          this.property_no = property.property_no;
          //basic info
          var fl = [];
          property.property_media.forEach(function(data){
            fl.push({name:data.original_filename, url:self.imgUrl+data.uploaded_filename});
          });
          self.fileList = fl;
      });
    },
    handleChange:function(file, fileList){

    },
    handleRemove: function(file, fileList){

    },
    handlePreview: function(file){
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
  mounted(){
    this.getProperty(this.$route.params.property_no);
    this.imgUrl = baseUrl() +'/images/';
  }
}
</script>

<style scoped>
  .label{
    color: #999999;
    font-size: 14px;
    padding-top: 0px;
    margin-bottom: 5px;;
  }
  .required{
    color:#ff4949;
    margin-right:4px
  }
</style>
