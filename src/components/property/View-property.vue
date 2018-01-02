<template>
  <div>
    <el-row class="view-container text-left" v-if="property">
      <el-col :span="24" class="">
        <img v-lazy="imgUrl+property.property_media[0].uploaded_filename" alt="" class="primary-img">
        <el-button class="view-photos" @click="dialogVisible = true">View Photos</el-button>
      </el-col>
      <el-col :span="24">
        <el-dialog title="" :visible.sync="dialogVisible" size="large" class="text-center">
          <el-carousel :autoplay="false" arrow="always" height="500px" style="background:black">
            <el-carousel-item v-for="img in property.property_media" :key="img.id">
              <img v-lazy="imgUrl+img.uploaded_filename" style="height:100%">
            </el-carousel-item>
          </el-carousel>
        </el-dialog>
      </el-col>
      <el-col :offset="3" :xs="24" :span="18" class="body-container">
        <el-row>
          <el-col :xs="24" :span="14" style="padding:20px 30px 0 0" class="info-container">
            <!-- <p>  {{ wishlist }}</p> -->
            <p class="title">{{ property.property_detail.title }}</p>
            <p class="location" v-if="property.offer_type === 4">{{ property.property_location.exact_address }}</p>
            <p class="location" v-else>{{ property.property_location.formatted_address }}</p>
            <p style="white-space: pre-wrap" class="description">{{ property.property_detail.description }}</p>
            <h4>Details</h4>
            <el-row class="">
              <el-col :span="12">
                <ul class="detail_list">
                  <li>Offer type: <b>{{ offerType() }}</b></li>
                  <li>Property type: <b>{{ propertyType() }}</b></li>
                  <li>Total Price: ₱
                    <b>{{ formatNumber(property.price) }}</b>
                    <span v-show="property.offer_type === 2 &&  property.price_option === 1">/mo.</span>
                    <span v-show="property.offer_type === 2 &&  property.price_option === 4">/day</span>
                  </li>
                  <li v-show="property.offer_type != 4">Bedrooms: <b>{{ property.property_detail.bedrooms != 0 ? property.property_detail.bedrooms : 'Studio Type' }}</b></li>
                  <li v-show="property.offer_type != 4">Bathrooms: <b>{{ property.property_detail.bathrooms != 0 ? property.property_detail.bathrooms : 'None' }}</b></li>
                </ul>
              </el-col>
              <el-col :span="12">
                <ul class="detail_list">
                  <li>Property id: <b>{{ property.property_no }}</b></li>
                  <li>Parking: <b>{{ property.property_detail.parking != 0? property.property_detail.parking :'None'  }}</b></li>
                  <li>Floor Area: <b>{{ property.property_detail.floor_area }} sqm</b></li>
                  <li>Lot Area: <b>{{ property.property_detail.lot_area }} sqm</b></li>
                  <li v-show="property.offer_type != 4">Balcony: <b>{{ property.property_detail.balcony ? 'Yes' : 'No' }}</b></li>
                </ul>
              </el-col>
            </el-row>
            <el-row v-if="property.property_detail.amenities">
              <h4>Amenities</h4>
              <el-col :span="12" v-for="amenity in property.property_detail.amenities.split(',')" :key="0">
                <ul class="amenity_list">
                  <li><span class="fa fa-check txt-pl-green" style="font-size:10px"></span> {{ amenity }}</li>
                </ul>
              </el-col>
            </el-row>
            <h4>Location</h4>
            <p v-if="property.offer_type === 4">{{ property.property_location.exact_address }}</p>
            <p v-else>{{ property.property_location.formatted_address }}</p>
            <gmap-map style="width: 100%; height: 300px;z-index:1" :zoom="zoom" :options="{styles:style}" :center="marker">
              <gmap-marker
                :draggable="false"
                :clickable="false"
                :icon="'/static/Philland_Place_Icon-10x10.png'"
                :position="marker"
                ></gmap-marker>
              <gmap-circle
                :center="marker"
                :radius="20"
                :draggable="false"
                :clickable="false"
                :options="{fillColor:'#56BA50',strokeWeight:'0', fillOpacity: '0.40'}"
                style="border:1px">
              </gmap-circle>
            </gmap-map>
            <div class="extra-div" style="height:500px">
            </div>
          </el-col>
          <el-col :xs="24" :span="10" class="form-container" style="height:480px;margin-top:-52px;">
            <div style="background-color:#13ce66; color:#ffffff; padding:10px 20px">
              	<span style="font-size:22px">₱ <b>{{ formatNumber(property.price) }}</b></span>
                <span v-show="property.offer_type === 2 && property.price_option === 1 ">/mo.</span>
                <span v-show="property.offer_type === 2 && property.price_option === 4 ">/day</span>
                <div class="pull-right">
                  <el-tooltip placement="top">
                    <div slot="content">Share this property<br/>on Facebook</div>
                    <el-button type="text" style="font-size:18px; color:#ffffff; outline-style:none">
                      <span class="fa fa-facebook"></span>
                    </el-button>
                  </el-tooltip>
                  <el-tooltip placement="top" v-if="!wishlist.includes(property.property_no)">
                    <div slot="content">Add this property<br/>to your Wish List</div>
                    <el-button type="text" style="font-size:18px; color:#ffffff; outline-style:none" @click="handleAddWishList">
                      <span class="fa fa-heart-o"></span>
                    </el-button>
                  </el-tooltip>
                  <el-tooltip placement="top" v-if="wishlist.includes(property.property_no)">
                    <div slot="content">Remove this property<br/>from your Wish List</div>
                    <el-button type="text" style="font-size:18px; color:#ffffff; outline-style:none" @click="handleRemoveWishList">
                      <span class="fa fa-heart"></span>
                    </el-button>
                  </el-tooltip>
                </div>
            </div>
            <div style="background:#F0F0F0; padding:5px 20px 10px 20px"  v-loading="loadingContact">
              <p class="form-title text-center">Ask about the property</p>
              <el-form :model="inquireForm" :rules="inquireRules" ref="inquireForm">
                <el-form-item label="" prop="message">
                  <el-input type="textarea" v-model="inquireForm.message" placeholder="Message Inquiry" :rows="3"></el-input>
                </el-form-item>
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="" prop="first_name">
                      <el-input v-model="inquireForm.first_name" placeholder="First Name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="" prop="last_name">
                      <el-input v-model="inquireForm.last_name" placeholder="Last Name"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="" prop="contact">
                  <el-input type="number" v-model="inquireForm.contact" placeholder="Contact Number"></el-input>
                </el-form-item>
                <el-form-item label="" prop="email">
                  <el-input v-model="inquireForm.email" placeholder="Email" :rows="5"></el-input>
                </el-form-item>
                <p>I would Like to:</p>
                <el-radio-group v-model="inquireForm.inquery">
                  <el-radio :label="1">Know more information</el-radio><br>
                  <el-radio :label="2">Schedule an appointment</el-radio>
                </el-radio-group>
                <el-form-item>
                  <el-button type="success" class="btn-pl-green" style="width:100%" @click="handleInquiry('inquireForm')">Contact Seller</el-button>
                </el-form-item>
              </el-form>
              <a href="#" style="display:block; margin-top:-10px" class="text-center"><span class="fa fa-flag-o"></span> Report this listing</a>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';
//json
import MapStyle from '../../../static/json/map-detailed.json'
//api
import { getProperty, addtoWishlist, getWishList } from '../../assets/utils/properties-api.js'
import { isLoggedIn } from '../../assets/utils/auth.js'

export default {
  name:'view-property',
  props:['search'],
  computed: {
    token:  function () {
      return this.$store.getters.phillandsIdToken
    }
  },
  data(){
    return{
      imgUrl:'',
      property:'',
      zoom:18,
      marker: {lat: 14.5677961, lng: 121.0206435},
      style: [],
      loadingContact:false,
      inquireForm:{
        inquery:1,
        message:'I am interested about this property...',
        first_name:'',
        last_name:'',
        contact:'',
        email:''
      },
      inquireRules:{
        message:[
          { required: true, message: 'Required', trigger: 'blur' }
        ],
        first_name:[
          { required: true, message: 'First Name is required', trigger: 'blur' }
        ],
        last_name:[
          { required: true, message: 'Last Name is required', trigger: 'blur' }
        ],
        contact:[
          { required: true, message: 'Contact Number is required', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please input email', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      wishlist:[],
      wishlistId:''
    }

  },
  methods:{
    getProperty:function(property_no){
      getProperty(property_no).then((property) =>{
          this.property = property;
          this.setLatLng();
      });
    },
    handleInquiry:function(formName){
      const self = this;

      this.$refs[formName].validate((valid) => {
        if(valid){
          self.loadingContact = true;
          var inquireData = this.inquireForm;
          inquireData['property_id'] = self.property.id;
          inquireData['to_user_id'] = self.property.owner_id;

          axios.post(process.env.API_URL+'/inquiry/send', inquireData)
          .then(function(response){
            if(response.data.message === 'Success'){
              self.$alert('Your inquiry has been successfully sent to the property owner.', 'Inquiry Sent', {
                confirmButtonText: 'OK',
                type:'success'
              });
              self.inquireForm = {
                inquery:1,
                message:'I am interested about this property...',
                first_name:'',
                last_name:'',
                contact:'',
                email:''
              };
              self.loadingContact = false;
            }
          }).catch(function(error){
            console.log(error);
            self.loadingContact = false;
          });
        }else{
          self.loadingContact = false;
          //console.log(valid)
        }
      });
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
    setLatLng:function(){
      this.marker = {
        lat: Number(this.property.property_location.lat),
        lng: Number(this.property.property_location.lng),
      }
    },
    handleAddWishList:function(){
      axios.defaults.headers.common['token'] = this.token;
      return axios.post(process.env.API_URL+'/client/wishlist/add', { property_id : this.property.id}).
      then( response => {
        this.$message({
          message: 'This property was added to your wish list',
          type: 'success'
        });
        this.getWishlist();
      })
      .catch( error => {
        this.$emit('login');
        // self.$message({
        //   message: 'You need to sign in',
        //   type: 'info'
        // });
      });
    },
    handleRemoveWishList:function(){
      axios.defaults.headers.common['token'] = this.token;
      return axios.post(process.env.API_URL+'/client/wishlist/remove', { wishlist_id : this.wishlistId}).
      then(response => {
        this.$message({
          message: 'This property was removed from your wish list',
          type: 'success'
        });
        this.getWishlist();
      })
      .catch( error => {
        this.$message({
          message: 'There was an error removing this property from your wishlist, Please try again.',
          type: 'warning'
        });
        setTimeout(() =>{
          location.reload();
        },2500);
      });
    },
    offerType:function(){
      var offer_type='';
      switch(this.property.offer_type){
        case 1:
          offer_type = 'For Sale'
          break;
        case 2:
          offer_type = 'For Rent'
          break;
        case 3:
          offer_type = 'Pre-Selling'
          break;
        case 4:
          offer_type = 'Foreclosure'
          break;
        default:
          offer_type = 'Property'
      }
      return offer_type;
    },
    propertyType:function(){
      var property_type='';
      switch(this.property.property_type){
        case 1:
          property_type = 'Condominium'
          break;
        case 2:
          property_type = 'House And Lot'
          break;
        case 3:
          property_type = 'Townhouse'
          break;
        case 4:
          property_type = 'Commercial Lot'
          break;
        case 5:
          property_type = 'Vacant Lot'
          break;
        default:
          property_type = 'Property'
      }
      return property_type;
    },
    formatNumber: function(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    }
  },
  mounted(){
    this.getProperty(this.$route.params.property_no);
    this.imgUrl = process.env.API_URL + '/images/';
    if(isLoggedIn()){
      this.getWishlist();
    }
  },
  watch:{
    'search':function(value){
      //console.log(value);
      //this.$router.push({name:'sale', params:{offer_type:2, property_type:value.property_type, location:value.location }})
      //this.getSales(value.property_type, value.location)
    }
  },
  components:{ }
}
</script>

<style scoped>
  img[lazy=loading] {
    background-image: url('../../../static/cube.gif');
    background-repeat: no-repeat;
    background-position: center;
  }
  .form-title{
    font-size: 26px;
    margin: 5px 0 10px 0;
  }
  h4{
    margin: 35px 0 20px 0;
    font-weight:300;
  }
  .view-container{
    margin-top: -85px;
  }
  .primary-img{
    width: 100%;
    height: 500px;
    object-fit: cover;
  }
  .view-photos{
      padding-left: 30px;
      padding-right: 30px;
      position: absolute;
      top: 440px;
      left: 20px;
      z-index: 5;
  }
  .title{
    letter-spacing: 1px;
    font-size: 32px;
    line-height: 40px;
    font-weight:bolder;
  }
  .location{
    margin: -15px 0 25px 0;
  }
  .detail_list{
    list-style: none;
    margin-left: -40px;
  }
  .amenity_list{
    list-style: none;
    margin-left: -40px;
    margin-bottom: 2px;
  }
  .detail_list li{
    margin-bottom: 10px
  }
  .form-container{
    position: -webkit-sticky;
    position: sticky;
    top:65px;
  }

  @media (max-width : 769px){
    .body-container{
      margin: 0;
    }
    .info-container,
    .form-container{
      padding: 0 10px !important;
      margin: 0 !important;
    }
    .extra-div{
      height: 10px !important;
    }
  }
</style>
