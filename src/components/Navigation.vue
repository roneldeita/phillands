<template>
  <div>
    <nav class="navbar fixed-top navbar-toggleable-md navbar-light">
      <a class="navbar-brand text-left" href="javascript:void(0)" @click="GoHome">
        <img src="../assets/PL_Logo_250px.png" alt="">
      </a>
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <form class="form-inline" v-if="allowedSearchRoutes.includes($route.name)">
          <el-row type="flex" class="row-bg search-continer" justify="start">
            <el-col :span="24">
              <el-input v-model="inputSearch" placeholder="Type the location? e.g Quezon City" size="midium" icon="search" :on-icon-click="handleIconClick">
                <el-select slot="prepend" v-model="selectSearch" placeholder="Select">
                  <el-option label="House and Lot" value="1"></el-option>
                  <el-option label="Condominium" value="2"></el-option>
                  <el-option label="Land" value="3"></el-option>
                </el-select>
              </el-input>
            </el-col>
          </el-row>
        </form>
        <ul class="nav navbar-nav ml-auto">
          <li class="nav-item" v-show="isLoggedIn()">
            <button type="button" class="btn btn-success" v-show="$route.name != 'publish-property'" @click="goToPath('publish-property')">Publish Property</button>
            <button type="button" class="btn btn-success" v-show="$route.name === 'publish-property'" @click="goToPath('sale')">Cancel</button>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" v-show="!isLoggedIn()" @click="handleLogin()">Login/Register</a>
          </li>
          <li class="nav-item" v-if="isLoggedIn()">
            <el-dropdown trigger="click" style="padding:0px 25px" @command="handleNavCommand">
              <span class="el-dropdown-link">
                <img :src="profile.picture" class="img-circle" :alt="profile.name" width="35" height="35">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu class="dropdown" slot="dropdown">
                <el-dropdown-item command="profile">Profile</el-dropdown-item>
                <el-dropdown-item command="listings">Listings</el-dropdown-item>
                <el-dropdown-item command="logout">Log out</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </div>
    </nav>
    <el-tabs v-model="activeNav" v-if="allowedSearchRoutes.includes($route.name)" class="main-nav fixed-top" @tab-click="changeTab">
      <el-tab-pane label="For Sale" name="sale"></el-tab-pane>
      <el-tab-pane label="For Rent" name="rent"></el-tab-pane>
      <el-tab-pane label="Pre-Selling" name="pre-selling"></el-tab-pane>
      <el-tab-pane label="Foreclosure" name="foreclosure"></el-tab-pane>
    </el-tabs>
    <el-tabs v-model="activeNav" v-if="allowedSellertRoutes.includes($route.name)" class="main-nav fixed-top" @tab-click="changeTab">
      <el-tab-pane label="Profile" name="profile"></el-tab-pane>
      <el-tab-pane label="Listings" name="listings"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { isLoggedIn, login, logout, getProfile } from '../assets/utils/lock.js';

export default {
    name: "navigation",
    data(){
      return{
        activeNav:'',
        inputSearch:'',
        selectSearch:'1',
        allowedSearchRoutes:[
          'sale',
          'rent'
        ],
        allowedSellertRoutes:[
          'profile',
          'listings'
        ],
        profile: JSON.parse(getProfile())
      }
    },
    methods:{
      handleLogin() {
        login();
      },
      handleLogout() {
        logout();
      },
      isLoggedIn() {
        return isLoggedIn();
      },
      GoHome:function(){
        this.$router.push('/');
      },
      goToPath(path){
        this.$router.push('/'+path);
      },
      handleNavCommand:function(command){
        if(command === "logout"){
          this.handleLogout();
        }else{
          this.activeNav = command;
          this.changeTab({name:command});
        }
      },
      handleIconClick(){
        console.log(this.activeNav);
        console.log(this.inputSearch);
        console.log(this.selectSearch);
      },
      changeTab:function(tab, event){
        console.log(tab.name);
        this.$router.push(tab.name);
      }
    },
    mounted(){
      this.activeNav=this.$route.name;
      this.selectSearch = this.$route.params.select_search;
      this.inputSearch = this.$route.params.input_search;
      if(this.$route.params.input_search != ''){
        this.handleIconClick();
      }
    }
}
</script>

<style scoped>
  .navbar{
    background-color: #ffffff;
  }
  .img-circle{
    border-radius: 50%;
  }
  .navbar-brand img{
     width:130px;
     padding:0;
     margin: 0 15px 0 0;
  }
  .navbar-toggler{
    border: 0px;
    cursor:pointer;
  }
  .navbar-toggler:focus,
  .nav-link:focus{
    outline: none;
  }
  .search-continer{
    min-width: 600px;
  }
  @media (max-width: 575px) {
    .search-continer{
      min-width: auto;
    }
  }
  .main-nav{
    position: fixed;
    background-color: #ffffff;
    box-shadow: 0 4px 2px -3px #d9d9d9;
    margin-top: 60px;
    z-index: 1;
  }
  .el-select{
    min-width: 160px;
  }
</style>

<style>
  .dropdown{
    margin-top: 10px;
    margin-right: 15px;
    width: 180px;
  }
  .main-nav .el-tabs__header{
    margin: 0 !important;
  }
  div.el-progress-bar,
  div.el-progress-bar__outer,
  div.el-progress-bar__inner{
    border-radius: 0px !important;
  }
</style>
