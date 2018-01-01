<template>
  <div class="carousel-container">
    <el-carousel indicator-position="outside" :autoplay="false" :height="this.$route.name === 'view-property' ? '500px' : ''" style="background:black">
      <el-carousel-item v-for="images in images" :key="images.id">
          <img v-lazy="imgUrl+images.uploaded_filename" style="height:100%">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { baseUrl } from '../../assets/utils/properties-api.js';

export default {
  name: "property-carousel",
  props:['images'],
  data(){
    return{}
  },
  methods: {
  },
  created(){
    this.imgUrl = baseUrl() + '/images/';
  },
  mounted() {
    //console.log(this.$route.name)
  },
  components: {}
}
</script>
<style scoped>
  img[lazy=loading] {
    background-image: url('../../../static/cube.gif');
    background-repeat: no-repeat;
    background-position: center;
  }
</style>
