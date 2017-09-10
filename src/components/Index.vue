<template>
  <div id="home" class="">
    <ul class="nav justify-content-end">
      <li class="nav-item" v-show="isLoggedIn()">
        <router-link  class="nav-link" :to="'publish-property'">Publish Property</router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="javascript:void(0)" v-show="isLoggedIn()" @click="handleLogout()">Log out</a>
        <a class="nav-link" href="javascript:void(0)" v-show="!isLoggedIn()" @click="handleLogin()">Login/Register</a>
      </li>
    </ul>
    <br><br><br>
    <el-row type="flex" class="row-bg text-left" justify="center">
      <el-col :xs="22" :sm="20" :md="20">
        <a href="/"><img class="logo " src="../assets/PL_Logo_250px.png" alt=""></a>
        <p class="title">
          The best way to find home and<br>
          settle your future.</p><br>
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
    <br>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :xs="22" :sm="20" :md="20">
        <el-tabs v-model="activeNav" @tab-click="handleClick">
          <p class="sub-title">FEATURED <span class="txt-pl-green">PROPERTIES</span></p>
          <el-tab-pane label="For Sale" name="sale"><featured-sale></featured-sale></el-tab-pane>
          <el-tab-pane label="For Rent" name="rent"><featured-rent></featured-rent></el-tab-pane>
          <el-tab-pane label="Pre-Selling" name="pre-selling"> For Pre-selling</el-tab-pane>
          <el-tab-pane label="Foreclosure" name="foreclosure">For Forclosure</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { isLoggedIn, login, logout } from '../assets/utils/lock.js';

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
    margin: 13px 8px 0 0;
    outline: none;
  }
  .logo{
    width:230px;
    padding:0 0 0 0;
    margin: 0 0 15px 0;
  }
  .title{
    font-size: 46px;
    line-height: 52px;
    color: #636363;
  }
  .sub-title{
    font-size: 24px;
    margin: 15px 0 25px 0;
    color: #636363;
  }
  .el-select{
    min-width: 200px;
  }
</style>
