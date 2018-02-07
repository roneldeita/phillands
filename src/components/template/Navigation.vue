<template>
  <div>
    <nav class="navbar fixed-top navbar-toggleable-md navbar-light">
      <a class="navbar-brand text-left" href="javascript:void(0)" @click="GoHome">
        <img src="../../assets/PL_Logo_500px.png" alt="">
      </a>
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <el-popover class="filters"
          ref="popover"
          placement="bottom"
          width="500"
          trigger="click">
          <div v-loading="true" element-loading-text="This feature is coming soon...">
            <el-card class="card" style="border-bottom: 1px solid #dddddd">
              <h5 class="text-muted">Price</h5>
              <h6 class="label">Price ₱{{priceRange[0]}} - ₱{{(priceRange[1] >= 5000000) ? '5000000+' : priceRange[1]}}</h6>
              <el-slider
                v-model="priceRange"
                :step="1000"
                range
                show-stops
                :show-tooltip="false"
                :max="5000000">
              </el-slider>
            </el-card>
            <el-card class="card" style="border-bottom: 1px solid #dddddd">
              <h5 class="text-muted">Bedrooms & Bathrooms</h5>
              <h6 class="label">Bedrooms</h6>
              <el-input-number v-model="beds" :min="0" :max="10"></el-input-number>
              <h6 class="label">Bathrooms</h6>
              <el-input-number v-model="baths" :min="0" :max="10"></el-input-number>
            </el-card>
            <el-card class="card">
              <h5 class="text-muted">Amenities</h5>
              <h6 class="label">Choose the amenities from the options or manually type if not available.</h6>
              <el-select
                v-model="amenities"
                size="large"
                multiple
                filterable
                allow-create
                placeholder=""
                style="width:100%;">
                <el-option
                  v-for="amenity in amenitiesOptions"
                  :key="0"
                  :label="amenity.label"
                  :value="amenity.value">
                </el-option>
              </el-select>
            </el-card>
          </div>
        </el-popover>
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
                @keyup.enter.native="handleSearch"
                class="inline-input">
                  <el-button slot="append" v-popover:popover><span class="fa fa-sliders"></span> More Filters</el-button>
                  <el-select slot="prepend" v-model="propertyType" placeholder="Select" @change="handleSearch">
                    <!-- <el-option label="All" value=""></el-option> -->
                    <el-option label="Condominium" value="1"></el-option>
                    <el-option label="House and Lot" value="2"></el-option>
                    <el-option label="Townhouse" value="3"></el-option>
                    <el-option label="Commercial Lot" value="4"></el-option>
                    <el-option label="Vacant Lot" value="5"></el-option>
                  </el-select>
              </el-autocomplete>
            </el-col>
          </el-row>
        </form>
        <ul class="nav navbar-nav ml-auto">
          <li class="nav-item" v-if="isLoggedIn()">
            <el-button type="success" class="btn-pl-green" v-if="!publishPropertyBtn.includes($route.name)" @click="goToPath('publish-property')">Publish Property</el-button>
            <el-button v-show="$route.name === 'publish-property'" @click="cancelPublish()">Cancel</el-button>
            <el-button type="success" class="btn-pl-green" v-show="$route.name === 'view-property' || $route.name ==='edit-property'" @click="handleBack">Back</el-button>
          </li>
          <li v-if="!isLoggedIn()" class="nav-item">
            <el-button type="success" class="btn-pl-green" v-show="$route.name === 'view-property'" @click="handleBack">Back</el-button>
          </li>
          <li v-show="!isLoggedIn()" class="nav-item">
            <el-button type="success" class="btn-pl-green" v-show="$route.name != 'view-property'" @click="LoginWasClickedThenPublish()">Publish Property</el-button>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" v-show="!isLoggedIn()" @click="toggleLoginModal()">Login/Register</a>
          </li>
          <li class="nav-item" id="dropdown-lg" v-if="isLoggedIn()">
            <el-dropdown trigger="click" style="padding:0px 25px" @command="handleNavCommand">
              <span class="el-dropdown-link">
                <img v-if="profile" :src="profile.avatar" class="img-circle" :alt="profile.first_name" width="35" height="35">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu class="dropdown" slot="dropdown">
                <el-dropdown-item v-if="userAccess.role === 2" command="admin-dashboard">Admin Dashboard</el-dropdown-item>
                <el-dropdown-item command="profile">Profile</el-dropdown-item>
                <el-dropdown-item command="listings">Listings</el-dropdown-item>
                <el-dropdown-item command="logout">Log out</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li class="nav-item dropdown" id="dropdown-sm" v-if="isLoggedIn()">
            <a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img v-if="profile" :src="profile.avatar" class="img-circle" :alt="profile.first_name" width="35" height="35">
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" v-if="userAccess.role === 2" href="javascript:void(0)" @click="handleNavCommand('admin-dashboard')">Admin Dashboard</a>
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
      <el-tab-pane label="Listings" name="admin-listings"></el-tab-pane>
      <el-tab-pane label="Foreclosures" name="admin-foreclosures"></el-tab-pane>
      <el-tab-pane label="Contents" name="admin-cms"></el-tab-pane>
      <el-tab-pane label="Users" name="admin-users"></el-tab-pane>
      <el-tab-pane label="Advertisements" name="admin-ads"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import amenitiesOpts from '../../../static/json/amenities.json'
import { getLocality } from '../../assets/utils/properties-api.js'
import { isLoggedIn, login, logout, getAccess, getSearch } from '../../assets/utils/auth.js';

export default {
    name: "navigation",
    computed: {
      profile : function () {
        return JSON.parse(this.$store.getters.phillandsProfile)
      },
      search :function () {
        return this.$store.getters.phillandsSearch
      }
    },
    data(){
      return{
        userAccess:{},
        activeNav:'',
        searchLocation:'',
        priceRange: [500, 1000000],
        beds:0,
        baths:0,
        amenities:[],
        amenitiesOptions: [],
        propertyType:'1',
        links:[],
        publishPropertyBtn:[
          'publish-property',
          'edit-property',
          'view-property',
          'admin-dashboard',
          'admin-users',
          'admin-listings',
          'admin-cms',
          'admin-foreclosures',
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
          'admin-foreclosures',
          'admin-ads',
          'admin-cms'
        ]
      }
    },
    methods:{
      handleUserAccess(){
        getAccess().then(response => this.userAccess = response );
      },
      toggleLoginModal () {
        this.$store.dispatch('toggleLoginModal')
      },
      LoginWasClickedThenPublish(){
        this.$store.dispatch('toggleLoginModal')
        this.$router.replace({name:'publish-property'});
      },
      handleLogout() {
        logout();
      },
      isLoggedIn() {
        return isLoggedIn();
      },
      GoHome:function(){
        document.documentElement.scrollTop = 0;
        this.$router.push({name:'index'});
      },
      cancelPublish() {
        this.$confirm('You will discard all the information?', 'Warning', {
          confirmButtonText: 'Yes, Discard',
          confirmButtonClass: 'btn-pl-green',
          cancelButtonText: 'Resume',
          type: 'warning'
        }).then(() => {
          this.goToPath('listings')
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: 'Delete canceled'
          // });
        });
      },
      goToPath(path){
        document.documentElement.scrollTop = 0;
        if(path === 'listings'){
          this.activeNav = 'listings';
        }
        this.$router.replace({ name: path});
      },
      handleNavCommand:function(command){
        document.documentElement.scrollTop = 0;
        //console.log(command)
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
        //console.log(results);
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
        document.documentElement.scrollTop = 0;
        this.$store.dispatch('updatePhillandsSearch', {property_type: this.propertyType})
        this.$store.dispatch('updatePhillandsSearch', {location: this.searchLocation})
      },
      changeTab:function(tab, event){
        document.documentElement.scrollTop = 0;
        // this.$store.dispatch('updatePhillandsSearch', {offer_type: tab.name})
        this.$router.replace({ name: tab.name });
      },
      handleBack:function(){
        this.$router.go(-1);
        setTimeout(() => {
          this.handleSearch();
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

      if(this.search.property_type){
        this.propertyType = this.search.property_type.toString();
      }
      this.searchLocation = this.search.location;
      this.loadLocality();
      this.handleSearch();
      if(this.isLoggedIn()){
        this.handleUserAccess();
      }

      this.amenitiesOptions = amenitiesOpts;
    }
}
</script>

<style scoped>
  .card{
    padding: 0px;
    margin-bottom: 0px;
    border-radius: 0px;
    box-shadow:0 0;
    border: none;
    cursor: pointer;
  }
  .label{
    color: #999999;
    font-size: 14px;
    padding-top: 0px;
    margin-bottom: 5px;;
  }
  .navbar{
    background-color: #ffffff;
  }
  .img-circle{
    border-radius: 50%;
    object-fit: cover;
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
    .filters .el-card__body{
      width:100%
    }
  }
</style>
