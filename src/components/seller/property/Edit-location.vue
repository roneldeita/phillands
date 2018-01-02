<template>
  <div>
    <div class="text-right">
      <h4 class="pull-left txt-pl-green">Location</h4>
      <el-button v-if="!locationEdit" @click="locationEdit = true" icon="edit">Edit</el-button>
      <el-button type="success" class="btn-pl-green" v-if="locationEdit" @click="saveLocation">Save</el-button>
      <el-button v-if="locationEdit" @click="locationEdit = false; cancelLocationEdit()">Cancel</el-button>
    </div>
    <el-row>
      <el-col v-if="!locationEdit" :sm="18" :md="12">
        <span v-if="offer_type === 4">
          <p class="label">Exact Address</p>
          <p><span class="fa fa-map-marker txt-pl-light"></span> {{ locationForm.exact_address }}</p>
        </span>
        <p class="label">Google Map</p>
        <p><span class="fa fa-map-marker txt-pl-light"></span> {{ locationForm.formatted_address }}</p>
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
        <span v-if="offer_type === 4">
          <p class="label">Exact Address</p>
          <el-input type="textarea" :rows="3" v-model="locationForm.exact_address"></el-input>
          <br><br>
        </span>
        <p class="label"><span class="required">*</span>Google Map</p>
        <gmap-autocomplete class="form-control" v-model="locationForm.formatted_address" @place_changed="setLocation"></gmap-autocomplete><br>
        <gmap-map style="width: 100%; height: 300px;" ref="gmap" :zoom="18" :center="{lat: locationForm.lat, lng: locationForm.lng}" @center_changed="dragMap">
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
  </div>
</template>

<script>
//api
import { getProperty } from '../../../assets/utils/properties-api.js'

export default {
  name:'edit-location',
  computed: {
    token:  function () {
      return this.$store.getters.phillandsIdToken
    }
  },
  data(){
    return{
      offer_type:'',
      locationEdit:false,
      locationForm:{
        exact_address:'',
        formatted_address:'',
        street_number:'',
        route:'',
        locality:'',
        administrative_area_level_2:'',
        administrative_area_level_1:'',
        country:'',
        postal_code:'',
        lat:0,
        lng:0
      },
      locationRules:{},
    }
  },
  methods:{
    getProperty:function(property_no){
      getProperty(property_no).then((property) =>{
          this.property_id = property.id;
          this.property_no = property.property_no;
          this.offer_type = property.offer_type;
          //location
          this.locationForm.exact_address = property.property_location.exact_address;
          this.locationForm.formatted_address = property.property_location.formatted_address;
          this.locationForm.lat = Number(property.property_location.lat);
          this.locationForm.lng = Number(property.property_location.lng);
      });
    },
    saveLocation:function(){
      var autocomplete = $('.form-control').val();
      if(!autocomplete){
        this.$message.error('Address is required');
      }else{
        const self = this;
        var location = {
          id : this.property_id,
          edit: 'location',
          exact_address:this.locationForm.exact_address,
          formatted_address:this.locationForm.formatted_address,
          lat:this.locationForm.lat,
          lng:this.locationForm.lng,//varchar
          street_number:this.locationForm.street_number,//varchar
          route:this.locationForm.route,
          locality:this.locationForm.locality,
          administrative_area_level_2:this.locationForm.administrative_area_level_2,
          administrative_area_level_1:this.locationForm.administrative_area_level_1,
          country:this.locationForm.country,
          postal_code:this.locationForm.postal_code
        }
        this.axios.defaults.headers.common['token'] = this.token;
        return this.axios.post(process.env.API_URL+'/broker/property/update', location)
        .then(function(response){
          if(response.data.message === "Success"){
            self.locationEdit = false;
            self.$message({
              message: 'The information was successfully updated',
              type: 'success'
            });
          };
        }).catch(function(error){
          //console.log(error)
        });
      }
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
      this.$refs.gmap.resize();
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
      this.centerChange(place)
    },
    setMarker: function(place){
      this.locationForm.lat = place.latLng.lat();
      this.locationForm.lng = place.latLng.lng();
    },
    dragMap:function(center){
      this.locationForm.lat = center.lat();
      this.locationForm.lng = center.lng();
    },
    centerChange: function(center){
      this.locationForm.lat = center.geometry.location.lat();
      this.locationForm.lng = center.geometry.location.lng();
    },
    cancelLocationEdit:function(){
      this.clearLocation();
      getProperty(this.property_no).then((property) =>{
        this.locationForm.exact_address = property.property_location.exact_address;
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
  },
  mounted(){
    this.getProperty(this.$route.params.property_no);
    this.imgUrl = process.env.API_URL + '/images/';
  }
}
</script>

<style scoped>
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
</style>
