<template>
  <div id="app">
      <navigation v-if="$route.name != 'index'"></navigation>

      <router-view></router-view>

      <!-- <users></users> -->
  </div>
</template>

<script>
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"

import Index from './components/Index.vue';
import Navigation from './components/Navigation.vue';
import Users from './components/Users.vue';
import User from './components/User.vue';

export default {
  name: 'app',
  components:{ Index, Navigation, Users, User }
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

.el-tabs__item,
.nav-link{
  color:#636363;
  font-size: 16px !important;
}

.btn-pl-blue{
  background-color: #336699;
}
.btn-pl-green{
  background-color: #56BA50;
}
.txt-pl-green{
  color: #56BA50
}
</style>
