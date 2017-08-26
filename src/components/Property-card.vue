<template>
  <div class="card">
    <img class="card-img-top" :src="img" alt="Card image caption">
    <div class="card-block">
      <p class="card-title text-left text-primary text-nowrap">{{ title }}</p>
      <p class="card-text text-left text-nowrap"><span class="pe-7s-map-marker"></span> {{ location }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name:"property-card",
  props:['title','location' ,'img']
}
</script>

<style scoped>
  .card{
    border-radius: 0px;
    border:0px;
    margin-bottom: 15px;
    cursor: pointer;
  }
  .card .card-img-top{
    border-radius: 0px;
    width: 100%;
    height: 250px;
    object-fit: cover;
  }

  @media (max-width: 1199px) {
    .card .card-img-top{
      height: 200px;
    }
  }

  @media (max-width: 575px) {
    .card .card-img-top{
      min-height: 250px;
    }
  }

  .card-text,
  .card-title{
    padding: 0;
    margin-bottom:0;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .card-text{
    font-size: 12px;
    color: #808080;
    margin-bottom: 5px;
  }
  .card-title{
    margin-top: 5px;
  }
  .card-block{
    padding:5px 0 10px 0;
  }
  .border{
    border:1px solid #999999
  }
  .btn{
    margin-top: 5px;
    padding: 3px 25px;
  }
</style>
