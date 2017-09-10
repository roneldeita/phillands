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
        <form class="form-inline">
          <el-row type="flex" class="row-bg search-continer" justify="start">
            <el-col :span="24">
              <el-input placeholder="Type the location? e.g Quezon City" size="midium" icon="search" :on-icon-click="handleIconClick">
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
            <button type="button" class="btn btn-success" v-show="$route.name != 'publish-property'" @click="goToPublishProperty()">Publish Property</button>
            <button type="button" class="btn btn-success" v-show="$route.name === 'publish-property'">Cancel</button>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" v-show="isLoggedIn()" @click="handleLogout()">Log out</a>
            <a class="nav-link" href="javascript:void(0)" v-show="!isLoggedIn()" @click="handleLogin()">Login/Register</a>
          </li>
        </ul>
      </div>
    </nav>
    <el-tabs v-model="activeNav" v-show="$route.name != 'index'" class="main-nav fixed-top" @tab-click="changeTab">
      <el-tab-pane label="For Sale" name="sale"></el-tab-pane>
      <el-tab-pane label="For Rent" name="rent"></el-tab-pane>
      <el-tab-pane label="Pre-Selling" name="pre-selling"></el-tab-pane>
      <el-tab-pane label="Foreclosure" name="foreclosure"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { isLoggedIn, login, logout } from '../assets/utils/lock.js';

export default {
    name: "navigation",
    data(){
      return{
        activeNav:'',
        selectSearch:'1'
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
      goToPublishProperty:function(){
        this.$router.push('/publish-property');
      },
      handleIconClick(){

      },
      changeTab:function(tab, event){
        console.log(tab.name);
        this.$router.push(tab.name);
      }
    },
    mounted(){
      this.activeNav=this.$route.name;
    }
}
</script>

<style scoped>
  .navbar{
    background-color: #ffffff;
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
  .main-nav .el-tabs__header{
    margin: 0 !important;
  }
</style>
