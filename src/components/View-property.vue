<template>
  <el-row class="view-container text-left" v-if="property">
    <el-col :span="24" class="">
      <img v-lazy="imgUrl+property.property_media[0].uploaded_filename" alt="" class="primary-img">
      <el-button class="view-photos" @click="dialogVisible = true">View Photos</el-button>
    </el-col>
    <el-col :span="24">
      <el-dialog title="" :visible.sync="dialogVisible" size="large" class="text-center">
        <el-carousel :autoplay="false" arrow="always"  height="500px" style="background:black">
          <el-carousel-item v-for="img in property.property_media" :key="img.id">
            <img v-lazy="imgUrl+img.uploaded_filename" style="height:100%">
          </el-carousel-item>
        </el-carousel>
      </el-dialog>
    </el-col>
    <el-col :offset="3" :xs="24" :span="18" class="body-container">
      <el-row>
        <el-col :xs="24" :span="14" style="padding:20px 30px 0 0" class="info-container">
          <p class="title">{{ property.property_detail.title }}</p>
          <p class="location" >{{ property.property_location.formatted_address }}</p>
          <p class="description">{{ property.property_detail.description }}</p>
          <h4>Details</h4>
          <el-row class="">
            <el-col :span="12">
              <ul class="detail_list">
                <li>Offer type: <b>{{ property.offer_type }}</b></li>
                <li>Property type: <b>{{ property.property_type }}</b></li>
                <li>Total Price: <b>{{ property.price }}</b><span v-if="property.offer_type === 2">/mo.</span></li>
                <li>Bedrooms: <b>{{ property.property_detail.bedrooms }}</b></li>
                <li>Bathrooms: <b>{{ property.property_detail.bathrooms }}</b></li>
              </ul>
            </el-col>
            <el-col :span="12">
              <ul class="detail_list">
                <li>Property id: <b>{{ property.property_no }}</b></li>
                <li>Parking: <b>{{ property.property_detail.parking }}</b></li>
                <li>Floor Area: <b>{{ property.property_detail.floor_area }} sqm</b></li>
                <li>Lot Area: <b>{{ property.property_detail.lot_area }} sqm</b></li>
                <li>Balcony: <b>{{ property.property_detail.balcony ? 'Yes' : 'No' }}</b></li>
              </ul>
            </el-col>
          </el-row>
          <h4>Amenities</h4>
          <el-row>
            <el-col :span="12" v-for="amenity in property.property_detail.amenities.split(',')" :key="0">
              <ul class="amenity_list">
                <li><span class="fa fa-check txt-pl-green" style="font-size:10px"></span> {{ amenity }}</li>
              </ul>
            </el-col>
          </el-row>
          <h4>Location</h4>
          <p>{{ property.property_location.formatted_address }}</p>
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
        <el-col :xs="24" :span="10" class="form-container" style="height:480px;">
          <div style="background:#F0F0F0; padding:5px 20px 5px 20px; margin-bottom:15px">
            <p class="form-title text-center">Ask about the property</p>
            <el-form :model="askSeller">
              <el-form-item label="" prop="desc">
                <el-input type="textarea" placeholder="Message Inquiry" :rows="3"></el-input>
              </el-form-item>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="" prop="desc">
                    <el-input placeholder="First Name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="" prop="desc">
                    <el-input placeholder="First Name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="" prop="desc">
                <el-input placeholder="Contact Number" :rows="5"></el-input>
              </el-form-item>
              <el-form-item label="" prop="desc">
                <el-input placeholder="Email" :rows="5"></el-input>
              </el-form-item>
              <p>I would Like to:</p>
              <el-radio-group v-model="askSeller.inquery">
                <el-radio :label="1">Know more information</el-radio><br>
                <el-radio :label="2">Schedule an appointment</el-radio>
              </el-radio-group>
              <el-form-item>
                <el-button type="success" class="btn-pl-green" style="width:100%">Contact Seller</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div style="background:#F0F0F0; padding:25px">
            <el-button style="width:100%"><span class="fa fa-heart-o"></span> Save to Wish List</el-button>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
//json
import MapStyle from '../../static/json/map-detailed.json'
//api
import { baseUrl, getProperty } from '../assets/utils/properties-api.js'

export default {
  name:'view-property',
  props:['search'],
  data(){
    return{
      imgUrl:'',
      property:'',
      zoom:18,
      marker: {lat: 14.5677961, lng: 121.0206435},
      style: [],
      askSeller:{
        inquery:1
      },
      dialogVisible: false
    }

  },
  methods:{
    getProperty:function(property_no){
      getProperty(property_no).then((property) =>{
          this.property = property;
          this.setLatLng();
      });
    },
    setLatLng:function(){
      this.marker = {
        lat: Number(this.property.property_location.lat),
        lng: Number(this.property.property_location.lng),
      }
    }
  },
  mounted(){
    this.getProperty(this.$route.params.property_no);
    this.imgUrl = baseUrl() + '/images/';
    //this.style = MapStyle;
  },
  watch:{
    'search':function(value){
      //console.log(value);
      //this.$router.push({name:'sale', params:{offer_type:2, property_type:value.property_type, location:value.location }})
      //this.getSales(value.property_type, value.location)
    }
  }
}
</script>

<style scoped>
  img[lazy=loading] {
    background-image: url('../../static/cube.gif');
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
    margin-top: -85px
  }
  .primary-img{
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  .view-photos{
      padding-left: 30px;
      padding-right: 30px;
      position: absolute;
      top: 340px;
      left: 20px;
      z-index: 5;
  }

  .price,
  .title,
  .location{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
  .el-form-item{
    margin-bottom: 12px
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
