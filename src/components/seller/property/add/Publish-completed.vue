<template lang="html">
  <div class="text-left">
    <el-row>
      <el-col :xs="24" :offset="3" :span="9" class="form-container publish-complete">
        <div class="main-nav fixed-top" style="margin-top:66px">
          <el-progress  status="success" :show-text="false" :stroke-width="10" :percentage="100"></el-progress>
        </div>
        <h1><span class="fa fa-check-circle txt-pl-green"></span></h1>
        <h2>Your listing was successfully saved!</h2>
        <p>Your listing will be shown to potential buyers once approved.</p><br><br>
        <!-- <el-button class="pull-left" size="large" @click="handleBtn">Edit Listing</el-button> -->
        <el-button type="success" class="btn-pl-green"  size="large" @click="handleBtn">View your listing</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name:'publish-completed',
  methods:{
    handleBtn:function(){
      this.$router.push({name:'listings'});
    }
  },
  mounted(){
    document.documentElement.scrollTop = 0;
  }
}
</script>

<style>
.publish-complete .el-progress.is-success .el-progress-bar__inner{
  background-color: #0275d8 !important
}
</style>

<style scoped>
  .main-nav{
    position: fixed;
    background-color: #ffffff;
    box-shadow: 0 4px 2px -3px #d9d9d9;
    margin-top: 60px;
    z-index: 1;
  }

  @media (max-width: 769px) {
    .form-container{
      margin-left: 0px;
      padding: 0px 15px;
    }
  }
</style>
