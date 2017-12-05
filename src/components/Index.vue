 <template>
  <div id="home" class="">
    <ul class="nav justify-content-end" style="margin-top:14px">
      <li v-show="!isLoggedIn()" class="nav-item">
        <el-button type="success" class="btn-pl-green" @click="LoginWasClickedThenPublish()">Publish Property</el-button>
      </li>
      <li v-show="!isLoggedIn()" class="nav-item">
        <a class="nav-link" href="javascript:void(0)" @click="LoginWasClicked()" style="margin-top:0px">Login/Register</a>
      </li>
      <li class="nav-item" v-show="isLoggedIn()">
        <el-button type="success" class="btn-pl-green" v-show="$route.name != 'publish-property'" @click="goToPath('publish-property')">Publish Property</el-button>
      </li>
      <li class="nav-item" v-if="isLoggedIn()">
        <el-dropdown trigger="click" style="padding:0px 25px" @command="handleNavCommand">
          <span class="el-dropdown-link">
            <img :src="profile.avatar" class="img-circle" :alt="profile.first_name" width="35" height="35">
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu class="dropdown" slot="dropdown">
            <el-dropdown-item v-if="userAccess.role === 2" command="admin-dashboard">Admin Dashboard</el-dropdown-item>
            <el-dropdown-item command="profile">Profile</el-dropdown-item>
            <el-dropdown-item command="listings">Listing</el-dropdown-item>
            <el-dropdown-item command="logout">Log out</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
    </ul>
    <br><br><br>
    <el-row type="flex" class="row-bg text-left" justify="center">
      <el-col :xs="22" :sm="20" :md="20">
        <a href="/"><img class="logo " src="../assets/PL_Logo_500px.png" alt=""></a>
        <slogan></slogan>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :xs="22" :sm="20" :md="20">
        <el-autocomplete
          style="width:100%"
          v-model="inputSearch"
          placeholder="Type the location? e.g Quezon City"
          size="large"
          icon="search"
          @select="handleIconClick"
          :on-icon-click="handleIconClick"
          :fetch-suggestions="querySearch"
          @focus="querySearch"
          @keyup.enter.native="handleIconClick"
          class="inline-input">
            <el-select slot="prepend" v-model="selectSearch" placeholder="Select">
              <el-option label="Condominium" value="1"></el-option>
              <el-option label="House and Lot" value="2"></el-option>
              <el-option label="Townhouse" value="3"></el-option>
              <el-option label="Commercial Lot" value="4"></el-option>
              <el-option label="Vacant Lot" value="5"></el-option>
            </el-select>
        </el-autocomplete>
      </el-col>
    </el-row>
    <br>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :xs="22" :sm="20" :md="20">
        <el-tabs v-model="activeNav" @tab-click="handleClick">
          <p class="sub-title">Featured <span class="txt-pl-green">Properties</span></p>
          <el-tab-pane label="For Sale" name="sale"></el-tab-pane>
          <el-tab-pane label="For Rent" name="rent"></el-tab-pane>
          <el-tab-pane label="Pre-Selling" name="pre-selling"></el-tab-pane>
          <el-tab-pane label="Foreclosure" name="foreclosure"></el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="left">
      <el-col :xs="24" :offset="2" :sm="14" :md="14" class="property-container">
        <featured-sale v-show="activeNav ==='sale'"></featured-sale>
        <featured-rent v-show="activeNav ==='rent'"></featured-rent>
        <featured-preselling v-show="activeNav ==='pre-selling'"></featured-preselling>
        <featured-foreclosure v-show="activeNav ==='foreclosure'"></featured-foreclosure>
      </el-col>
      <el-col :xs="0" :sm="6" :md="6" class="ads-container">
        <el-row :gutter="20">
          <el-col :span="24" class="property-block" v-for="add in adds" v-bind:data="add" v-bind:key="add.id">
            <a :href="add.link" target="_blank"><advertisement :img="add.img" style="padding:0px 0 20px 20px"></advertisement></a>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Slogan from './content/Slogan.vue'
import { getLocality } from '../assets/utils/properties-api.js'
import { isLoggedIn, login, logout, getProfile, getAccess } from '../assets/utils/auth.js';

import FeaturedSale from './featured/Featured-sale.vue'
import FeaturedRent from './featured/Featured-rent.vue'
import FeaturedPreselling from './featured/Featured-preselling.vue'
import FeaturedForeclosure from './featured/Featured-foreclosure.vue'
import Advertisement from './Advertisement.vue'

export default {
  name: 'index',
  data () {
    return {
      userAccess:{},
      inputSearch:'',
      selectSearch:'1',
      activeNav:'sale',
      profile:JSON.parse(getProfile()),
      adds:[
        { id:1, img:'/static/adds/Ads1.jpg', link:'https://iremitglobal.com/' },
        { id:2, img:'/static/adds/Ads2.jpg', link:'https://www.upsexpress.com.ph/' },
        { id:3, img:'/static/adds/Ads3.jpg', link:'https://www.upsexpress.com.ph/' },
      ]
    }
  },
  methods:{
    handleUserAccess(){
      getAccess().then( response => this.userAccess = response );
    },
    LoginWasClicked:function(){
      this.$emit('login');
    },
    LoginWasClickedThenPublish(){
      this.$emit('login');
    //  this.$router.push({redirect:{name:'publish-property'}});
      this.$router.replace({name:'publish-property'});
    },
    handleLogout() {
      logout();
    },
    goToPath(path){
      document.documentElement.scrollTop = 0;
      this.$router.push('/'+path);
    },
    handleNavCommand:function(command){
      document.documentElement.scrollTop = 0;
      if(command === "logout"){
        this.handleLogout();
      }else{
        this.$router.push({ name: command});
      }
    },
    isLoggedIn() {
      return isLoggedIn();
    },
    querySearch(queryString, cb) {
      var links = this.links;
      var results = queryString ? links.filter(this.createFilter(queryString)) : links;
      // call callback function to return suggestions
      cb(results);
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
    handleIconClick:function(){
      this.$router.push({name:this.activeNav, params:{property_type:this.selectSearch, location:this.inputSearch }})
    },
    handleClick:function(tab, event){
    //  console.log(tab.name)
    }
  },
  components:{ Slogan, FeaturedSale, FeaturedRent, FeaturedPreselling, FeaturedForeclosure,  Advertisement },
  mounted(){
    this.loadLocality();
    if(this.isLoggedIn()){
      this.handleUserAccess();
    }
  }
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
  .img-circle{
    border-radius: 50%;
  }
  .sub-title{
    font-size: 28px;
    margin: 15px 0 25px 0;
    color: #636363;

  }
  .el-select{
    min-width: 200px;
  }
  .el-dropdown-menu{
    margin-top: 10px;
    margin-right: 15px;
    width: 180px;
  }
  .ads-container{
    margin-top: 15px;
  }
  @media (max-width : 769px){
    .property-container{
      margin: 0;
      padding: 0 15px 15px 15px;
    }
    .ads-container{
      display: none
    }
  }
</style>
