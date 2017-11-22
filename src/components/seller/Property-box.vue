<template>
  <el-card class="box-card text-left">
    <div slot="header" v-if="this.$route.name != 'wishlist'">
      <span style="margin:0px">{{info.status === 0? 'For Approval' : 'Published'}}</span>
      <el-dropdown class="pull-right" @command="handleCommand">
        <span class="el-dropdown-link">
          <i class="el-icon-more el-icon--right"></i>
        </span>
      <el-dropdown-menu slot="dropdown" style="width:150px">
        <el-dropdown-item command="preview">Preview</el-dropdown-item>
        <el-dropdown-item command="edit">Edit</el-dropdown-item>
        <el-dropdown-item divided disabled>Trash</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </div>
      <el-row :gutter="10">
        <el-col :xs="24" :span="6">
          <div style="height:150px;width:100%; overflow:hidden;">
            <img style="height:100%;width: 100%;object-fit: cover;" v-if="info.property_media.length != 0" v-lazy="'http://103.16.170.117:8090/images/'+info.property_media[0].uploaded_filename" alt="">
          </div>
        </el-col>
        <el-col :xs="24" :span="18">
          <template>
            <el-tabs v-model="activePropertyNav">
              <el-tab-pane label="Details" name="details"></el-tab-pane>
              <el-tab-pane label="Inquiry" name="inquiry" v-if="this.$route.name != 'wishlist'">
                <span slot="label">Inquiry <el-badge :value="inquiriesCount" :max="99" class="item" style="margin:5px 0 0 2px"></el-badge></span>
              </el-tab-pane>
            </el-tabs>
          </template>
          <div v-show="activePropertyNav ==='details'">
            <h4>{{ info.property_detail.title }}</h4>
            <p>{{ info.property_location.formatted_address }}</p>
            <p style="margin-top:-15p;color:#999999">Updated {{ info.updatedAt | moment("from") }}</p>
            <div v-if="this.$route.name != 'wishlist'">
              <el-button @click="handleEditProperty(info.property_no)">Edit Listing</el-button>
              <el-button type="success" class="btn-pl-green" v-if="info.status === 0" @click="previewProperty">Preview</el-button>
              <el-button type="success" class="btn-pl-green" v-if="info.status === 1" @click="unpublishListing" disabled>Unpublish</el-button>
            </div>
            <div v-if="this.$route.name === 'wishlist'">
              <el-button type="success" class="btn-pl-green" @click="previewProperty">Preview</el-button>
              <el-button :plain="true" type="danger" @click="handleRemoveWishList">Remove</el-button>
            </div>
          </div>

          <div v-show="activePropertyNav === 'inquiry'" class="inquiry-container">
            <div v-if="Object.keys(inquiries).length != 0" v-for="inquiry in inquiries" class="inquiry-card" @click="handleInquiryDialog(inquiry)">
              <el-row>
                <el-col :xs="5" :sm="5" :md="3">
                  <div id="profileImage" class="border">
                    {{ inquiry.first_name.charAt(0).toUpperCase() + inquiry.last_name.charAt(0).toUpperCase() }}
                  </div>
                </el-col>
                <el-col :xs="19" :sm="19" :md="21">
                  <span class="pull-left" style="color:#a6a6a6">{{ inquiry.email }}</span>
                  <span class="text-right" style="display:block; color:#a6a6a6">{{ inquiry.createdAt | moment("from") }}</span>
                  <div class="inquiry-msg">{{ inquiry.message }} </div>
                </el-col>
              </el-row>
            </div>
            <el-dialog title="" :visible.sync="dialogInquiryVisible">
                <div style="padding:35px 20px 20px 20px">
                  <h5 class="txt-pl-green">{{ inquiry.first_name +' '+inquiry.last_name }}</h5>
                  <h6>{{ inquiry.email }}</h6>
                  <h6 class="pull-right" style="display:block; color:#a6a6a6">{{ inquiry.createdAt | moment("from") }}</h6>
                  <h6>{{ inquiry.contact }}</h6>
                  <hr>
                  <h4>{{inquiry.message}}</h4>
                  <hr>
                  <p class="text-center txt-pl-green">www.phillands.com</p>
                </div>
            </el-dialog>
            <el-button type="text" v-if="inquiriesCount >= inquiry_limit" @click="loadInquiries(0, inquiry_limit = inquiry_limit+5)">Load more</el-button>
            <div v-if="Object.keys(inquiries).length === 0">
              <p class="text-center" type="text">No inquiries yet.</p>
            </div>
          </div>
        </el-col>
      </el-row>
  </el-card>
</template>

<script>
import axios from 'axios';
import { getIdToken } from '../../assets/utils/auth.js'
import { baseUrl } from '../../assets/utils/properties-api.js'
export default {
  name:'property-card',
  props:['name', 'info'],
  data(){
    return{
      activePropertyNav:'details',
      inquiriesCount:0,
      inquiry_limit:5,
      inquirySource:{},
      inquiries:{},
      dialogInquiryVisible:false,
      inquiry:{}
    }
  },
  methods:{
    previewProperty: function(propertyNo){
      this.$router.push({name:'view-property',params:{property_no:this.info.property_no}});
    },
    handleEditProperty: function(propertyNo){
      this.$router.push({name:'edit-property', params:{property_no:propertyNo}})
    },
    handleRemoveWishList:function(){
      axios.defaults.headers.common['token'] = getIdToken();
      return axios.post(baseUrl()+'/client/wishlist/remove', { wishlist_id : this.info.wishlist_id}).
      then(response =>{
        this.$message({
          message: 'This property was removed from your wish list',
          type: 'success'
        });
        setTimeout(() =>{
          this.$router.go({name:'wishlist'});
        },800);
      });
    },
    handleCommand:function(command){
      if(command === 'preview'){
        this.previewProperty(this.info.property_no)
      }else if(command === 'edit'){
        this.handleEditProperty(this.info.property_no)
      }
    },
    loadInquiries:function(start, end){
      var arr = [];
      for (var elem in this.inquirySource) {
         arr.push(this.inquirySource[elem]);
      }
      var items = arr.slice(start, end);

      this.inquiries = items;

    },
    getInquiries:function(){
      axios.defaults.headers.common['token'] = getIdToken();
      axios.get(baseUrl()+'/broker/inquiry/property/'+this.info.id)
      .then(response =>{
        this.inquirySource = response.data.reverse();
        this.loadInquiries(0, this.inquiry_limit);
        this.inquiriesCount = response.data.length;
      }).catch(function(error){
        //console.log(error.data)
      });
    },
    handleInquiryDialog:function(inquiry){
      console.log(inquiry);
      this.inquiry = inquiry;
      this.dialogInquiryVisible = true;
    },
    unpublishListing: function(){

    }
  },
  mounted(){
    document.documentElement.scrollTop = 0;
    this.getInquiries();
    //console.log(this.$route.name)
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
    padding: 10px !important;
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
  #profileImage {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border:0px;
    background: #f0f0f0;
    font-size: 18px;
    color: #999999;
    text-align: center;
    line-height: 45px;
    margin: 0 auto;
  }

  .inquiry-container{

  }
  .inquiry-card{
    cursor: pointer;
    padding: 7px;
    border-bottom: 1px solid #f0f0f0;
  }
  .inquiry-card:hover{
    background-color: #f2f2f2;
  }
  .inquiry-card:hover #profileImage{
    background-color: #13ce66;
    color: #ffffff
  }
  .inquiry-msg{
    width: 95%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
