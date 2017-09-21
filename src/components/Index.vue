 <template>
  <div id="home" class="">
    <ul class="nav justify-content-end" style="margin-top:14px">
      <li class="nav-item">
        <a class="nav-link" href="javascript:void(0)" v-show="!isLoggedIn()" @click="handleLogin()" style="margin-top:0px">Login/Register</a>
      </li>
      <li class="nav-item" v-show="isLoggedIn()">
        <button type="button" class="btn btn-success" v-show="$route.name != 'publish-property'" @click="goToPath('publish-property')">Publish Property</button>
      </li>
      <li class="nav-item" v-if="isLoggedIn()">
        <el-dropdown trigger="click" style="padding:0px 25px" @command="handleNavCommand">
          <span class="el-dropdown-link">
            <img :src="profile.picture" class="img-circle" :alt="profile.name" width="35" height="35">
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu class="dropdown" slot="dropdown">
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
        <a href="/"><img class="logo " src="../assets/PL_Logo_250px.png" alt=""></a>
        <p class="title">
          The best way to find home and<br>
          settle your future.</p><br>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :xs="22" :sm="20" :md="20">
        <el-input v-model="inputSearch" placeholder="Type the location? e.g Quezon City" size="large" icon="search" :on-icon-click="handleIconClick">
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
          <p class="sub-title">Featured <span class="txt-pl-green">Properties</span></p>
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
import { isLoggedIn, login, logout, getProfile } from '../assets/utils/lock.js';

import FeaturedSale from './featured/Featured-sale.vue'
import FeaturedRent from './featured/Featured-rent.vue'
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      inputSearch:'',
      selectSearch:'1',
      activeNav:'sale',
      profile:JSON.parse(getProfile())
    }
  },
  methods:{
    handleLogin() {
      login();
    },
    handleLogout() {
      logout();
    },
    goToPath(path){
      this.$router.push('/'+path);
    },
    handleNavCommand:function(command){
      if(command === "logout"){
        this.handleLogout();
      }else{
        this.$router.push('/'+command);
      }
    },
    isLoggedIn() {
      return isLoggedIn();
    },
    handleIconClick:function(){
      this.$router.push({name:this.activeNav, params:{input_search:this.inputSearch, select_search:this.selectSearch}})
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
  .img-circle{
    border-radius: 50%;
  }
  .title{
    font-size: 46px;
    line-height: 52px;
    color: #636363;
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
</style>
