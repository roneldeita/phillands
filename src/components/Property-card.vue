<template>
  <div class="">
    <el-card :body-style="{ padding: '0px' }" class="card">
      <img :src="img">
    </el-card>
    <button type="success" class="btn btn-success btn-pl-green" @click="dialogVisible = true">VIEW LISTING</button>
    <div class="card-info-container">
      <p class="card-price">Php 2,000,000.00</p>
      <p class="card-title text-left">{{ title }}</p>
      <p class="card-location"><span class="pe-7s-map-marker"></span> {{ location }}</p>
      <p class="card-other text-right">
        <span class="fa fa-bed"></span> <span>3</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <span class="fa fa-bath"></span> <span>2</span>
      </p>
    </div>
    <el-dialog title=""  :visible.sync="dialogVisible" size="large">
      <el-row class="dialog-container">
        <el-col :xs="24 ":md="12">
          <div class="carousel-container">
            <el-carousel indicator-position="outside" :autoplay="false">
              <el-carousel-item v-for="item in 4" :key="item">
                <img :src="img" style="height:100%">
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
        <el-col :sm="24" :md="12">
          <div class="info-container text-left">
          	<br><br>
            <p class="price">Php 2,000,000.00</p>
            <p class="title">{{ title }}</p>
            <p class="location"><span class="fa fa-map-marker"></span> {{ location }} </p>
            <hr>
            <span class="fa fa-bed"></span> <span>3</span>
            <span class="fa fa-bath" style="margin-left:25px"></span> <span>2</span>
            <span class="fa fa-home" style="margin-left:25px"></span> <span>642 Sqm</span>
            <p>Posted 7 days ago</p>
            <hr>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <hr>
              <el-row>
                <el-col :xs="24" :sm="24" :md="5" :lg="4" class="">
                  <img src="static/person-icon-8.png" class="img-circle" alt="" style="width:75px">
                </el-col>
                <el-col :xs="24" :sm="24" :md="19" :lg="20" class="">
                  <p style="line-height:12px">Posted By</p>
                  <p style="font-size:22px;line-height:22px;margin-top:-10px" class="txt-pl-green">Miguel Martin Napiza</p>
                  <p style="line-height:12px;margin-top:-5px">Member since November 8, 2016</p>
                </el-col>
              </el-row>
            <hr>
            <el-row gutter="20">
              <el-col :xs="24" :span="12" style="margin-bottom:10px">
                <el-button type="default" style="width:100%">VIEW FULL LISTING</el-button>
              </el-col>
              <el-col :xs="24" :span="12" style="margin-bottom:10px">
                <el-button type="success" style="width:100%">CONTACT SELLER</el-button>
              </el-col>
              <el-col :span="24" style="padding:10px" class="text-center">
                <a href=""><span class="fa fa-bug"></span> Report this listing</a>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name:"property-card",
  props:['title','location' ,'img'],
  data(){
    return{
      dialogVisible:false
    }
  }
}
</script>

<style>
  .el-dialog__header{
    padding: 0px !important;
  }
  .el-dialog__body{
    padding: 0px !important;
  }
  .el-dialog__headerbtn{
    position: absolute !important;
    right: 0 !important;
    padding: 8px 10px !important;
    z-index: 999999!important;
  }
</style>

<style scoped>
  .img-circle{
    border-radius: 50%;
  }
  .card{
    padding: 0px;
    margin-bottom: 15px;
    border-radius: 0px;
    min-height: 380px;
    border: none;
    cursor: pointer;
  }

  /*.card:hover{
    -webkit-filter: brightness(40%);
    -moz-filter: brightness(40%);
  }*/

  .card:hover + .btn,
  .btn:hover{
    visibility: visible;
    background-color: #56BA50;
    border: 1px solid #56BA50;
  }

  .card img{
    width: 100%;
    object-fit: cover;
    height: 380px;
    min-height: 380px;
  }
  .dialog-container{
    background-color: #000000;
  }

  .card-info-container{
    position: relative;
    margin-top: -143px;
    margin-bottom: 20px;
    padding: 12px 5px;
    background: rgb(0, 0, 0); /* Fall-back for browsers that don't support rgba */
    background: rgba(0, 0, 0, .4);
  }

  .btn{
    visibility: hidden;
    position: relative;
    margin-top: -480px;
    left: 0%;
    top:0%;
    transform: translateY(0%); /* This would be overwritten */
    transform: translateX(0%); /* By this.. */
    border-radius: 0px;
    font-size: 14px;
    padding: 6px 30px;
    cursor: pointer;
  }

  .card-price,
  .card-title,
  .card-location,
  .card-other{
    position: relative;
    color: #ffffff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
    margin-bottom: 0px;
  }

  .card-price{
    font-size: 18px;
  }

  .card-title{
    font-size: 14px;
  }

  .card-other{
    font-size: 12px;
  }
  .card-location{
    font-size: 10px;
  }
  .carousel-container{
    padding: 50px 0px 20px 0px;
  }
  .info-container{
    background-color: #ffffff;
    color:#636363;
    padding: 10px 35px 30px 35px;
  }
  .info-container .price,
  .info-container .title,
  .info-container .location{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .info-container .price{
    color: #404040;
    text-shadow: 1px 0 #404040;
    letter-spacing: 1px;
    font-size: 40px;
    line-height: 40px;
    font-weight:900;
  }
  .info-container .title{
    position: relative;
    color: #737373;
    line-height: 28px;
    font-size: 28px;

  }
  .info-container .location{
    font-size: 18px;
    line-height: 18px;
  }
</style>
