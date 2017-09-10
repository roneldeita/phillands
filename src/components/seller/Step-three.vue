<template>
  <el-row class="text-left">
    <h2>Location</h2><br>
    <h5>Address</h5>
    <gmap-autocomplete class="form-control" @place_changed="setLocation"></gmap-autocomplete><br>
    <gmap-map style="width: 600px; height: 300px;" :zoom="zoom" :center="center">
      <gmap-marker
        :draggable="true"
        :clickable="true"
        :position="marker"
        @dragend="setMarker"
        ></gmap-marker>
    </gmap-map>
  </el-row>
</template>

<script>
export default {
  name:'step-one',
  data(){
    return{
      zoom:7,
      center: {lat: 14.5677961, lng: 121.0206435},
      marker: {lat: 0, lng: 0}
    }
  },
  methods:{
    setLocation: function(place){
      console.log(place.address_components);
      this.marker = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      }
      this.updateCenter();
    },
    setMarker: function(place){
      this.marker = {
        lat: place.latLng.lat(),
        lng: place.latLng.lng(),
      }
      this.updateCenter();
    },
    updateCenter() {
      this.center = this.marker;
      this.zoom = 12;
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
  .form-control{
    max-width: 600px
  }
</style>
