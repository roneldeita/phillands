<template>
  <div id="foreclose-card">
    <el-card class="box-card">
      <div style="display:flex">
        <div class="img-container border" style="order:0">
          <img src="../assets/camera.png" alt="">
        </div>
        <div class="border" style="order:0;flex-grow:1 ">
          <p class="price">₱ 5,000,000.00 </p>
          <p class="location">Santa Maria, Bulacan, Philippines</p>
        </div>
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
