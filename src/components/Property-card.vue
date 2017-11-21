<template>
  <div class="">
    <el-card :body-style="{ padding: '0px' }" class="card">
      <img v-lazy="imgUrl+property.property_media[0].uploaded_filename" @click="dialogVisible = true">
    </el-card>
    <button type="button" class="btn btn-success btn-view" @click="dialogVisible = true">VIEW LISTING</button>
    <div class="card-info-container">
      <p class="card-price">₱ {{ formatNumber(property.price) }} <span v-if="property.offer_type === 2">/ mo.</span></p>
      <p class="card-title text-left">{{ property.property_detail.title }}</p>
      <p class="card-location"><span class="pe-7s-map-marker"></span>{{ property.property_location.formatted_address }}</p>
      <p class="card-other text-right">
        <span class="fa fa-bed"></span> <span>{{ property.property_detail.bedrooms }}</span>
        <span class="fa fa-bath" style="margin-left:20px"></span> <span>{{ property.property_detail.bathrooms }}</span>
      </p>
    </div>
    <el-dialog title=""  :visible.sync="dialogVisible" size="large">
      <el-row class="dialog-container">
        <el-col :xs="24 ":md="12">
          <div class="carousel-container">
            <el-carousel indicator-position="outside" :autoplay="false">
              <el-carousel-item v-for="img in property.property_media" :key="img.id">
                  <img v-lazy="imgUrl+img.uploaded_filename" style="height:100%">
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
        <el-col :sm="24" :md="12">
          <div class="info-container text-left">
          	<br><br>
            <p class="view-property-link pull-right txt-pl-green" @click="handleCard(property.property_no)">View full details</p>
            <p class="price">₱ {{ formatNumber(property.price) }} <span v-if="property.offer_type === 2">/ mo.</span></p>
            <p class="title">{{ property.property_detail.title }}</p>
            <p class="location"><span class="fa fa-map-marker"></span> {{ property.property_location.formatted_address }}</p>
            <hr>
            <span class="fa fa-bed"></span> <span>{{ property.property_detail.bedrooms }}</span>
            <span class="fa fa-bath" style="margin-left:25px"></span> <span>{{ property.property_detail.bathrooms }}</span>
            <span class="fa fa-home" style="margin-left:25px"></span> <span>{{ property.property_detail.lot_area }} Sqm</span>
            <hr>
            <p style="white-space: pre-wrap" class="description">{{ property.property_detail.description }}</p>
            <hr>
              <el-row>
                <el-col :xs="24" :sm="24" :md="5" :lg="4" class="">
                  <img src="static/person-icon-8.png" class="img-circle" alt="" style="width:75px">
                </el-col>
                <el-col :xs="24" :sm="24" :md="19" :lg="20" class="">
                  <p style="line-height:12px">Posted By</p>
                  <p style="font-size:22px;line-height:22px;margin-top:-10px" class="txt-pl-green">{{ property.property_contact.full_name }}</p>
                  <p style="line-height:12px;margin-top:-5px">Posted {{ property.updatedAt | moment("from") }}</p>
                </el-col>
              </el-row>
            <hr>
            <el-row :gutter="20">
              <el-col :xs="24" :span="12" style="margin-bottom:10px">
                <el-button type="default" style="width:100%" @click="handleCard(property.property_no)">VIEW FULL LISTING</el-button>
              </el-col>
              <el-col :xs="24" :span="12" style="margin-bottom:10px">
                <el-button type="success" class="btn-pl-green" style="width:100%" @click="handleCard(property.property_no)">CONTACT SELLER</el-button>
              </el-col>
              <el-col :span="24" style="padding:10px" class="text-center">
                <a href=""><span class="fa fa-flag-o"></span> Report this listing</a>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { baseUrl } from '../assets/utils/properties-api.js';
export default {
  name:"property-card",
  props:['property'],
  data(){
    return{
      imgUrl:'',
      dialogVisible:false
    }
  },
  methods:{
    formatNumber: function(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  	},
    handleCard: function(propertyNo){
      this.$router.push({name:'view-property', params:{property_no:propertyNo}})
    }
  },
  created(){
    this.imgUrl = baseUrl() + '/images/';
  }
}
</script>

<style scoped>
  img[lazy=loading] {
    background-image: url('../../static/cube.gif');
    background-repeat: no-repeat;
    background-position: center;
  }
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

  .card:hover + .btn-view,
  .btn-view:hover{
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

  .btn-view{
    visibility: hidden;
    position: relative;
    margin-top: -480px;
    left: 0%;
    top:0%;
    transform: translateY(0%); /* This would be overwritten */
    transform: translateX(0%); /* By this.. */
    border-radius: 0px;
    font-size: 14px;
    padding: 8px 30px 6px 30px;
    cursor: pointer;
  }

  .view-property-link{
    margin-top:10px;
    font-size: 16px;
    text-decoration:underline;
    cursor:pointer;
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
  }
  .description{
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 10;
    -webkit-box-orient: vertical;
  }
</style>
