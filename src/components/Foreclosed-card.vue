<template>
  <div id="foreclose-card">
    <el-card class="box-card">
      <div class="img-container">
        <img src="../assets/camera.png" alt="">
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "foreclose-card",
  data(){
    return{

    }
  }
}
</script>

<style>
  #foreclose-card .el-card__body{
    padding: 0px
  }
</style>

<style scoped>
  .el-card{
    box-shadow: 0px 0px 0px 0px !important;
    border-radius: 2px !important;
    margin-bottom: 5px;
  }
  .img-container{
    background-color: #f0f0f0;
    width: 180px;
    height: 120px;
  }
  .img-container img{
    width: 70px;
    position: relative;
    top: 48%;
    transform: translateY(-48%);
  }
</style>
