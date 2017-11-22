<template>
  <el-row>
    <el-col :xs="24" :span="5" class="navmenu-container">
      <el-menu :default-active="activeMenu" class="el-menu-vertical-demo" @select="handleMenu">
        <el-menu-item index="for-approval">For Approval</el-menu-item>
        <el-menu-item index="published">Published</el-menu-item>
        <el-menu-item index="deleted">Deleted</el-menu-item>
        <el-menu-item index="wishlist">Reported</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="19" class="data-container" v-if="activeMenu === 'for-approval'">
      <for-approval></for-approval>
    </el-col>
    <el-col :span="19" class="data-container" v-if="activeMenu === 'published'">
      <published></published>
    </el-col>
    <el-col :span="19" class="data-container" v-if="activeMenu === 'deleted'">
      <deleted></deleted>
    </el-col>
    <el-col :span="19" class="data-container" v-if="activeMenu === 'forclosures'">
      <fore-closures></fore-closures>
    </el-col>
  </el-row>
</template>

<script>
import published from './Published.vue';
import forApproval from './For-approval.vue';
import Deleted from './Deleted.vue';

export default {
  name:'admin-listings',
  data(){
    return{
      activeMenu:'for-approval',
    }
  },
  methods:{
    handleMenu:function(itemMenu){
        this.activeMenu = itemMenu;
    }
  },
  mounted(){
  },
  components:{ published, forApproval, Deleted }
}
</script>

<style scoped>
  .navmenu-container,
  .data-container{
    padding:0px 10px;
  }
  .navmenu-container{
    position: -webkit-sticky;
    position: sticky;
    top:120px;
  }
  .is-active {
    color: #ffffff !important;
    background: #13ce66 !important;
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
