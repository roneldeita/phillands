<template>
  <div id="app">
      <navigation v-if="$route.name != 'index'" @login="LoginWasClicked" @search="searchWasClicked"></navigation>

      <router-view  @login="LoginWasClicked" :search="search"></router-view>
      <!-- <users></users> -->
      <login-modal :modal="dialogVisible" @modalclose="closeLoginDialog"></login-modal>
  </div>
</template>

<script>
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"

import Index from './components/Index.vue';
import Navigation from './components/Navigation.vue';
import LoginModal from './components/auth/Login-modal.vue';
import Users from './components/Users.vue';
import User from './components/User.vue';

export default {
  name: 'app',
  data(){
    return{
      dialogVisible: false,
      search:''
    }
  },
  methods:{
    closeLoginDialog:function(){
      this.dialogVisible = false
    },
    LoginWasClicked:function(){
      this.dialogVisible = true;
    },
    searchWasClicked(value){
      this.search = value
    }
  },
  components:{ Index, Navigation, Users, User, LoginModal  },

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

#app {
  font-family: 'Didact Gothic', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #636363 !important;
  padding-top: 150px;
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
  background-color: #56BA50;
}
.txt-pl-green{
  color: #56BA50
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

</style>
