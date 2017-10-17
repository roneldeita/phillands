<template>
  <el-row>
    <el-col :xs="24" :span="5" class="navmenu-container">
      <el-menu :default-active="activeMenu" class="el-menu-vertical-demo" @select="handleMenu">
        <el-menu-item index="published">Published</el-menu-item>
        <el-menu-item index="for-approval">For Approval</el-menu-item>
        <el-menu-item index="archives">Archives</el-menu-item>
        <el-menu-item index="wishlist">Reported</el-menu-item>
        <el-submenu index="listings">
          <template slot="title">Others</template>
          <el-menu-item index="1">one</el-menu-item>
          <el-menu-item index="2">two</el-menu-item>
          <el-menu-item index="3">three</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
    <el-col :span="19" class="data-container">
      <el-table
        :data="published"
        style="">
        <el-table-column type="expand">
          <template scope="props">
            {{ props }}
          </template>
        </el-table-column>
        <el-table-column class="border"
          label="Date Created"
          prop="createdAt">
        </el-table-column>
        <el-table-column class="border"
          label="Property ID"
          prop="property_no">
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios';
import { baseUrl, getProperties } from '../../../assets/utils/properties-api.js';

export default {
  name:'admin-listings',
  data(){
    return{
      activeMenu:'published',
      published:[],
      properties:[]
    }
  },
  methods:{
    handleMenu:function(){

    },
    getPublished:function(){
      const self = this;
      //var profile = JSON.parse(getProfile());
      axios.get(baseUrl()+'/property',{ params:{ status: 1}})
      .then(function (response) {
        self.published = response.data.properties
          console.log(self.published)
      })
      .catch(function (error) {
        console.log(error);
      });
    },
  },
  mounted(){
    this.getPublished();
  }
}
</script>

<style scoped>
  .navmenu-container,
  .data-container{
    padding:0px 10px;
  }
  .navmenu-container{
    position: -webkit-sticky;
    position: sticky;
    top:120px;
  }
  .is-active {
    color: #ffffff !important;
    background: #56BA50 !important;
  }
  @media (max-width : 769px){
    .navmenu-container,
    .property-container{
      margin: 0;
      padding: 0 15px 15px 15px;
    }
    .navmenu-container{
      top:0;
      position:relative;
    }
  }
</style>
