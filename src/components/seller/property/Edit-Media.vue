<template>
  <el-row>
    <h4 class="pull-left txt-pl-green" style="margin-bottom:15px">Property Images</h4>
    <el-col :span="24" class="input" v-loading="loadingPrimary">
      <el-upload
        class="primary-uploader"
        action=""
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handleChangePrimary">
        <img v-if="primartyImg" v-lazy="primartyImg" class="primary-img">
        <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
      </el-upload>
    </el-col>
    <el-col :span="24" class="input">
      <el-upload
        v-loading="imgLoading"
        element-loading-text="Processing..."
        class="upload-images"
        action=""
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :on-progress="handleProgress"
        :on-change="handleChange"
        :auto-upload="false"
        list-type="picture-card">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog v-model="dialogVisible" size="small">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog><br>
    </el-col>
  </el-row>
</template>

<script>
//dependency
import axios from 'axios';
//api
import { getProperty } from '../../../assets/utils/properties-api.js'

export default {
  name:'edit-media',
  computed: {
    token:  function () {
      return this.$store.getters.phillandsIdToken
    }
  },
  data(){
    return{
      loadingPrimary:false,
      imgLoading:false,
      propertyId:'',
      fileList: [],
      primartyImg:'',
      dialogImageUrl: '',
      dialogVisible:false,
      imgUrl:''
    }
  },
  methods:{
    getProperty:function(property_no){
      var self = this;
      getProperty(property_no).then((property) =>{
          this.propertyId = property.id;
          //basic info
          var fl = [];
          property.property_media.forEach(function(media){
            if(media.primary ===1){
              self.primartyImg = self.imgUrl+media.uploaded_filename;
            }else if(media.primary !=1){
              fl.push({media_id:media.id, name:media.original_filename, url:self.imgUrl+media.uploaded_filename});

            }

          });
          self.fileList = fl;
      });
    },
    handleProgress:function(event, file, fileList){
      console.log(event);
      console.log(file);
      console.log(fileList)
    },
    handleChangePrimary(file, fileList) {
      const fileValidation = this.checkFileBeforeAttach(file, fileList);
      if(fileValidation.approve === false){
        this.loadingPrimary = false;
        this.$message.error(fileValidation.msg);
      }else{
        this.loadingPrimary = true;
        const self = this;
        const formData = new FormData();
        axios.defaults.headers.common['token'] = this.token;
        formData.append('property_id', this.propertyId);
        formData.append('image', file.raw);

        axios.post(process.env.API_URL+'/broker/property/media/updatePrimary', formData)
        .then(function(response){
          self.getProperty(self.$route.params.property_no);
          //console.log(response);
          // var userInfo = JSON.stringify(response.data.user);
          // localStorage.setItem('user', userInfo);
        //
          self.$message({
            message: 'The Primary image was successfully changed',
            type: 'success'
          });
          //self.profile = JSON.parse(getProfile());
          self.loadingPrimary = false;
        })
        .catch( function(error){
          self.getProperty(self.$route.params.property_no);
          self.loadingAvatar = false;
          // self.getProperty(self.$route.params.property_no);
          // self.$message({
          //   message: 'Unable to upload image',
          //   type: 'warning'
          // });
        });
      }
    },
    handleChange:function(file, fileList){
      this.imgLoading = true;
      const self = this;
      const fileValidation = this.checkFileBeforeAttach(file, fileList);

      if(fileValidation.approve === false){
        this.$message.error(fileValidation.msg);
        this.imgLoading = false;
      }else{

        const formData = new FormData();
        axios.defaults.headers.common['token'] = this.token;
        formData.append('images', file.raw);
        formData.append('property_id', this.propertyId);

        axios.post(process.env.API_URL+'/broker/property/media/add', formData)
        .then(function(response){
          if(response.data.message === "Success"){
            self.imgLoading = false;
            self.getProperty(self.$route.params.property_no);
            self.$message({
              message: 'The image was successfully added',
              type: 'success'
            });
          };
        })
        .catch( function(error){
          self.imgLoading = false;
          self.getProperty(self.$route.params.property_no);
          self.$message({
            message: 'Unable to upload image',
            type: 'warning'
          });
        });
      }
    },
    checkFileBeforeAttach(file, fileList){

      var result = '';

      const validImage = [ 'image/jpeg', 'image/png' ];
      const validSize = file.raw.size / 1024 / 1024 < 2;
      const maxUpload = 14;
      if(Object.keys(fileList).length === maxUpload){
        result =  { approve:false, msg:'You cannot upload more than 8 images'}
        fileList.splice(-1);
      }else{
        if(validImage.includes(file.raw.type)){//valid type
          if(!validSize){
            result =  { approve:false, msg:'Image size can not exceed 2MB'}
            fileList.splice(-1);
          }else{
            result =  { approve:true, msg:''}
          }
        }else{
          result =  { approve:false, msg:'Invalid Image Type'}
          fileList.splice(-1);
        }
      }

      return result;

    },
    handleRemove: function(file, fileList){
      this.imgLoading = true;
      const self = this;
      var mediaToRemove ={
        media_id:file.media_id,
        property_id:this.propertyId
      }
      axios.defaults.headers.common['token'] = this.token;
      axios.post(process.env.API_URL+'/broker/property/media/remove', mediaToRemove)
      .then(function(response){
        if(response.data.message === 'Success'){
          self.imgLoading = false;
          self.getProperty(self.$route.params.property_no);
          self.$message({
            message: 'The image was successfully removed',
            type: 'success'
          });
        }

        // setTimeout(function(){
        //
        // },700);

      }).catch(function(error){
        self.imgLoading = false;
        self.getProperty(self.$route.params.property_no);
        self.$message({
          message: 'Unable to remove image',
          type: 'warning'
        });
      });
    },
    handlePreview: function(file){
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
  mounted(){
    this.getProperty(this.$route.params.property_no);
    this.imgUrl = process.env.API_URL +'/images/';
  }
}
</script>

<style>
  img[lazy=loading] {
    background-image: url('../../../../static/cube.gif');
    background-repeat: no-repeat;
    background-position: center;
  }
  .primary-uploader .el-upload{
    min-height: 400px;
    width: 100% !important;
  }
</style>

<style scoped>
  .label{
    color: #999999;
    font-size: 14px;
    padding-top: 0px;
    margin-bottom: 5px;
  }
  .required{
    color:#ff4949;
    margin-right:4px
  }

  .primary-img{
    margin-bottom: 10px;
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
</style>
