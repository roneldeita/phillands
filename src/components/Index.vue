 <template>
  <div id="home" class="">
    <ul class="nav justify-content-end" style="margin-top:14px">
      <li v-show="!isLoggedIn()" class="nav-item">
        <el-button type="success" class="btn-pl-green" @click="LoginWasClickedThenPublish();">Publish Property</el-button>
      </li>
      <li v-show="!isLoggedIn()" class="nav-item">
        <a class="nav-link" href="javascript:void(0)" @click="toggleLoginModal()" style="margin-top:0px">Login/Register</a>
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
      <el-col :span="16">
        <a href="/"><img class="logo " src="../assets/PL_Logo_500px.png" alt=""></a>
        <slogan></slogan>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center" style="margin-top:35px;">
      <el-col :span="16">
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
          class="inline-input home-search">
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
      <el-col :span="16">
        <el-tabs v-model="activeNav" @tab-click="handleClick">
          <el-tab-pane label="For Sale" name="sale"></el-tab-pane>
          <el-tab-pane label="For Rent" name="rent"></el-tab-pane>
          <el-tab-pane label="Pre-Selling" name="pre-selling"></el-tab-pane>
          <el-tab-pane label="Foreclosure" name="foreclosure"></el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <br><br>
    <el-row :gutter="0" type="flex" class="row-bg" justify="center">
      <el-col :sm="16" :md="16" :lg="12" class="property-container">
        <featured-sale v-show="activeNav ==='sale'"></featured-sale>
        <featured-rent v-show="activeNav ==='rent'"></featured-rent>
        <featured-preselling v-show="activeNav ==='pre-selling'"></featured-preselling>
        <featured-foreclosure v-show="activeNav ==='foreclosure'"></featured-foreclosure>
      </el-col>
      <el-col :span="4" class="ads-container">
        <el-row :gutter="20">
          <el-col :span="24" class="property-block" v-for="add in adds" v-bind:data="add" v-bind:key="add.id">
            <a :href="add.link" target="_blank"><advertisement :img="add.img" style="padding:0px 0 20px 20px"></advertisement></a>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" class="developers-container">
      <el-col :xs="24" :sm="20" :md="20" :lg="16">
        <p class="sub-title">Featured Developers</p>
        <developers></developers>
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
import Developers from './Developers.vue'

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
  components:{ Slogan, FeaturedSale, FeaturedRent, FeaturedPreselling, FeaturedForeclosure,  Advertisement, Developers },
  mounted(){
    this.loadLocality();
    if(this.isLoggedIn()){
      this.handleUserAccess();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style media="screen">
.home-search .el-input-group .el-input__inner{
  height: 60px;
  font-size: 16px !important;
}
.home-search .el-input-group__prepend .el-select .el-input__inner{
  margin-left: 10px
}
.home-search .el-input__icon{
  margin-right: 10px;
  margin-left: 10px;
}

</style>
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
    object-fit: cover;
  }
  .el-select{
    min-width: 210px;
  }
  .el-dropdown-menu{
    margin-top: 10px;
    margin-right: 15px;
    width: 180px;
  }
  .ads-container{
    margin-top: 29px;
  }
  .sub-title{
    font-size: 26px;
    text-align: left;
    font-weight: bold;
    margin: 20px 0;
  }
  @media (max-width : 769px){
    .property-container,
    .developers-container{
      margin: 0;
      padding: 0 15px 15px 15px;
    }
    .ads-container{
      display: none
    }
  }
</style>
