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
        <el-col :xs="24" :span="8">
          <div style="height:200px;width:100%; overflow:hidden;">
            <img style="height:100%;width: 100%;object-fit: cover;" v-if="info.property_media.length != 0" v-lazy="'http://103.16.170.117:8090/images/'+info.property_media[0].uploaded_filename" alt="">
          </div>
        </el-col>
        <el-col :xs="24" :span="16">
          <template>
            <el-tabs v-model="activePropertyNav">
              <el-tab-pane label="Details" name="details"></el-tab-pane>
              <el-tab-pane label="Inquiry" name="inquiry" v-if="info.status === 1 && this.$route.name != 'wishlist'">
                <span slot="label">Inquiry <el-badge :value="0" :max="99" class="item" style="margin:5px 0 0 2px"></el-badge></span>
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
              <el-button type="success" class="btn-pl-green" v-if="info.status === 1" @click="unpublishListing">Unpublish</el-button>
            </div>
            <div v-if="this.$route.name === 'wishlist'">
              <el-button type="success" class="btn-pl-green" @click="previewProperty">Preview</el-button>
              <el-button :plain="true" type="danger" @click="previewProperty(info.property_no)">Remove</el-button>
            </div>
          </div>

          <div v-show="activePropertyNav ==='inquiry'">
            No Inquiries yet
          </div>
        </el-col>
      </el-row>
  </el-card>
</template>

<script>
export default {
  name:'property-card',
  props:['name', 'info'],
  data(){
    return{
      activePropertyNav:'details',
    }
  },
  methods:{
    previewProperty: function(propertyNo){
      //window.open('/property/'+this.info.property_no, '_blank');
      this.$router.push({name:'view-property',params:{property_no:this.info.property_no}});
    // console.log(propertyNo);
    //   this.$router.push({name:'view-property', params:{property_no:propertyNo}})
    },
    handleEditProperty: function(propertyNo){
      this.$router.push({name:'edit-property', params:{property_no:propertyNo}})
    },
    handleCommand:function(command){
      if(command === 'preview'){
        this.previewProperty(this.info.property_no)
      }else if(command === 'edit'){
        this.handleEditProperty(this.info.property_no)
      }
    },
    unpublishListing: function(){

    }
  },
  mounted(){
    console.log(this.$route.name)
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
</style>
