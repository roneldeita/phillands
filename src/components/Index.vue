<template>
  <div id="home" class="">

    <el-row type="flex" class="row-bg text-left">
      <el-col :offset="14" :span="10" class="text-right">
        <!-- <a class="nav-link" data-toggle="modal" data-target="#myModal" href="#">Login/Register</a> -->
        <a class="nav-link" href="#" v-show="isLoggedIn()" @click="handleLogout()">Log out</a>
        <a class="nav-link" href="#" v-show="!isLoggedIn()" @click="handleLogin()">Login/Register</a>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg text-left" justify="center">
      <el-col :xs="22" :sm="20" :md="20">
        <img class="logo " src="../assets/PL_Logo_250px.png" alt="">
        <p class="title">Find your way home.</p><br>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :xs="22" :sm="20" :md="20">
        <el-input placeholder="Type the location? e.g Quezon City" size="large" icon="search" :on-icon-click="handleIconClick">
          <el-select slot="prepend" v-model="selectSearch" placeholder="Select">
            <el-option label="House and Lot" value="1"></el-option>
            <el-option label="Condominium" value="2"></el-option>
            <el-option label="Land" value="3"></el-option>
          </el-select>
        </el-input>
      </el-col>
    </el-row>
    <br><br>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :xs="22" :sm="20" :md="20">
        <el-tabs v-model="activeNav" @tab-click="handleClick">
          <el-tab-pane label="For Sale" name="sale"><featured-sale></featured-sale></el-tab-pane>
          <el-tab-pane label="For Rent" name="rent"><featured-rent></featured-rent></el-tab-pane>
          <el-tab-pane label="Pre-Selling" name="pre-selling" disabled></el-tab-pane>
          <el-tab-pane label="Foreclosure" name="foreclosure" disabled></el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { isLoggedIn, login, logout } from '../assets/utils/auth.js';

import FeaturedSale from './featured/Featured-sale.vue'
import FeaturedRent from './featured/Featured-rent.vue'
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      selectSearch:'1',
      activeNav:'sale'
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
    handleIconClick:function(e){
      //console.log(e)
    },
    handleClick:function(tab, event){
      //console.log(tab.name)
    }
  },
  components:{ FeaturedSale, FeaturedRent }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #home{
    margin-top: -150px
  }

  .nav-link{
    color: #999999;
    font-size: 14px;
    margin: 14px 10px 0 0;
    outline: none;

  }
  .logo{
    width:230px;
    padding:0 0 20px 0;
    margin: 0 15px 0 0;
  }
  .title{
    font-size: 42px;
    color: #8c8c8c
  }
  .el-select{
    min-width: 200px;
  }
</style>
