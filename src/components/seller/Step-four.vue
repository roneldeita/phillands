<template>
    <el-row class="text-left">
      <h2>Location</h2><br>
      <!-- <button class="btn btn-sm btn-success" style="border-radius:50%; margin-bottom:5px; padding:5px 10px">1</button> -->
      <span v-if="offertype === 4">
        <h5 class="txt-pl-green">Exact Address</h5>
        <el-input type="textarea"  @change="changeExactAddress" :rows="3"></el-input>
        <br>
        <br>
      </span>
      <h5 v-if="offertype === 4" class="txt-pl-green">Google Map</h5>
      <h6><b>1</b>. Type the address</h6>
      <gmap-autocomplete class="form-control" @place_changed="setLocation" placeholder="Enter the location"></gmap-autocomplete><br>
      <!-- <button class="btn btn-sm btn-success" style="border-radius:50%; margin-bottom:5px; padding:5px 10px">2</button> -->
      <h6><b>2</b>. Drag the Map Marker and point it to the exact location of the property.</h6>
      <gmap-map :class="mapStyle" ref="gmap" :zoom="zoom" :center="center" :options="{styles:style}"  @center_changed="centerChange">
        <gmap-marker
          :draggable="true"
          :clickable="true"
          :icon="'/static/Philland_Place_Icon-10x10.png'"
          :position="marker"
          @dragend="setMarker"
          ></gmap-marker>
        <gmap-circle
          :center="marker"
          :radius="20"
          :draggable="false"
          :clickable="false"
          :options="{fillColor:'#13ce66',strokeWeight:'0', fillOpacity: '0.40'}"
         style="border:1px">
        </gmap-circle>
      </gmap-map>
      <br>
      <el-col :span="24" class="input">
        <el-button type="btn-pl-green" size="large" @click="backToPreviousStep">Back</el-button>
        <el-button type="success" class="btn-pl-green pull-right" size="large" @click="handleStep">Continue</el-button>
      </el-col>
    </el-row>
</template>

<script>
import MapStyle from '../../../static/json/map-detailed.json'

export default {
  name:'step-four',
  props:['offertype'],
  data(){
    return{
      zoom:7,
      center: {lat: 14.5677961, lng: 121.0206435},
      displayMap:true,
      marker: {lat: 0, lng: 0},
      style: [],
      mapStyle:'map-style'
    }
  },
  components:{ MapStyle },
  methods:{
    handleStep:function(){
      console.log(this.marker);
      var autocomplete = $('.form-control').val();
      if(!autocomplete){
        this.$message.error('Address is required');
      }else{
        this.$emit('continue')
      }
    },
    backToPreviousStep:function(){
      this.$emit('back')
    },
    changeExactAddress:function(address){
      console.log('asdsad');
      this.$emit('exactaddress', address)
    },
    setLocation: function(place){
      this.displayMap = false;
      this.$refs.gmap.resize();
      var address_components = [];

      this.marker = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      }
      this.updateCenter();
      this.$emit('formatedaddress', place);

    },
    setMarker: function(place){
      this.marker = {
        lat: place.latLng.lat(),
        lng: place.latLng.lng(),
      }
      this.updateCenter();
    },
    centerChange: function(center){
      this.marker = {
         lat: center.lat(),
         lng: center.lng()
       }
      this.updateCenter();
    },
    updateCenter() {
      this.center = this.marker;
      this.zoom = 18;
      this.$emit('dragmarker', this.marker);
    },
    changeFormattedAddress:function(place){
    //  console.log(place)
    }
  },
  mounted(){
  }

}
</script>

<style scoped>
  .input{
    margin-bottom: 10px;
  }
  .map-style{
    width: 100%;
    height: 300px;
    z-index:1;
  }
</style>
