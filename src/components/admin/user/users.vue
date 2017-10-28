<template>
  <el-row>
    <el-col :xs="24" :span="5" class="navmenu-container">
      <el-menu :default-active="activeMenu" class="el-menu-vertical-demo" @select="handleMenu">
        <el-menu-item index="sellers">Sellers</el-menu-item>
        <el-menu-item index="brokers">Brokers</el-menu-item>
        <el-menu-item index="agents">Agents</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="19" class="data-container" v-if="activeMenu === 'sellers'">
      <seller></seller>
    </el-col>
    <el-col :span="19" class="data-container" v-if="activeMenu === 'broker'">

    </el-col>
  </el-row>
</template>

<script>
import seller from './seller.vue'
export default {
  name:'admin-users',
  data(){
    return{
      activeMenu:'sellers'
    }
  },
  methods:{
    handleMenu:function(itemMenu){
        this.activeMenu = itemMenu;
    }
  },
  mounted(){
  },
  components:{ seller }
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
    background: #56BA50 !important;
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
