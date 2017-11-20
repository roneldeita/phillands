<template>
  <div style="width:100%">
    <p>0 properties found</p>
    <!-- <el-row :gutter="20" style="margin:-15px 5px 10px 5px">
      <el-col :xs="24" :sm="24" :md="24">
        <h6 class="text-left"> properties found</h6>
      </el-col>
      <el-col :xs="24" :sm="6" :md="6">
        <el-row>
          <el-col :span="24">

          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12">
        <el-row :gutter="20">
          <el-col :span="24" v-for="n in 10" v-bind:key="n">
            <foreclosed-card></foreclosed-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="24" :sm="6" :md="6">
        <el-row>
          <el-col :span="24" class="property-block" v-for="add in adds" v-bind:data="add" v-bind:key="add.id">
            <advertisement :img="add.img"></advertisement>
          </el-col>
        </el-row>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import Advertisement from './Advertisement.vue'
import ForeclosedCard from './Foreclosed-card.vue'
export default {
  name:'foreclosure',
  data(){
    return{
      adds:[
        { id:1, img:'/static/adds/Ads1.jpg' },
        { id:2, img:'/static/adds/Ads2.jpg' },
        { id:3, img:'/static/adds/Ads3.jpg' },
        { id:4, img:'/static/adds/Ads4.jpg' },
        { id:5, img:'/static/adds/Ads5.jpg' }
      ]
    }
  },
  components: {
    ForeclosedCard, Advertisement
  }
}
</script>

<style lang="css">
</style>
