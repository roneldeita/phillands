<template>
  <div>
    <el-row :gutter="0">
      <el-col :xs="24" :offset="2" :span="5" class="navmenu-container">
        <el-menu :default-active="activeMenu" class="el-menu-vertical-demo" @select="handleMenu">
          <el-menu-item index="published">Published Listings</el-menu-item>
          <el-menu-item index="for-approval">For Approval</el-menu-item>
          <el-menu-item index="archives">Archives</el-menu-item>
          <el-menu-item index="inactive">Inactive</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :xs="24" :span="14" class="property-container">
        <div v-if="activeMenu === 'published'">
          <property-box v-for="n in 5" :key="n" :name="published"></property-box>
        </div>
        <div v-if="activeMenu === 'for-approval'">
          <property-box v-for="n in 5" :key="n" :name="forApproval"></property-box>
        </div>
        <div v-if="activeMenu === 'archives'">
          <property-box v-for="n in 5" :key="n" :name="archives"></property-box>
        </div>
        <div v-if="activeMenu === 'inactive'">
          <property-box v-for="n in 10" :key="n" :name="inactives"></property-box>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PropertyBox from './Property-box.vue'
export default {
  name:'listings',
  data(){
    return{
      activeMenu:'published',
      published :'Your Published Property',
      forApproval : 'Wait for approval',
      archives : 'Archives',
      inactives : 'Inactive Postings'
    }
  },
  methods:{
    handleMenu:function(itemMenu) {
      this.activeMenu = itemMenu;
      if(itemMenu === 'published'){
        this.$router.push({name:'listings'});
      }else{
        this.$router.push({name:itemMenu});
      }
    }
  },
  mounted(){
    if(this.$route.name === 'listings'){
      this.activeMenu = 'published';
    }else{
      this.activeMenu = this.$route.name;
    }
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
  color: #ffffff;
  background: #56BA50;
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
