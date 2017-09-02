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
        <form class="form-inline mr-auto">
          <div class="input-group input-group-md">
            <input type="text" class="form-control" placeholder="Search Location">
            <input type="text" class="form-control" placeholder="Maximum Price">
          </div>
        </form>
        <ul class="nav navbar-nav ml-auto">
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
    <!-- <ul v-if="$route.name != 'index'" class="nav main-nav fixed-top">
      <li class="nav-item"><router-link class="nav-link" :to="{ name: 'sale', params: {} }">FOR SALE</router-link></li>
      <li class="nav-item"><router-link class="nav-link" :to="{ name: 'rent', params: {} }">FOR RENT</router-link></li>
      <li class="nav-item"><a class="nav-link disabled" href="#">PRE-SELLING</a></li>
      <li class="nav-item"><a class="nav-link disabled" href="#">FORCLOSURE</a></li>
    </ul> -->
  </div>
</template>

<script>
import { isLoggedIn, login, logout } from '../assets/utils/lock.js';

export default {
    name: "navigation",
    data(){
      return{
        activeNav:''
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
        this.$router.push('/')
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
  .nav-item{
    font-size: 14px;
  }
  .navbar-toggler:focus,
  .nav-link:focus{
    outline: none;
  }
  .main-nav{
    position: fixed;
    background-color: #ffffff;
    box-shadow: 0 4px 2px -3px #d9d9d9;
    margin-top: 65px;
    z-index: 1;
  }

</style>

<style>
  .main-nav .el-tabs__header{
    margin: 0 !important;
  }
</style>
