<template>
  <el-col id="loc" :span="24" :sm="8" :md="6" :lg="6">
      <el-card>
        <figure><img v-lazy="location.img" :alt="location.location" class="image" @click="CardClick">
        <h4>{{location.location}}</h4>
        </figure>
      </el-card>
  </el-col>
</template>
<script>
export default {
  name: "",
  props:['location', 'search'],
  data() {
    return{

    }
  },
  methods:{
    CardClick(){
      this.$store.dispatch('updatePhillandsSearch', {property_type: this.search.select_search})
      this.$store.dispatch('updatePhillandsSearch',{location:this.search.input_search})
      this.$router.push({name:'sale'})
    }
  },
  mounted(){
    // console.log(this.location)
  }
}
</script>
<style media="screen">
  #loc .el-card__body{
    padding:10px 0!important;
  }
  #loc .el-card{
    border: 0px !important;
    box-shadow: none !important;
    cursor: pointer;
  }
</style>
<style scoped>
  img[lazy=loading] {
    background-image: url('../../../static/cube.gif');
    background-repeat: no-repeat;
    background-position: center;
  }
  figure{
    overflow: hidden;
  }
  .image {
    width: 100%;
    height: 230px;
    min-height: 230px;
    object-fit: cover;
    display: block;
    -webkit-transform: scale(1);
  	transform: scale(1);
  	-webkit-transition: .3s ease-in-out;
  	transition: .3s ease-in-out;
  }
  h4{
    position:absolute;
    margin-left: 12px;
    margin-top:-35px;
    color: #ffffff;
  }
  .image:hover {
    -webkit-transform: scale(1.3);
	   transform: scale(1.3);
  }

</style>
