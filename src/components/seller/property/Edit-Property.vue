<template>
  <el-row class="text-left" style="margin:-20px 0 100px 0">
    <div class="main-nav fixed-top"></div>
    <el-col :sm="24" :offset="2" :md="15" class="head-container">
      <h4>Edit Mode: <span style="color:#A9A9A9; line-height:20px">You can change the details of your listing below.</span></h4><br>
    </el-col>
    <el-col :xs="24" :md="5" class="text-right head-container">
      <el-button type="success" class="btn-pl-green" style="width:150px" size="large" @click="handleCard(property_no)">Preview Listing</el-button>
    </el-col>
    <!-- <el-col :sm="24" :offset="2" :md="20" class="head-container" style="height:600px; padding:10px 20px">
      <img v-if="mediaForm.media[0]" v-lazy="imgUrl+mediaForm.media[0].uploaded_filename" alt="" class="primary-img">
    </el-col> -->
    <el-col :offset="2" :sm="20" :md="20" class="head-container">
      <el-card class="box-card">
        <edit-media></edit-media>
      </el-card>
      <el-card class="box-card">
        <edit-basic></edit-basic>
      </el-card>
      <el-card class="box-card">
        <edit-contact></edit-contact>
      </el-card>
      <el-card class="box-card">
        <edit-keyinfo></edit-keyinfo>
      </el-card>
      <el-card class="box-card">
        <edit-unitdetail></edit-unitdetail>
      </el-card>
      <el-card class="box-card">
        <edit-amenities></edit-amenities>
      </el-card>
      <el-card class="box-card">
        <edit-location></edit-location>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios';
//api
import { getProperty } from '../../../assets/utils/properties-api.js'
//child components
import EditBasic from './Edit-basic.vue'
import EditKeyinfo from './Edit-keyinfo'
import EditContact from './Edit-contact'
import EditUnitdetail from './Edit-unitdetail'
import EditAmenities from './Edit-amenities'
import EditLocation from './Edit-location'
import EditMedia from './Edit-media'

export default {
  name:'edit-property',
  data(){
    return{
      property_id:'',
      property_no:'',
      mediaForm:{
        media:[]
      },
      imgUrl:''
    }
  },
  methods:{
    getProperty:function(property_no){
      getProperty(property_no).then((property) =>{
          this.property_id = property.id;
          this.property_no = property.property_no;
          //media
          this.mediaForm.media = property.property_media;
      });
    },
    handleCard: function(propertyNo){
      this.$router.push({name:'view-property', params:{property_no:propertyNo}})
    }
  },
  components:{ EditBasic, EditKeyinfo, EditContact, EditUnitdetail, EditAmenities, EditLocation, EditMedia },
  mounted(){
    document.documentElement.scrollTop = 0;//scroll top
    this.imgUrl = process.env.API_URL + '/images/';
    this.getProperty(this.$route.params.property_no);
  }
}
</script>

<style>
  .el-form-item__label{
    color: #999999;
  }
</style>

<style scoped>
  img[lazy=loading] {
    background-image: url('../../../../static/cube.gif');
    background-repeat: no-repeat;
    background-position: center;
  }
  .main-nav{
    position: fixed;
    height: 10px;
    background-color: #ffffff;
    box-shadow: 0 4px 2px -3px #d9d9d9;
    margin-top: 60px;
    z-index: 5;
  }
  .primary-img{
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  .el-card{
    box-shadow: 0px 0px 0px 0px !important;
    border-radius: 2px !important;
    margin-bottom: 10px;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
  }
  .el-form-item{
    display: block;
  }
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

  @media (max-width: 991px) {
    .head-container{
      margin: 0px;
      padding: 0px 5px;
    }
  }

  @media (max-width: 769px) {
    .form-container{
      margin-left: 0px;
      padding: 0px 5px;
    }
  }
</style>
