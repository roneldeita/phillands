<template>
  <div class="">
    <el-card :body-style="{ padding: '0px' }" class="card">
      <!-- <el-tooltip placement="top">
        <div slot="content">Add this property<br/>to your Wish List</div>
        <el-button type="text" style="position:absolute; right:12px; font-size:18px; color:#ffffff; outline-style:none">
          <span class="fa fa-heart-o"></span>
        </el-button>
      </el-tooltip> -->
      <el-tooltip placement="top" v-if="!wishlist.includes(property.property_no)">
        <div slot="content">Add this property<br/>to your Wish List</div>
        <el-button type="text" style="position:absolute;right:12px;font-size:18px;color:#ffffff;outline-style:none" @click="handleAddWishList">
          <span class="fa fa-heart-o"></span>
        </el-button>
      </el-tooltip>
      <el-tooltip placement="top" v-if="wishlist.includes(property.property_no)">
        <div slot="content">Remove this property<br/>from your Wish List</div>
        <el-button type="text" style="position:absolute;right:12px;font-size:18px;color:#ffffff;outline-style:none" @click="handleRemoveWishList">
          <span class="fa fa-heart"></span>
        </el-button>
      </el-tooltip>
      <img v-lazy="imgUrl+property.property_media[0].uploaded_filename" @click="dialogVisible = true">
    </el-card>
    <!-- <button type="button" class="btn btn-success btn-view" @click="dialogVisible = true">VIEW LISTING</button> -->
    <div class="card-info-container">
      <p class="card-offer-type">{{ offerType() }}</p>
      <p class="card-title text-left">{{ property.property_detail.title }}</p>
      <p class="card-price">₱ {{ formatNumber(property.price) }}
        <span v-if="property.offer_type === 2 && property.price_option === 1">/ mo.</span>
        <span v-if="property.offer_type === 2 && property.price_option === 4 ">/day</span>
      </p>
      <p v-if="property.offer_type === 4" class="card-location"><span class="pe-7s-map-marker"></span>{{ property.property_location.exact_address }}</p>
      <p v-else class="card-location"><span class="pe-7s-map-marker"></span> {{ property.property_location.formatted_address }}</p>
      <p class="card-other text-right">
        <span class="fa fa-bed"></span> <span><b>{{ property.property_detail.bedrooms }}</b></span>
        <span class="fa fa-bath" style="margin-left:20px"></span> <span><b>{{ property.property_detail.bathrooms }}</b></span>
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
            <p class="price">₱ {{ formatNumber(property.price) }}
              <span v-if="property.offer_type === 2 && property.price_option === 1">/ mo.</span>
              <span v-if="property.offer_type === 2 && property.price_option === 4 ">/day</span>
            </p>
            <p class="title">{{ property.property_detail.title }}</p>
            <p v-if="property.offer_type === 4"  class="location"><span class="fa fa-map-marker"></span> {{ property.property_location.exact_address }}</p>
            <p v-else  class="location"><span class="fa fa-map-marker"></span> {{ property.property_location.formatted_address }}</p>
            <span v-show="property.offer_type != 4">
              <hr>
              <span class="fa fa-bed"></span> <span>{{ property.property_detail.bedrooms }}</span>
              <span class="fa fa-bath" style="margin-left:25px"></span> <span>{{ property.property_detail.bathrooms }}</span>
              <span class="fa fa-home" style="margin-left:25px"></span> <span>{{ property.property_detail.lot_area }} Sqm</span>
            </span>
            <hr>
            <p style="white-space: pre-wrap" class="description">{{ property.property_detail.description }}</p>
            <hr>
              <el-row>
                <el-col :xs="24" :sm="24" :md="5" :lg="4" class="">
                  <img src="/static/person-icon-8.png" class="img-circle" alt="" style="width:75px">
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
import axios from 'axios';
import { getWishList } from '../../assets/utils/properties-api.js';
import { getIdToken, isLoggedIn } from '../../assets/utils/auth.js'
export default {
  name:"property-card",
  props:['property'],
  data(){
    return{
      imgUrl:'',
      dialogVisible:false,
      wishlist:[],
      wishlistId:''
    }
  },
  methods:{
    formatNumber: function(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  	},
    handleCard: function(propertyNo){
      this.$router.push({name:'view-property', params:{property_no:propertyNo}})
    },
    getWishlist:function(){
      getWishList().then((wishlist)=>{

        var arr = [];
        for(var wish in wishlist){
          arr.push(wishlist[wish].property.property_no)
          if(wishlist[wish].property.property_no === this.property.property_no){
            this.wishlistId = wishlist[wish].id
          }
        }
        this.wishlist = arr;
      });
    },
    handleAddWishList:function(){
      axios.defaults.headers.common['token'] = getIdToken();
      axios.post(process.env.API_URL+'/client/wishlist/add', { property_id : this.property.id}).
      then( response => {
        this.$message({
          message: 'This property was added to your wish list',
          type: 'success'
        });
        this.getWishlist();
      })
      .catch( error => {
        this.$store.dispatch('toggleLoginModal')
        this.$router.replace({name:'view-property', params:{ property_no:this.property.property_no}});
      });
    },
    handleRemoveWishList:function(){
      const self = this;
      axios.defaults.headers.common['token'] = getIdToken();
      return axios.post(process.env.API_URL+'/client/wishlist/remove', { wishlist_id : this.wishlistId}).
      then(function(response){
        self.$message({
          message: 'This property was removed from your wish list',
          type: 'success'
        });
        self.getWishlist();
      })
      .catch(function(error){
        self.$message({
          message: 'You need to sign in',
          type: 'info'
        });
      });
    },
    offerType:function(){
      var offer_type='';
      switch(this.property.offer_type){
        case 1:
          offer_type = 'FOR SALE'
          break;
        case 2:
          offer_type = 'FOR RENT'
          break;
        case 3:
          offer_type = 'PRE-SELLING'
          break;
        case 4:
          offer_type = 'FORECLOSURE'
          break;
        default:
          offer_type = 'PROPERTY'
      }
      return offer_type;
    }
  },
  created(){
    if(isLoggedIn()){
      this.getWishlist();
    }
    this.imgUrl = process.env.API_URL + '/images/';
  }
}
</script>

<style scoped>
  img[lazy=loading] {
    background-image: url('../../../static/cube.gif');
    background-repeat: no-repeat;
    background-position: center;
  }
  .img-circle{
    border-radius: 50%;
  }
  .card{
    padding: 0px;
    margin-bottom: 0px;
    border-radius: 0px;
    height: 220px;
    min-width: 200px;
    border: none;
    cursor: pointer;
  }

  /*.card:hover{
    -webkit-filter: brightness(40%);
    -moz-filter: brightness(40%);
  }*/

  /*.card:hover + .btn-view,
  .btn-view:hover{
    visibility: visible;
    background-color: #13ce66;
    border: 1px solid #13ce66;
  }*/

  .card img{
    width: 100%;
    object-fit: cover;
    height: 220px;
    min-height: 220px;
  }
  .dialog-container{
    background-color: #000000;
  }

  .card-info-container{
    position: relative;
    margin-top: 5px;
    margin-bottom: 30px;
    padding: 0;
    /* background: rgb(0, 0, 0); */ /* Fall-back for browsers that don't support rgba */
    /* background: rgba(0, 0, 0, .4); */
  }

  /*.btn-view{
    visibility: hidden;
    position: relative;
    margin-top: -480px;
    left: 0%;
    top:0%;
    transform: translateY(0%); // This would be overwritten
    transform: translateX(0%); // By this..
    border-radius: 0px;
    font-size: 14px;
    padding: 8px 30px 6px 30px;
    cursor: pointer;
  }*/

  .view-property-link{
    margin-top:10px;
    font-size: 16px;
    text-decoration:underline;
    cursor:pointer;
  }
  .card-price,
  .card-title,
  .card-location,
  .card-other,
  .card-offer-type{
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
    margin-bottom: 0px;
  }
  .card-offer-type{
    color: #0275d8;
    font-size: 12px;
  }
  .card-price{
    font-size: 14px;
  }
  .card-title{
    font-size: 20px;
    font-weight: bold;
  }
  .card-other{
    font-size: 12px;
  }
  .card-location{
    font-size: 12px;
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
  .info-container .price span{
    font-size: 28px;
    color: #999999;
  }
  .info-container .title{
    position: relative;
    color: #737373;
    line-height: 32px;
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
