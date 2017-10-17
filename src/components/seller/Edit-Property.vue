<template>
  <el-row class="text-left" style="margin:-20px 0 100px 0">
    <div class="main-nav fixed-top"></div>
    <el-col :sm="24" :offset="2" :md="15" class="head-container">
      <h4>Edit Mode: <span style="color:#A9A9A9; line-height:20px">You can change the details of your listing below.</span></h4><br>
    </el-col>
    <el-col :xs="24" :md="5" class="text-right head-container">
      <el-button type="success" class="btn btn-pl-green" style="width:150px" size="large" @click="handleCard(property_no)">Preview Listing</el-button>
    </el-col>
    <el-col :sm="24" :offset="2" :md="20" class="head-container">
      <img v-if="mediaForm.media[0]" v-lazy="imgUrl+mediaForm.media[0].uploaded_filename" alt="" class="primary-img">
    </el-col>
    <el-col :offset="2" :sm="20" :md="20" class="head-container">
      <el-card class="box-card">
          <div class="text-right">
            <el-button v-if="!basicEdit" @click="basicEdit = true">Edit</el-button>
            <el-button v-if="basicEdit" type="success" class="btn-pl-green"  @click="saveBasic">Save</el-button>
            <el-button v-if="basicEdit" @click="basicEdit = false; cancelBasicEdit(property_no)">Cancel</el-button>
          </div>
          <div v-if="!basicEdit">
            <p class="label">Title</p>
            <h4>{{ basicForm.title }}</h4>
            <p class="label">Description</p>
            <p style="white-space: pre-wrap; max-height:130px; overflow-y:scroll">{{ basicForm.description }}</p>
          </div>
          <el-form v-if="basicEdit" :model="basicForm" :rules="basicRules" ref="basicForm" label-width="0" class="form">
            <el-form-item label="Title" prop="title">
              <el-input v-model="basicForm.title" size="large"></el-input>
            </el-form-item>
            <el-form-item label="Description" prop="description">
              <el-input type="textarea" :rows="5" v-model="basicForm.description"></el-input>
            </el-form-item>
          </el-form>
      </el-card>

      <el-card class="box-card">
        <div class="text-right">
          <h4 class="pull-left txt-pl-green">Key Information</h4>
          <el-button v-if="!keyInfoEdit" @click="keyInfoEdit = true">Edit</el-button>
          <el-button v-if="keyInfoEdit" type="success" class="btn-pl-green"  @click="saveKeyInfo" disabled>Save</el-button>
          <el-button v-if="keyInfoEdit" @click="keyInfoEdit = false; cancelkeyInfoEdit()">Cancel</el-button>
        </div>
        <el-row v-if="!keyInfoEdit">
          <el-col :sm="12" :md="8" :lg="6">
            <p class="label">Offer Type</p>
            <p>{{ keyInfoForm.offer_type === '1' ? 'For Sale' : 'For rent' }}</p>
          </el-col>
          <el-col :sm="12" :md="8" :lg="18">
            <p class="label">Property type</p>
            <p>{{ propertyType(keyInfoForm.property_type) }}</p>
          </el-col>
          <el-col :sm="12" :md="8" :lg="24">
            <p class="label">Price</p>
            <p>&#8369; {{ formatNumber(keyInfoForm.price) }}</p>
          </el-col>
        </el-row>
        <el-form v-if="keyInfoEdit" :model="keyInfoForm" :rules="keyInfoRules" ref="keyInfoForm" label-width="0" class="form">
          <el-col :sm="12" :md="8" :lg="6">
            <el-form-item style="display:inline-block" label="" prop="offer_type">
              <p class="label"><span class="required">*</span>Offer Type</p>
              <el-select v-model="keyInfoForm.offer_type" placeholder="Select">
                <el-option label="For Sale" value="1"></el-option>
                <el-option label="For Rent" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="18">
            <el-form-item style="display:inline-block" label="" prop="property_type">
              <p class="label"><span class="required">*</span>Property type</p>
              <el-select v-model="keyInfoForm.property_type" placeholder="Select">
                <el-option label="Condominium" value="1"></el-option>
                <el-option label="House and Lot" value="2"></el-option>
                <el-option label="Townhouse" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" :lg="24">
            <el-form-item style="display:inline-block;" prop="price" class="">
              <p class="label"><span class="required">*</span>{{ keyInfoForm.offer_type ==="2" ? 'Rental Fee' : 'Selling Price'}}</p>
              <el-input type="number" class="amount" placeholder="Enter the amount" v-model="keyInfoForm.price">
                <template slot="prepend">₱</template>
                <template v-if="keyInfoForm.offer_type === '2'" slot="append">Monthly</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-card>

      <el-card class="box-card">
        <div class="text-right">
          <h4 class="pull-left txt-pl-green">Unit Details</h4>
          <el-button v-if="!unitDetailEdit" @click="unitDetailEdit = true">Edit</el-button>
          <el-button v-if="unitDetailEdit" type="success" class="btn-pl-green"  @click="saveUnitDetail">Save</el-button>
          <el-button v-if="unitDetailEdit" @click="unitDetailEdit = false; cancelUnitDetailEdit()">Cancel</el-button>
        </div>
        <el-row v-if="!unitDetailEdit" class="">
          <el-col :xs="12" :sm="8" :md="6" class="">
            <p class="label">Bedrooms</p>
            <p><span class="fa fa-bed"></span> {{ unitDetailForm.bedrooms }}</p>
          </el-col>
          <el-col :xs="12" :sm="8" :md="18" class="">
            <p class="label">Bathrooms</p>
            <p><span class="fa fa-bath"></span> {{ unitDetailForm.bathrooms }}</p>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" class="">
            <p class="label">Parking</p>
            <p><span class="fa fa-car"></span> {{ unitDetailForm.parking }}</p>
          </el-col>
          <el-col :xs="12" :sm="8" :md="18" class="">
            <p class="label">Floor Area</p>
            <p>{{ unitDetailForm.floor_area }} sqm</p>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" class="">
            <p class="label">Lot Area</p>
            <p>{{ unitDetailForm.lot_area }} sqm</p>
          </el-col>
        </el-row>
        <el-form v-if="unitDetailEdit" :model="unitDetailForm" :rules="unitDetailRules" ref="unitDetailForm" label-width="0" class="form">
          <el-row>
            <el-col :sm="12" :md="6" :lg="6" class="">
              <el-form-item label="" prop="bedrooms">
                <p class="label"><span class="required">*</span>Bedrooms</p>
                <el-input-number v-model="unitDetailForm.bedrooms" :min="0" :max="10"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :md="6" :lg="18" class="">
              <el-form-item label="" prop="bathrooms">
                <p class="label"><span class="required">*</span>Bathrooms</p>
                <el-input-number v-model="unitDetailForm.bathrooms" :min="0" :max="10"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :md="6" :lg="6" class="">
              <el-form-item label="" prop="parking">
                <p class="label"><span class="required">*</span>Parking</p>
                <el-input-number v-model="unitDetailForm.parking" :min="0" :max="10"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :md="6" :lg="18">
                <el-form-item prop="floor_area">
                  <p class="label"><span class="required">*</span>Floor Area</p>
                  <el-input type="number" class="amount" v-model="unitDetailForm.floor_area" style="max-width:150px">
                    <template slot="append">sqm</template>
                  </el-input>
                </el-form-item>
            </el-col>
            <el-col :sm="12" :md="6" :lg="6">
                <el-form-item prop="lot_area" label="">
                  <p class="label"><span class="required">*</span>Lot Area</p>
                  <el-input type="number" class="amount" v-model="unitDetailForm.lot_area" style="max-width:150px">
                    <template slot="append">sqm</template>
                  </el-input>
                </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>

      <el-card class="box-card">
        <div class="text-right">
          <h4 class="pull-left txt-pl-green">Amenities</h4>
          <el-button v-if="!amenitiesEdit" @click="amenitiesEdit = true">Edit</el-button>
          <el-button v-if="amenitiesEdit" type="success" class="btn-pl-green"  @click="saveAmenities">Save</el-button>
          <el-button v-if="amenitiesEdit" @click="amenitiesEdit = false; cancelAmenitiesEdit()">Cancel</el-button>
        </div>
        <el-row v-if="!amenitiesEdit" class="">
          <el-col :sm="12" :md="10">
            <el-button v-for="amenity in amenitiesForm.amenities" :key="0" size="small" style="width:auto"><span class="fa fa-check txt-pl-green"></span> {{ amenity }}</el-button>
          </el-col>
        </el-row>
        <el-form v-if="amenitiesEdit" :model="amenitiesForm" label-width="0" class="form">
          <el-row>
            <el-col :sm="18" :md="10">
              <p>Choose the amenities from the options or manually type if not available.</p>
              <el-select
                v-model="amenitiesForm.amenities"
                size="large"
                multiple
                filterable
                allow-create
                placeholder=""
                style="width:100%;">
                <el-option
                  v-for="amenity in amenitiesOptions"
                  :key="0"
                  :label="amenity.label"
                  :value="amenity.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-form>
      </el-card>

      <el-card class="box-card">
        <div class="text-right">
          <h4 class="pull-left txt-pl-green">Location</h4>
          <el-button v-if="!locationEdit" @click="locationEdit = true">Edit</el-button>
          <el-button v-if="locationEdit" type="success" class="btn-pl-green"  @click="saveTitle = false" disabled>Save</el-button>
          <el-button v-if="locationEdit" @click="locationEdit = false; cancelLocationEdit()">Cancel</el-button>
        </div>
        <el-row>
          <el-col v-if="!locationEdit" :sm="18" :md="12">
            <p class="label">Address</p>
            <p>{{ locationForm.formatted_address }}</p>
            <gmap-map ref="gmap" style="width: 100%; height: 300px;" :zoom="18" :center="{lat: locationForm.lat, lng: locationForm.lng}" :drag="false" @center_changed="">
              <gmap-marker
                :draggable="false"
                :clickable="false"
                :icon="'/static/Philland_Place_Icon-10x10.png'"
                :position="{lat: locationForm.lat, lng: locationForm.lng}"
                ></gmap-marker>
              <gmap-circle
                :center="{lat: locationForm.lat, lng: locationForm.lng}"
                :radius="20"
                :draggable="false"
                :clickable="false"
                :options="{fillColor:'#56BA50',strokeWeight:'0', fillOpacity: '0.40'}"
                style="border:1px">
              </gmap-circle>
            </gmap-map>
          </el-col>
          <el-col v-if="locationEdit" :sm="18" :md="12">
            <p class="label">Address</p>
            <gmap-autocomplete class="form-control" v-model="locationForm.formatted_address" @place_changed="setLocation"></gmap-autocomplete><br>
            <gmap-map style="width: 100%; height: 300px;" :zoom="18" :center="{lat: locationForm.lat, lng: locationForm.lng}"  @center_changed="centerChange">
              <gmap-marker
                :draggable="true"
                :clickable="true"
                :icon="'/static/Philland_Place_Icon-10x10.png'"
                :position="{lat: locationForm.lat, lng: locationForm.lng}"
                @dragend="setMarker"
                ></gmap-marker>
              <gmap-circle
                :center="{lat: locationForm.lat, lng: locationForm.lng}"
                :radius="20"
                :draggable="false"
                :clickable="false"
                :options="{fillColor:'#56BA50',strokeWeight:'0', fillOpacity: '0.40'}"
               style="border:1px">
              </gmap-circle>
            </gmap-map>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios';
//api
import { baseUrl, getProperty } from '../../assets/utils/properties-api.js'
import { getIdToken } from '../../assets/utils/auth.js'
//json
import amenitiesOpts from '../../../static/json/amenities.json'
export default {
  name:'edit-property',
  data(){
    return{
      property_id:'',
      property_no:'',
      basicEdit:false,
      keyInfoEdit:false,
      unitDetailEdit:false,
      amenitiesEdit:false,
      amenitiesOptions: [],
      locationEdit:false,
      basicForm:{
        title:'',
        description:'',
      },
      keyInfoForm:{
        offer_type:'',
        property_type:'',
        price:''
      },
      unitDetailForm:{
        bedrooms:'',
        bathrooms:'',
        parking:'',
        floor_area:'',
        lot_area:'',
        balcony:''
      },
      amenitiesForm:{
        amenities:''
      },
      amenitiesForm:{
        amenities:''
      },
      mediaForm:{
        media:[]
      },
      locationForm:{
        formatted_address:'',//varchar
        lat:'',//varchar
        lng:'',//varchar
        street_number:'',//varchar
        route:'',
        locality:'',
        administrative_area_level_2:'',
        administrative_area_level_1:'',
        country:'',
        postal_code:'',
        lat:0,
        lng:0
      },
      basicRules:{
        title:[
          { required: true, message: 'Title is required', trigger: 'blur' }
        ],
        description:[
          { required: true, message: 'Description is required', trigger: 'blur' },
          { min: 20, max: 2000, message: 'Description should be atleast 20 characters and max of 2000', trigger: 'blur' }
        ]
      },
      keyInfoRules:{
        price:[
          { required: true, message: 'Price is required', trigger: 'blur' }
        ]
      },
      unitDetailRules:{
        floor_area:[
          { required: true, message: 'Floor Area is required', trigger: 'blur' }
        ],
        lot_area:[
          { required: true, message: 'Lot Area is required', trigger: 'blur' }
        ]
      },
      ammenitiesRules:{},
      locationRules:{},
      imgUrl:''
    }
  },
  methods:{
    getProperty:function(property_no){
      getProperty(property_no).then((property) =>{
          console.log(property);
          this.property_id = property.id;
          this.property_no = property.property_no;
          //basic info
          this.basicForm.title = property.property_detail.title;
          this.basicForm.description = property.property_detail.description;
          //key info
          this.keyInfoForm.offer_type = property.offer_type.toString();
          this.keyInfoForm.property_type = property.property_type.toString();
          this.keyInfoForm.price = property.price;
          //details
          this.unitDetailForm.bedrooms = property.property_detail.bedrooms;
          this.unitDetailForm.bathrooms = property.property_detail.bathrooms;
          this.unitDetailForm.parking = property.property_detail.parking;
          this.unitDetailForm.floor_area = property.property_detail.floor_area.toString();
          this.unitDetailForm.lot_area = property.property_detail.lot_area.toString();
          this.unitDetailForm.balcony = property.property_detail.balcony;
          //amenities
          this.amenitiesForm.amenities = property.property_detail.amenities.split(",");
          //location
          this.locationForm.formatted_address = property.property_location.formatted_address;
          this.locationForm.lat = Number(property.property_location.lat);
          this.locationForm.lng = Number(property.property_location.lng);
          //
          this.mediaForm.media = property.property_media;
      });
    },
    formatNumber: function(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  	},
    propertyType:function(propertyType){
      var type='';
      switch(propertyType){
        case '1':
          type = 'Condominium';
          break;
        case '2':
            type = 'House and Lot';
            break;
        case '3':
            type = 'Townhouse';
      }
      return type;
    },
    cancelBasicEdit:function(){
      getProperty(this.property_no).then((property) =>{
        this.basicForm.title = property.property_detail.title;
        this.basicForm.description = property.property_detail.description;
      });
    },
    cancelkeyInfoEdit:function(){
      getProperty(this.property_no).then((property) =>{
        this.keyInfoForm.offer_type = property.offer_type.toString();
        this.keyInfoForm.property_type = property.property_type.toString();
        this.keyInfoForm.price = property.price;
      });
    },
    cancelUnitDetailEdit:function(){
      getProperty(this.property_no).then((property) =>{
        this.unitDetailForm.bedrooms = property.property_detail.bedrooms.toString();
        this.unitDetailForm.bathrooms = property.property_detail.bathrooms;
        this.unitDetailForm.parking = property.property_detail.parking;
        this.unitDetailForm.floor_area = property.property_detail.floor_area;
        this.unitDetailForm.lot_area = property.property_detail.lot_area;
        this.unitDetailForm.balcony = property.property_detail.balcony;
      });
    },
    cancelAmenitiesEdit:function(){
      getProperty(this.property_no).then((property) =>{
        this.amenitiesForm.amenities = property.property_detail.amenities.split(",");
      });
    },
    cancelLocationEdit:function(){
      this.clearLocation();
      getProperty(this.property_no).then((property) =>{
        this.locationForm.formatted_address = property.property_location.formatted_address;
        this.locationForm.street_number = property.property_location.street_number;
        this.locationForm.route = property.property_location.route;
        this.locationForm.locality = property.property_location.locality;
        this.locationForm.administrative_area_level_2 = property.property_location.administrative_area_level_2;
        this.locationForm.administrative_area_level_1 = property.property_location.administrative_area_level_1;
        this.locationForm.country = property.property_location.country;
        this.locationForm.postal_code = property.property_location.postal_code;
        this.locationForm.lat = Number(property.property_location.lat);
        this.locationForm.lng = Number(property.property_location.lng);
      });
    },
    clearLocation:function(){
      this.locationForm.formatted_address = '';
      this.locationForm.street_number = '';
      this.locationForm.route = '';
      this.locationForm.locality ='';
      this.locationForm.administrative_area_level_2 ='';
      this.locationForm.administrative_area_level_1='';
      this.locationForm.country ='';
      this.locationForm.postal_code = '';
    },
    setLocation:function(place){
      //clear everything first
      this.clearLocation();
      //then populate
      this.locationForm.formatted_address = place.formatted_address;

      var self = this.locationForm;

      place.address_components.forEach(function(index, value){
        if(index.types[0] === 'street_number'){
          self.street_number = index.long_name;
        }else if(index.types[0] === 'route'){
          self.route = index.long_name;
        }else if(index.types[0] === 'locality'){
          self.locality = index.long_name;
        }else if(index.types[0] === 'administrative_area_level_2'){
          self.administrative_area_level_2 = index.long_name;
        }else if(index.types[0] === 'administrative_area_level_1'){
          self.administrative_area_level_1 = index.long_name;
        }else if(index.types[0] === 'country'){
          self.country = index.long_name;
        }else if(index.types[0] === 'postal_code'){
          self.postal_code = index.long_name;
        }
      });
    },
    setMarker: function(place){
      this.locationForm.lat = place.latLng.lat();
      this.locationForm.lng = place.latLng.lng();
    },
    centerChange: function(center){
      this.locationForm.lat = center.lat();
      this.locationForm.lng = center.lng();
    },
    saveBasic:function(){
      const self = this;
      var basic = {
        id : this.property_id,
        edit: 'details',
        title: this.basicForm.title,
        description: this.basicForm.description
      }
      this.$refs.basicForm.validate((valid) => {
        if(valid){
          axios.defaults.headers.common['token'] = getIdToken();
          return axios.post(baseUrl()+'/broker/property/update', basic)
          .then(function(response){
            if(response.data.message === "Success"){
              self.basicEdit = false;
              self.$message({
                message: 'The information was successfully updated',
                type: 'success'
              });
            };
          }).catch(function(error){
            //console.log(error)
          });
        }
      });
    },
    saveKeyInfo:function(){
      const self = this;
      var keyInfo = {
        id : this.property_id,
        edit: 'details',
        offer_type: this.keyInfoForm.offer_type,
        property_type : this.keyInfoForm.property_type,
        price: this.keyInfoForm.price
      }
      console.log(keyInfo);
      this.$refs.keyInfoForm.validate((valid) => {
        if(valid){
          axios.defaults.headers.common['token'] = getIdToken();
          return axios.post(baseUrl()+'/broker/property/update', keyInfo)
          .then(function(response){
            if(response.data.message === "Success"){
              self.keyInfoEdit = false;
              self.$message({
                message: 'The information was successfully updated',
                type: 'success'
              });
            };
          }).catch(function(error){
            //console.log(error)
          });
        }
      });
    },
    saveUnitDetail:function(){
      const self = this;
      var unitDetail = {
        id : this.property_id,
        edit: 'details',
        bedrooms:this.unitDetailForm.bedrooms,
        bathrooms:this.unitDetailForm.bathrooms,
        parking:this.unitDetailForm.parking,
        floor_area:this.unitDetailForm.floor_area,
        lot_area:this.unitDetailForm.lot_area,
        balcony:this.unitDetailForm.balcony
      }
      this.$refs.unitDetailForm.validate((valid) => {
        if(valid){
          axios.defaults.headers.common['token'] = getIdToken();
          return axios.post(baseUrl()+'/broker/property/update', unitDetail)
          .then(function(response){
            if(response.data.message === "Success"){
              self.unitDetailEdit = false;
              self.$message({
                message: 'The information was successfully updated',
                type: 'success'
              });
            };
          }).catch(function(error){
            //console.log(error)
          });
        }
      });
    },
    saveAmenities:function(){
      const self = this;
      var amenities = {
        id: this.property_id,
        edit: 'details',
        amenities: this.amenitiesForm.amenities.toString()
      }

      console.log(amenities.amenities);
      axios.defaults.headers.common['token'] = getIdToken();
      return axios.post(baseUrl()+'/broker/property/update', amenities)
      .then(function(response){
        if(response.data.message === "Success"){
          self.amenitiesEdit = false;
          self.$message({
            message: 'The information was successfully updated',
            type: 'success'
          });
        };
      }).catch(function(error){
        //console.log(error)
      });
    },
    handleCard: function(propertyNo){
      this.$router.push({name:'view-property', params:{property_no:propertyNo}})
    }
  },
  mounted(){
    document.documentElement.scrollTop = 0;//scroll top
    this.imgUrl = baseUrl() + '/images/';
    this.getProperty(this.$route.params.property_no);
    this.amenitiesOptions = amenitiesOpts;
  }
}
</script>

<style>
  .el-form-item__label{
    color: #999999;
  }
  .el-tag--primary{
    background-color: #56BA50 !important;
  }
  .el-select__tags-text{
    color: #ffffff !important;
    font-size: 14px !important;
  }
  .el-tag__close{
    color: #ffffff !important;
  }
  .el-tag__close:hover{
    background-color: #f2f2f2 !important;
    color: #999999 !important;
  }
</style>

<style scoped>
  .main-nav{
    position: fixed;
    height: 10px;
    background-color: #ffffff;
    box-shadow: 0 4px 2px -3px #d9d9d9;
    margin-top: 60px;
    z-index: 5;
  }
  .primary-img{
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  .el-card{
    box-shadow: 0px 0px 0px 0px !important;
    border-radius: 2px !important;
    margin-bottom: 10px;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
  }
  .el-button{
    margin:5px;
    width: 80px;
  }
  .el-form-item{
    display: block;
  }
  .label{
    color: #999999;
    font-size: 14px;
    padding-top: 0px;
    margin-bottom: 5px;;
  }
  .required{
    color:#ff4949;
    margin-right:4px
  }

  @media (max-width: 991px) {
    .head-container{
      margin: 0px;
      padding: 0px 5px;
    }
  }

  @media (max-width: 769px) {
    .form-container{
      margin-left: 0px;
      padding: 0px 5px;
    }
  }
</style>
