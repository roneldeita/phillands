<template>
  <div class="">
    <el-row style="min-height:700px">
      <el-col :offset="2" :span="20">
        <el-row>
          <el-col :xs="24" :sm="8" :md="5" class="avatar-container">
            <el-upload
              v-loading="loadingAvatar"
              class="avatar-uploader"
              action=""
              :auto-upload="false"
              :show-file-list="false"
              :on-change="handleChange">
              <img v-if="profile"  v-lazy="profile.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
          <el-col :xs="24" :sm="14" :md="19">
            <el-card class="box-card" style="border-color:#F7BA2A;color:#F7BA2A">
              <span class="fa fa-exclamation-circle pull-left" style="font-size:40px; margin-top:-7px"></span>
              <h5 style="margin:0px;">
                 Verify your email address
                <el-button type="text" style="text-decoration:underline" size="small">Verify Email Address</el-button>
              </h5>
            </el-card>
            <el-card class="box-card text-left">
              <div slot="header">
                <h5>Account Details</h5>
              </div>
                <el-row :gutter="10">
                  <el-col :xs="24" :span="8" class="">
                    <p class="label">First Name</p>
                    <p>{{ profile.first_name }}</p>
                    <p class="label">Last Name</p>
                    <p>{{ profile.last_name }}</p>
                    <p class="label">Mobile Name</p>
                    <p>+63 0943 594 6758</p>
                    <p class="label">Email Address</p>
                    <p>{{ profile.email }}</p>
                  </el-col>
                </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <bottom-navigation></bottom-navigation>
  </div>
</template>

<script>
import axios from 'axios';

import { getProfile, getIdToken } from '../../../assets/utils/auth.js';
import { baseUrl } from '../../../assets/utils/properties-api.js';

import BottomNavigation from '../../BottomNavigation.vue'

export default {
  name:'profile',
  data(){
    return{
      loadingAvatar:false,
      profile: JSON.parse(getProfile()),
      tokenAccess: getIdToken(),
      img:''
    }
  },
  methods:{
    handleChange(file, fileList) {
      this.loadingAvatar = true;
      const self = this;
      const formData = new FormData();
      axios.defaults.headers.common['token'] = getIdToken();
      formData.append('image', file.raw);

      axios.post(baseUrl()+'/client/profile/update/avatar', formData)
      .then(function(response){
        //console.log(response);
        var userInfo = JSON.stringify(response.data.user);
        localStorage.setItem('user', userInfo);
      //
        self.$message({
          message: 'Your avatar was successfully updated',
          type: 'success'
        });
        self.profile = JSON.parse(getProfile());
        self.loadingAvatar = false;
      })
      .catch( function(error){
        self.loadingAvatar = false;
        // self.getProperty(self.$route.params.property_no);
        // self.$message({
        //   message: 'Unable to upload image',
        //   type: 'warning'
        // });
      });
    },
    checkFileBeforeAttach(file, fileList){

      var result = '';

      const validImage = [ 'image/jpeg', 'image/png' ];
      const validSize = file.raw.size / 1024 / 1024 < 2;

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

      return result;

    }
  },
  mounted(){
  },
  components:{ BottomNavigation }
}
</script>

<style>
  img[lazy=loading] {
    background-image: url('../../../../static/cube.gif');
    background-repeat: no-repeat;
    background-position: center;
  }
  .avatar-container .el-upload::before{
    display: block;
    text-align: center;
    content: "Change Avatar";
    color: #ffffff;
    background-color: #56BA50;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #56BA50;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-card__header{
    padding: 10px 20px 6px 20px !important;
    background-color: #f0f0f0;
  }
</style>

<style scoped>
  .avatar-uploader .el-upload:hover {
     border-color: #20a0ff;
  }
  .avatar-uploader-icon {
   font-size: 28px;
   color: #56BA50;
   width: 200px;
   height: 200px;
   line-height: 200px;
   text-align: center;
  }
  .el-card__header{
    padding: 15px 20px 0px 20px !important;
    background-color: #f0f0f0;
  }
  .avatar {
    width: 200px;
    height: 200px;
    display: block;
  }
  .el-card{
    box-shadow: 0px 0px 0px 0px !important;
    border-radius: 2px !important;
    margin-bottom: 20px;
  }
  .label{
    color: #999999;
    font-size: 14px;
    padding-top: 0px;
    margin-bottom: 5px;;
  }
</style>
