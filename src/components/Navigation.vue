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
              <el-autocomplete style="width:100%"
                v-model="searchLocation"
                placeholder="Type the location? e.g Quezon City"
                size="midium"
                icon="search"
                :on-icon-click="handleSearch"
                @select="handleSearch"
                :fetch-suggestions="querySearch"
                @focus="querySearch"
                class="inline-input">
                  <el-select slot="prepend" v-model="propertyType" placeholder="Select" @change="handleSearch">
                    <!-- <el-option label="All" value=""></el-option> -->
                    <el-option label="Condominium" value="1"></el-option>
                    <el-option label="House and Lot" value="2"></el-option>
                    <el-option label="Townhouse" value="3"></el-option>
                  </el-select>
              </el-autocomplete>
            </el-col>
          </el-row>
        </form>
        <ul class="nav navbar-nav ml-auto">
          <li class="nav-item" v-if="isLoggedIn()">
            <button type="button" class="btn btn-success" v-if="!publishPropertyBtn.includes($route.name)" @click="goToPath('publish-property')">Publish Property</button>
            <button type="button" class="btn btn-success" v-show="$route.name === 'publish-property'" @click="goToPath('listings')">Cancel</button>
            <button type="button" class="btn btn-success" v-show="$route.name === 'view-property'" @click="handleBack">Back</button>
          </li>
          <li v-if="!isLoggedIn()">
            <button type="button" class="btn btn-success" v-show="$route.name === 'view-property'" @click="handleBack">Back</button>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" v-show="!isLoggedIn()" @click="LoginWasClicked()">Login/Register</a>
          </li>
          <li class="nav-item" id="dropdown-lg" v-if="isLoggedIn()">
            <el-dropdown trigger="click" style="padding:0px 25px" @command="handleNavCommand">
              <span class="el-dropdown-link">
                <img v-if="profile" :src="profile.avatar" class="img-circle" :alt="profile.first_name" width="35" height="35">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu class="dropdown" slot="dropdown">
                <el-dropdown-item command="profile">Profile</el-dropdown-item>
                <el-dropdown-item command="listings">Listings</el-dropdown-item>
                <el-dropdown-item command="logout">Log out</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li class="nav-item dropdown" id="dropdown-sm">
            <a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img v-if="profile" :src="profile.avatar" class="img-circle" :alt="profile.first_name" width="35" height="35">
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" href="javascript:void(0)" @click="handleNavCommand('profile')">Profile</a>
              <a class="dropdown-item" href="javascript:void(0)" @click="handleNavCommand('listings')">Listings</a>
              <a class="dropdown-item" href="javascript:void(0)" @click="handleNavCommand('logout')">Log out</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <el-tabs v-model="activeNav" v-if="allowedNavRoutes.includes($route.name)" class="main-nav fixed-top" @tab-click="changeTab">
      <el-tab-pane label="For Sale" name="sale"></el-tab-pane>
      <el-tab-pane label="For Rent" name="rent"></el-tab-pane>
      <el-tab-pane label="Pre-Selling" name="pre-selling"></el-tab-pane>
      <el-tab-pane label="Foreclosure" name="foreclosure"></el-tab-pane>
    </el-tabs>
    <el-tabs v-model="activeNav" v-if="allowedSellertRoutes.includes($route.name)" class="main-nav fixed-top" @tab-click="changeTab">
      <el-tab-pane label="Profile" name="profile"></el-tab-pane>
      <el-tab-pane label="Listings" name="listings"></el-tab-pane>
    </el-tabs>
    <el-tabs v-model="activeNav" v-if="allowedAdminRoutes.includes($route.name)" class="main-nav fixed-top" @tab-click="changeTab">
      <el-tab-pane label="Dashboard" name="admin-dashboard"></el-tab-pane>
      <el-tab-pane label="Users" name="admin-users"></el-tab-pane>
      <el-tab-pane label="Listings" name="admin-listings"></el-tab-pane>
      <el-tab-pane label="Advertisements" name="admin-ads"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getLocality } from '../assets/utils/properties-api.js'
import { isLoggedIn, login, logout, getProfile } from '../assets/utils/auth.js';

export default {
    name: "navigation",
    data(){
      return{
        activeNav:'',
        searchLocation:'',
        propertyType:'1',
        links:[],
        publishPropertyBtn:[
          'publish-property',
          'edit-property',
          'view-property',
          'admin-dashboard',
          'admin-users',
          'admin-listings',
          'admin-ads'
        ],
        allowedSearchRoutes:[
          'sale',
          'rent',
          'pre-selling',
          'foreclosure',
          'login',
          'register',
          //'view-property'
        ],
        allowedNavRoutes:[
          'sale',
          'rent',
          'pre-selling',
          'foreclosure',
          'login',
          'register'
        ],
        allowedSellertRoutes:[
          'profile',
          'listings',
          'for-approval',
          'archives',
          'wishlist'
        ],
        allowedAdminRoutes:[
          'admin-dashboard',
          'admin-users',
          'admin-listings',
          'admin-ads'
        ],
        profile: JSON.parse(getProfile())
      }
    },
    methods:{
      LoginWasClicked:function(){
        this.$emit('login');
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
        if(path === 'listings'){
          this.activeNav = 'listings';
        }
        this.$router.replace({ name: path});
      },
      handleNavCommand:function(command){
        console.log(command)
        if(command === "logout"){
          this.handleLogout();
        }else{
          this.activeNav = command;
          this.$router.replace({ name: command});
        }
      },
      querySearch(queryString, cb) {
        var links = this.links;
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        // call callback function to return suggestions
        cb(results);
        console.log(results);
      },
      createFilter(queryString) {
        return (link) => {
          return (link.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadLocality() {
        getLocality().then((localities) => {
          var arr= [];
          for (var key in localities) {
             arr.push({"value": localities[key].locality.toLowerCase()});
          }
          this.links = arr;
        });
      },
      handleSearch:function(){
        // console.log('offer_type: ' + this.activeNav);
        // console.log('location: ' + this.searchLocation);
        // console.log('property_type: ' + this.propertyType);
        //this.changeTab(this.activeNav)
        this.$emit('search', { offer_type: this.activeNav, property_type:this.propertyType, location:this.searchLocation});
      },
      changeTab:function(tab, event){
        this.$router.replace({ name: tab.name});
      },
      handleBack:function(){
        var self = this;
        this.$router.go(-1);
        setTimeout(function(){
          self.handleSearch();
        }, 300);
      }
    },
    mounted(){
      //set activeNav
      var listings = [
        'listings',
        'for-approval',
        'archives',
        'inactive'
      ];
      if(listings.includes(this.$route.name)){
        this.activeNav = 'listings';
      }else{
        this.activeNav = this.$route.name;
      }

      //for admin
      if(this.$route.name === 'admin-dashboard'){
        this.activeNav = 'admin-dashboard';
      }

      this.propertyType = this.$route.params.property_type;
      this.searchLocation = this.$route.params.location;
      this.loadLocality();

      this.handleSearch();
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
    z-index: 3;
  }
  .el-select{
    min-width: 160px;
  }
  .el-dropdown-menu{
    margin-top: 10px;
    margin-right: 15px;
    width: 180px;
  }
</style>

<style>
  .main-nav .el-tabs__header{
    margin: 0 !important;
  }
  div.el-progress-bar,
  div.el-progress-bar__outer,
  div.el-progress-bar__inner{
    border-radius: 0px !important;
  }

  @media (min-width: 991px){
    #dropdown-lg{
      display: block !important;
    }
    #dropdown-sm{
      display: none !important;
    }
  }

  @media (max-width: 991px){
    #dropdown-lg{
      display: none !important;
    }
    #dropdown-sm{
      display: block !important;
    }
    .search-continer{
      margin-top: 5px;
    }
    .navbar-collapse .navbar-nav .nav-item{
      margin: 10px 0 0 0;
      text-align: left;
    }
    .navbar-collapse .navbar-nav a.dropdown-toggle{
      padding-top: 0px !important;
      margin-top: -10px;
    }
  }
</style>
