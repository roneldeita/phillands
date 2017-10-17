<template>
  <div>
    <el-row :gutter="0">
      <el-col :xs="24" :offset="2" :span="5" class="navmenu-container">
        <el-menu :default-active="activeMenu" class="el-menu-vertical-demo" @select="handleMenu">
          <el-menu-item index="published">Published Listings</el-menu-item>
          <el-menu-item index="for-approval">For Approval</el-menu-item>
          <el-menu-item index="archives">Archives</el-menu-item>
          <el-menu-item index="wishlist">Wish List</el-menu-item>
        </el-menu>
        <br>
        <el-button style="width:100%; padding-top:15px; padding-bottom:15px"  @click="goToPublishListing">New Listing</el-button>
      </el-col>
      <el-col :xs="24" :span="14" class="property-container">
        <div v-if="activeMenu === 'published'">
          <property-box v-if="published.length" v-for="property in published" :key="property.id" :info="property"></property-box>
          <div class="jumbotron" v-if="published.length === 0">
            <h4>You have no published listings yet</h4>
            <a href="javascript:void(0)" @click="goToPublishListing"> <span class="fa fa-plus"></span> Add Listing</a>
          </div>
        </div>
        <div v-if="activeMenu === 'for-approval'">
          <property-box v-if="forApproval.length" v-for="property in forApproval" :key="property.id" :info="property"></property-box>
          <div class="jumbotron" v-else="forApproval.length === 0">
            <h4><a href="javascript:void(0)" @click="goToPublishListing"> <span class="fa fa-plus"></span> Add Listing</a></h4>
          </div>
        </div>
        <div v-if="activeMenu === 'archives'">
          <property-box v-for="n in 0" :key="n" :info="archives"></property-box>
        </div>
        <div v-if="activeMenu === 'wishlist'">
          <property-box v-if="wishlist.length" v-for="item in wishlist" :key="item.id" :info="item"></property-box>
          <div class="jumbotron" v-else="wishlist.length === 0">
            <h4><a href="javascript:void(0)" @click="goToPublishListing"> <span class="fa fa-plus"></span> Add Listing</a></h4>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import { baseUrl, getWishList } from '../../assets/utils/properties-api.js';
import { getIdToken, getProfile } from '../../assets/utils/auth.js';
import PropertyBox from './Property-box.vue'

export default {
  name:'listings',
  data(){
    return{
      activeMenu:'published',
      published :'',
      forApproval : '',
      archives : 'Archives',
      inactives : 'Inactive Postings',
      wishlist : '',
    }
  },
  methods:{
    handleMenu:function(itemMenu) {
      this.activeMenu = itemMenu;
      this.getApproval();
      this.getPublished();
      this.getWishList();
      if(itemMenu === 'published'){
        this.$router.replace({name:'listings'});
      }else{
        this.$router.replace({name:itemMenu});
      }
    },
    goToPublishListing(){
      this.$router.push({name:'publish-property'});
    },
    getPublished:function(){
      const self = this;
      var profile = JSON.parse(getProfile());
      axios.get(baseUrl()+'/property',{ params:{owner_id: profile.id, status: 1}})
      .then(function (response) {
        self.published = response.data.properties
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getApproval:function(){
      const self = this;
      var profile = JSON.parse(getProfile());
      axios.get(baseUrl()+'/property',{ params:{owner_id: profile.id, status: 0}})
      .then(function (response) {
        console.log(response.data.properties)
        self.forApproval = response.data.properties
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getWishList(){
      getWishList().then((wishlist)=>{
        var arr = [];
        for(var wish in wishlist){
          arr.push(wishlist[wish].property)
        }
        this.wishlist = arr;
      })
    }
  },
  mounted(){
    if(this.$route.name === 'listings'){
      this.activeMenu = 'published';
    }else{
      this.activeMenu = this.$route.name;
    }

    this.getApproval();
    this.getPublished();
    this.getWishList();
  },
  components:{ PropertyBox },

}
</script>

<style scoped>
.navmenu-container{
  position: -webkit-sticky;
  position: sticky;
  top:120px;
  padding:0px 20px;
}
.el-menu-item {
 font-size: 16px !important;
}
.is-active {
  color: #ffffff !important;
  background: #56BA50 !important;
  font-size: 16px !important;
}
@media (max-width : 769px){
  .navmenu-container,
  .property-container{
    margin: 0;
    padding: 0 15px 15px 15px;
  }
  .navmenu-container{
    top:0;
    position:relative;
  }
}
</style>
