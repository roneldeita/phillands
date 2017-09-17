<template>
  <div class="cont">
    <div class="main-nav fixed-top" style="margin-top:66px">
      <el-progress status="success" :show-text="false" :stroke-width="10" :percentage="activeStep === 0 ? activeStep + 5 :activeStep * 20"></el-progress>
    </div>
    <el-row type="flex" class="row-bg">
      <el-col :span="24">
        <el-row v-show="activeStep === 0">
          <el-col :xs="24" :offset="3" :sm="9" class="form-container">
            <step-one
              @offertype="changeOfferType"
              @propertytype="changePropertyType"
              @sellingprice="changeSellingPrice"></step-one>
          </el-col>
          <el-col :xs="24" :offset="1" :span="8" class="tooltip-container">
            <div class="card text-left" style="width: 350px;">
              <div class="card-block">
                <h4 class="card-title"><span style="font-size:2em" class="fa fa-lightbulb-o txt-pl-green"></span> Tooltips Lorem Ipsum</h4>
                <p class="card-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row v-show="activeStep === 1">
          <el-col :xs="24" :offset="3" :span="9" class="form-container">
            <step-two
              @bedrooms="changeBedrooms"
              @bathrooms="changeBathrooms"
              @parking="changeParking"
              @floorarea="changeFloorArea"
              @lotarea="changeLotArea"
              @balcony="changeBalcony"></step-two>
          </el-col>
          <el-col :xs="24" :offset="1" :span="8" class="tooltip-container">
            <div class="card text-left" style="width: 350px;">
              <div class="card-block">
                <h4 class="card-title"><span style="font-size:2em" class="fa fa-lightbulb-o txt-pl-green"></span> Tooltips Lorem Ipsum</h4>
                <p class="card-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row v-show="activeStep === 2">
          <el-col :xs="24"  :offset="3" :span="9" class="form-container">
            <step-three
             @formatedaddress="setLocation"
             @dragmarker="setMarker"></step-three>
          </el-col>
          <el-col :xs="24" :offset="1" :span="8" class="tooltip-container">
            <div class="card text-left" style="width: 350px;">
              <div class="card-block">
                <h4 class="card-title"><span style="font-size:2em" class="fa fa-lightbulb-o txt-pl-green"></span> Tooltips Lorem Ipsum</h4>
                <p class="card-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row v-show="activeStep === 3">
          <el-col :xs="24" :offset="3" :span="9" class="form-container">
            <step-four
              @description="changeDescription"
              @youtubeurl="changeYoutubeUrl"
              @images="handleChange"></step-four>
          </el-col>
          <el-col :xs="24" :offset="1" :span="8" class="tooltip-container">
            <div class="card text-left" style="width: 350px;">
              <div class="card-block">
                <h4 class="card-title"><span style="font-size:2em" class="fa fa-lightbulb-o txt-pl-green"></span> Tooltips Lorem Ipsum</h4>
                <p class="card-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row v-show="activeStep === 4">
          <el-col :xs="24" :offset="3" :span="9" class="form-container">
            <step-five v-show="activeStep === 4"
              @fullname="changeFullname"
              @email="changeEmail"
              @mobileprovider="changeMobileProvider"
              @mobile="changeMobile"
              @homeprovider="changeHomeProvider"
              @home="changeHome"></step-five>
          </el-col>
          <el-col :xs="24" :offset="1" :span="8" class="tooltip-container">
            <div class="card text-left" style="width: 350px;">
              <div class="card-block">
                <h4 class="card-title"><span style="font-size:2em" class="fa fa-lightbulb-o txt-pl-green"></span> Tooltips Lorem Ipsum</h4>
                <p class="card-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg">
      <el-col :xs="24" :offset="3" :span="9" style="max-width:503px" class="form-container">
        <el-button
          class="pull-left"
          size="large"
          :class="activeStep <= 0 ? 'hidden' : ''"
          @click="activeStep--">Back</el-button>
        <el-button
          type="success"
          :class="activeStep <= 0 ? 'pull-left | force-left' : 'pull-right'"
          size="large"
          :disabled="activeStep >= 4"
          :hidden="activeStep >= 4"
          @click="continueStep">Continue</el-button>
        <el-button
          type="success"
          class="pull-right"
          v-show="activeStep === 4"
          size="large"
          @click="handlePublish"
          >Finish</el-button>
      </el-col>
    </el-row>
    <!--{{ property }}<br>
    {{ unitDetails }}<br>
    {{ location }}<br>
    {{ media }}<br>
    {{ contacts }} -->
  </div>
</template>

<script>
import axios from 'axios'

import stepOne from './step-one.vue'
import stepTwo from './step-two.vue'
import stepThree from './step-three.vue'
import stepFour from './step-four.vue'
import stepFive from './step-five.vue'

export default {
  name:'publish-property',
  data(){
    return{
      activeStep:0,
      //progressStep:0,
      property: {
        offer_type:1,//int
        property_type:1,//int
        price:0,//int
        bedrooms:0,//int
        bathrooms:1,//int
        parking:0,//int
        floor_area:0,//int
        lot_area:0,//int
        balcony:1,//int
        description:'',//text
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
        images:'',
        youtube_url:'',
        full_name:'',
        email:'',
        mobile_ccc:'+63',
        mobile:'',
        home_ccc:'+63',
        home:''
      }
    }
  },
  components:{ stepOne, stepTwo, stepThree, stepFour, stepFive },
  methods:{
    continueStep:function(){
      this.activeStep++;
    },
    changeOfferType:function(type){
      this.property.offer_type = parseInt(type);
    },
    changePropertyType:function(type){
      this.property.property_type =  parseInt(type);
    },
    changeSellingPrice:function(amount){
      this.property.price = parseInt(amount);
    },
    changeBedrooms:function(bedrooms){
      this.property.bedrooms = parseInt(bedrooms);
    },
    changeBathrooms:function(bathrooms){
      this.property.bathrooms = parseInt(bathrooms);
    },
    changeParking:function(parking){
      this.property.parking = parseInt(parking);
    },
    changeLotArea:function(area){
      this.property.lot_area = parseInt(area);
    },
    changeFloorArea:function(area){
      this.property.floor_area = parseInt(area);
    },
    changeBalcony:function(balcony){
      this.property.balcony = parseInt(balcony);
    },
    changeDescription:function(desc){
      this.property.description = desc;
    },
    setLocation:function(place){
      this.property.formatted_address = place.formatted_address;

      var self = this.property;

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
    setMarker:function(latlong){
      this.property.lat = latlong.lat;
      this.property.lng = latlong.lng;
    },
    handleChange:function(file){
      this.property.images = file[0]['raw'];
    },
    changeYoutubeUrl:function(url){
      this.property.youtube_url = url;
    },
    changeFullname:function(name){
      this.property.full_name = name;
    },
    changeEmail:function(email){
      this.property.email = email;
    },
    changeMobileProvider:function(provider){
      this.property.mobile_ccc = provider;
    },
    changeMobile:function(number){
      this.property.mobile = number;
    },
    changeHomeProvider:function(provider){
      this.property.home_ccc = provider;
    },
    changeHome:function(number){
      this.property.home = number
    },
    handlePublish:function(){
      const formData = new FormData();
      const self = this;

      Object.keys(this.property).forEach(function(key){
        formData.append(key, self.property[key]);
      });

      formData.append(this.property.images.raw, this.property.images.name)

      axios.post('http://192.168.0.11:8080/property/create', formData)
      .then(function(response){
        console.log(response.data);
      })
      .catch( function(error){
        console.log(error);
      })
    }
  }
}
</script>

<style>
.force-left{
  margin-left: 0px !important;
}
</style>

<style scoped>
.cont{
    margin-top: -25px;
}
.hidden{
  display:none;
}
.force-left{
  margin-left: 0px;
}
.el-step__head.is-text{
  font-size: 24px;
}
.main-nav{
  position: fixed;
  background-color: #ffffff;
  box-shadow: 0 4px 2px -3px #d9d9d9;
  margin-top: 60px;
  z-index: 1;
}
.card{
  background-color: #f8f8f8;
  border: 1px solid #f0f0f0;
}

@media (max-width: 769px) {
  .form-container,
  .tooltip-container{
    margin-left: 0px;
    padding: 0px 15px;
  }
}
</style>
