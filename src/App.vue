<template>
  <div id="app">
      <navigation></navigation>

      <router-view></router-view>

      <login></login>
      <!-- <users></users> -->
  </div>
</template>

<script>
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import "../node_modules/pe7-icon/dist/dist/pe-icon-7-stroke.min.css";

import Index from './components/Index.vue';
import Navigation from './components/Navigation.vue';
import Login from './components/Login.vue'
import Users from './components/Users.vue';
import User from './components/User.vue';

export default {
  name: 'app',
  components:{ Index, Navigation, Login, Users, User }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat|Roboto');
.border{
    border: 1px solid #999999
}
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 180px;
}
.btn-pl-blue{
  background-color: #336699;
}
.btn-pl-green{
  background-color: #56BA500;
}
</style>
