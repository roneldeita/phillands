<template>
  <div id="app">
      <navigation v-if="$route.name != 'index'" @login="LoginWasClicked" @search="searchWasClicked"></navigation>

      <router-view class="router-view" @login="LoginWasClicked" :search="search"></router-view>
      <bottom-navigation></bottom-navigation>
      <!-- <bottom-navigation class="footer"></bottom-navigation> -->
      <!-- <users></users> -->
      <login-modal :loginmodal="loginVisible" @loginmodalclose="closeLoginDialog"> </login-modal>
  </div>
</template>

<script>
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"

import Index from './components/Index.vue';
import Navigation from './components/template/Navigation.vue';
import LoginModal from './components/auth/Login-modal.vue';
import BottomNavigation from './components/template/BottomNavigation.vue';
import Users from './components/Users.vue';
import User from './components/User.vue';

export default {
  name: 'app',
  data(){
    return{
      loginVisible: false,
      search:''
    }
  },
  methods:{
    closeLoginDialog:function(){
      this.loginVisible = false
    },
    closeResetPasswordDialog:function(){
      this.resetPasswordVisible = false
    },
    LoginWasClicked:function(){
      this.loginVisible = true;
    },
    searchWasClicked:function(value){
      this.search = value
    }
  },
  components:{ Index, Navigation, LoginModal, BottomNavigation, Users, User,  },

}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Didact+Gothic');
@import url('../node_modules/bootstrap/dist/css/bootstrap.min.css');
@import url('../node_modules/pe7-icon/dist/dist/pe-icon-7-stroke.min.css');
@import url('../node_modules/font-awesome/css/font-awesome.min.css');
.border{
    border: 1px solid #999999
}

html{
  height: 100%
}

body{
  min-height: 100%
}


#app{
  font-family: 'Didact Gothic', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #636363 !important;
  padding-top: 150px;
  min-height:400px;
}

.router-view{
  min-height:400px;
  height:auto;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none !important;
  margin: 0 !important;
}

.el-tabs__item,
.nav-link{
  color:#636363;
  font-size: 16px !important;
}
.btn-pl-blue{
  background-color: #336699;
}
.btn-pl-green,
.btn-pl-green:hover,
.btn-pl-green:focus{
  background-color: #13ce66 !important;
  outline: 0 !important;
  border-color:  #13ce66 !important;
  color: #ffffff !important;
}
.bg-pl-green{
  background-color: #13ce66 !important;
}
.txt-pl-green{
  color: #13ce66
}
.txt-pl-light{
  color: #c0ccda
}

.el-dialog__header{
  padding: 0px !important;
}
.el-dialog__body{
  padding: 0px !important;
}
.el-dialog__headerbtn{
  position: absolute !important;
  right: 0 !important;
  padding: 8px 10px !important;
  z-index: 999999!important;
}
.el-tabs__item.is-active{
  color:#0275d8 !important
}
.el-tabs__active-bar{
  background-color:#0275d8 !important
}

</style>
