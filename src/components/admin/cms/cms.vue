<template>
  <div>
    <el-col :sm="24" :md="5" class="navmenu-container">
      <el-menu :default-active="activeMenu" class="text-left" @select="handleMenu">
        <el-submenu index="1">
          <template slot="title">Homepage</template>
          <el-menu-item index="slogan">Slogan</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">Publish Property</template>
          <el-menu-item index="step-one">Key Information</el-menu-item>
          <el-menu-item index="step-two">Unit Details</el-menu-item>
          <el-menu-item index="step-three">Amenities</el-menu-item>
          <el-menu-item index="step-four">Location</el-menu-item>
          <el-menu-item index="step-five">Description And Photos</el-menu-item>
          <el-menu-item index="step-six">Contacts</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
    <el-col :sm="24" :md="19" class="data-container">
      <div v-if="activeMenu === 'slogan'">
        <edit-slogan></edit-slogan>
      </div>
      <div v-if="activeMenu === 'step-one'">
        <edit-screentip-one></edit-screentip-one>
      </div>
      <div v-if="activeMenu === 'step-two'">
        <edit-screentip-two></edit-screentip-two>
      </div>
      <div v-if="activeMenu === 'step-three'">
        <edit-screentip-three></edit-screentip-three>
      </div>
      <div v-if="activeMenu === 'step-four'">
        <edit-screentip-four></edit-screentip-four>
      </div>
      <div v-if="activeMenu === 'step-five'">
        <edit-screentip-five></edit-screentip-five>
      </div>
      <div v-if="activeMenu === 'step-six'">
        <edit-screentip-six></edit-screentip-six>
      </div>
    </el-col>
  </div>
</template>

<script>
import EditSlogan from './Edit-Slogan.vue'
import EditScreentipOne from './Edit-screentip-one.vue'
import EditScreentipTwo from './Edit-screentip-two.vue'
import EditScreentipThree from './Edit-screentip-three.vue'
import EditScreentipFour from './Edit-screentip-four.vue'
import EditScreentipFive from './Edit-screentip-five.vue'
import EditScreentipSix from './Edit-screentip-six.vue'
export default {
  name:'admin-cms',
  data(){
    return{
      activeMenu:'slogan'
    }
  },
  methods:{
    handleMenu:function(itemMenu){
      this.activeMenu = itemMenu;
    },
    handleCommand(command){
      console.log(command)
    }
  },
  components:{ EditSlogan, EditScreentipOne, EditScreentipTwo, EditScreentipThree, EditScreentipFour, EditScreentipFive, EditScreentipSix }
}
</script>
<style>
.el-card__header{
  padding: 10px 20px 6px 20px !important;
  background-color: #f0f0f0;
}
</style>
<style scoped>
  .navmenu-container,
  .data-container{
    padding:0px 10px 10px 10px;
  }
  .el-card__header{
    padding: 15px 20px 0px 20px !important;
    background-color: #f0f0f0;
  }
</style>
