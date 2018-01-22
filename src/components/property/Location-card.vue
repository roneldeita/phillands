<template>
  <el-col id="loc" :span="24" :sm="8" :md="6" :lg="6">
      <el-card>
        <img v-lazy="location.img" :alt="location.location" class="image" @click="CardClick">
        <h4>{{location.location}}</h4>
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
  .image {
    width: 100%;
    object-fit: cover;
    height: 230px;
    min-height: 230px;
    display: block;
  }
  h4{
    position:absolute;
    margin-left: 12px;
    margin-top:-35px;
    color: #ffffff
  }
</style>
