<template>
  <el-row>
    <el-col :offset="2" :span="20">
      <el-row>
        <el-col :xs="24" :sm="8" :md="5">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="profile" :src="profile.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
        <el-col :xs="24" :sm="14" :md="19">
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
</template>

<script>

import { getProfile } from '../../../assets/utils/auth.js';

export default {
  name:'profile',
  data(){
    return{
       profile: JSON.parse(getProfile()),
       img:''
    }
  },
  methods:{
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('Avatar picture must be JPG format!');
      }
      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<style>
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
