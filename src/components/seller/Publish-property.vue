<template>
  <div class="cont">
    <div class="main-nav fixed-top" style="margin-top:66px">
      <el-progress status="success" :show-text="false" :stroke-width="10" :percentage="activeStep === 0 ? activeStep + 5 :activeStep * 16.6"></el-progress>
    </div>
    <el-row type="flex" class="row-bg">
      <el-col :span="24">
        <el-row v-show="activeStep === 0">
          <el-col :xs="24" :offset="3" :sm="9" class="form-container">
            <step-one
              @offertype="changeOfferType"
              @propertytype="changePropertyType"
              @sellingprice="changeSellingPrice"
              @priceoption="changePriceOption"
              @continue="continueStep"></step-one>
          </el-col>
          <el-col :xs="24" :offset="1" :span="8" class="tooltip-container">
            <screen-tip-one></screen-tip-one>
          </el-col>
        </el-row>
        <el-row v-show="activeStep === 1">
          <el-col :xs="24" :offset="3" :sm="9" class="form-container">
            <step-two
              @bedrooms="changeBedrooms"
              @bathrooms="changeBathrooms"
              @parking="changeParking"
              @floorarea="changeFloorArea"
              @lotarea="changeLotArea"
              @balcony="changeBalcony"
              @continue="continueStep"
              @back="previousStep"></step-two>
          </el-col>
          <el-col :xs="24" :offset="1" :span="8" class="tooltip-container">
            <screen-tip-two></screen-tip-two>
          </el-col>
        </el-row>
        <el-row v-show="activeStep === 2">
          <el-col :xs="24" :offset="3" :span="9" class="form-container">
            <step-three
              @amenities="changeAmenities"
              @back="previousStep"
              @continue="continueStep"
              ></step-three>
          </el-col>
          <el-col :xs="24" :offset="1" :span="8" class="tooltip-container">
              <screen-tip-three></screen-tip-three>
          </el-col>
        </el-row>
        <el-row v-show="activeStep === 3">
          <el-col :xs="24" :offset="3" :span="9" class="form-container">
            <step-four
             @formatedaddress="setLocation"
             @dragmarker="setMarker"
             @continue="continueStep"
             @back="previousStep"
             @exactaddress="changeExactAddress"
             :offertype="property.offer_type"
             ></step-four>
          </el-col>
          <el-col :xs="24" :offset="1" :span="8" class="tooltip-container">
              <screen-tip-four></screen-tip-four>
          </el-col>
        </el-row>
        <el-row v-show="activeStep === 4">
          <el-col :xs="24" :offset="3" :span="9" class="form-container">
            <step-five
              @title="changeTitle"
              @description="changeDescription"
              @youtubeurl="changeYoutubeUrl"
              @images="handleChange"
              @continue="continueStep"
              @back="previousStep"></step-five>
          </el-col>
          <el-col :xs="24" :offset="1" :span="8" class="tooltip-container">
              <screen-tip-five></screen-tip-five>
          </el-col>
        </el-row>
        <el-row v-show="activeStep === 5">
          <el-col :xs="24" :offset="3" :span="9" class="form-container">
            <step-six v-show="activeStep === 5"
              @fullname="changeFullname"
              @email="changeEmail"
              @mobileprovider="changeMobileProvider"
              @mobile="changeMobile"
              @homeprovider="changeHomeProvider"
              @home="changeHome"
              @finish="handlePublish"
              :uploadprogress="uploadProgress"
              @back="previousStep"></step-six>
          </el-col>
          <el-col :xs="24" :offset="1" :span="8" class="tooltip-container">
              <screen-tip-six></screen-tip-six>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import stepOne from './Step-one.vue'
import stepTwo from './Step-two.vue'
import stepThree from './Step-three.vue'
import stepFour from './Step-four.vue'
import stepFive from './Step-five.vue'
import stepSix from './Step-six.vue'

import ScreenTipOne from '../content/Screentip-one.vue'
import ScreenTipTwo from '../content/Screentip-two.vue'
import ScreenTipThree from '../content/Screentip-three.vue'
import ScreenTipFour from '../content/Screentip-four.vue'
import ScreenTipFive from '../content/Screentip-five.vue'
import ScreenTipSix from '../content/Screentip-six.vue'

export default {
  name:'publish-property',
  computed: {
    token: function () {
      return this.$store.getters.phillandsIdToken
    },
    profile: function () {
      return JSON.parse(this.$store.getters.phillandsProfile)
    }
  },
  data(){
    return{
      RequiredVerification: false,
      activeStep:0,
      finishButton:false,
      uploadProgress:0,
      //progressStep:0,
      property: {
        offer_type:1,//int
        property_type:1,//int
        price:0,//int
        price_option:0,//int
        bedrooms:0,//int
        bathrooms:1,//int
        parking:0,//int
        floor_area:0,//int
        lot_area:0,//int
        balcony:1,//int
        amenities:[],//text
        title:'',//varchar
        description:'',//text
        exact_address:'',//varchar
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
        images:[],
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
  components:{ stepOne, stepTwo, stepThree, stepFour, stepFive, stepSix, ScreenTipOne, ScreenTipTwo, ScreenTipThree, ScreenTipFour, ScreenTipFive, ScreenTipSix },
  methods:{
    continueStep:function(step){
      document.documentElement.scrollTop = 0;
      this.activeStep++;
    },
    previousStep:function(step){
      document.documentElement.scrollTop = 0;
      this.activeStep--;
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
    changePriceOption:function(option){
      this.property.price_option = parseInt(option);
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
    changeAmenities:function(amenities){
      this.property.amenities = amenities;
    },
    changeTitle:function(title){
      this.property.title = title;
    },
    changeDescription:function(desc){
      this.property.description = desc;
    },
    changeExactAddress:function(address){
      this.property.exact_address = address;
    },
    setLocation:function(place){
      //clear everything first
      this.property.formatted_address = '';
      this.property.street_number = '';
      this.property.route = '';
      this.property.locality ='';
      this.property.administrative_area_level_2 ='';
      this.property.administrative_area_level_1='';
      this.property.country ='';
      this.property.postal_code = '';

      //then populate
      this.property.formatted_address = place.formatted_address;

      var thisProperty = this.property;

      place.address_components.forEach(function(index, value){
        if(index.types[0] === 'street_number'){
          thisProperty.street_number = index.long_name;
        }else if(index.types[0] === 'route'){
          thisProperty.route = index.long_name;
        }else if(index.types[0] === 'locality'){
          thisProperty.locality = index.long_name;
        }else if(index.types[0] === 'administrative_area_level_2'){
          thisProperty.administrative_area_level_2 = index.long_name;
        }else if(index.types[0] === 'administrative_area_level_1'){
          thisProperty.administrative_area_level_1 = index.long_name;
        }else if(index.types[0] === 'country'){
          thisProperty.country = index.long_name;
        }else if(index.types[0] === 'postal_code'){
          thisProperty.postal_code = index.long_name;
        }
      });
    },
    setMarker:function(latlong){
      this.property.lat = latlong.lat;
      this.property.lng = latlong.lng;
    },
    handleChange:function(file){
      this.property.images = [];
      file.forEach(raw => {
        this.property.images.push(raw['raw']);
      });
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

      Object.keys(this.property).forEach( key => {
        if(key === 'images'){
          this.property[key].forEach( file => {
            formData.append('images', file)
          })
        }else{
          formData.append(key, this.property[key]);
        }
      });

      this.axios.defaults.headers.common['token'] = this.token;

      this.finishButton = true;

      let config = {
        onUploadProgress: progressEvent => {
          let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
          // do whatever you like with the percentage complete
          this.uploadProgress = percentCompleted
          // maybe dispatch an action that will update a progress bar or something
        }
      }

      this.axios.post(process.env.API_URL+'/broker/property/create', formData, config)
      .then(response => {

        if(response.data.message === "success"){
          this.$router.push({name:'publish-completed'});
        }

      })
      .catch( function(error){
        console.log(error);
      })
    },
    verificationRequired: function(){
      if(this.profile.verified === 0){
        const h = this.$createElement;
        this.$msgbox({
          title: 'Account Verification Required',
          message: h('p', null, [
            h('div', { class: 'el-message-box__status el-icon-warning' }, null),
            h('div', { style :'margin-left:50px'}, ' You need to verify your email address before you can publish a property ')
          ]),
          closeOnClickModal:false,
          showCancelButton: true,
          confirmButtonText: 'Verify Now',
          confirmButtonClass: 'btn-pl-green',
          cancelButtonText: 'Cancel',
          beforeClose: (action, instance, done) => {
            if(action === 'cancel'){
              this.$router.push({name:'index'});
              done();
            }else if(action === 'confirm'){
              this.axios.defaults.headers.common['token'] = this.token;
              this.axios.get(process.env.API_URL+'/client/verification/send').then(response =>{
                if(response.data.message === "success"){
                  this.$message({
                    showClose: true,
                    duration: 10000,
                    message: 'A verification link was sent to your email',
                    type: 'success'
                  });
                }
              }).catch(error =>{
                console.log(error)
              });
              this.$router.push({name:'index'});
              done();
            }
          }
        });
      }
    }
  },
  created(){
    this.verificationRequired()
  }
}
</script>

<style>
.el-progress.is-success .el-progress-bar__inner{
  background-color: #13ce66 !important
}
.force-left{
  margin-left: 0px !important;
}
</style>

<style scoped>
.cont{
    margin-top: -25px;
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
