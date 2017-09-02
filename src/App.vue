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
import Login from './components/auth/Login.vue'
import Users from './components/Users.vue';
import User from './components/User.vue';

export default {
  name: 'app',
  components:{ Index, Navigation, Users, User }
}
</script>

<style>
@import url('../node_modules/bootstrap/dist/css/bootstrap.min.css');
@import url('../node_modules/pe7-icon/dist/dist/pe-icon-7-stroke.min.css');
@import url('https://fonts.googleapis.com/css?family=Montserrat');
.border{
    border: 1px solid #999999
}
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 150px;
}
.btn-pl-blue{
  background-color: #336699;
}
.btn-pl-green{
  background-color: #56BA50;
}
</style>
