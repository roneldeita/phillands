<template>
  <div class="">
    <el-card :body-style="{ padding: '0px' }" class="card">
      <img :src="img">
    </el-card>
    <el-button type="success" class="btn btn-pl-green">VIEW LISTING</el-button>
    <div class="card-info-container">
      <p class="card-price">Php 2,000,000.00</p>
      <p class="card-title text-left">{{ title }}</p>
      <p class="card-location"><span class="pe-7s-map-marker"></span> {{ location }}</p>
      <p class="card-other text-right">
        <span class="fa fa-bed"></span> <span>3</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <span class="fa fa-bath"></span> <span>2</span>
      </p>
    </div>
  </div>
  <!-- <div class="card">
    <img class="card-img-top" :src="img" alt="Card image caption">
    <div class="card-block">

      <p class="card-text text-left text-nowrap"><span class="pe-7s-map-marker"></span> {{ location }}</p>
    </div>
  </div> -->
</template>

<script>
export default {
  name:"property-card",
  props:['title','location' ,'img']
}
</script>

<style scoped>
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

  /*@media (min-width: 1199px) {
    .card img{
      height: 200px;
    }
  }

  @media (max-width: 575px) {
    .card img{
      min-height: 250px;
    }
  }*/
</style>
