<template>
  <div>
    <h1>Administrative Dashboard</h1>
    <h5><li class="fa fa-wrench"></li> Ongoing development</h5>
  </div>
</template>

<script>
import { getProfile } from '../../assets/utils/auth.js';
//components
import navigation from '../template/Navigation.vue'

export default {
  name:'admin-dashboard',
  data(){
    return{
      profile:''
    }
  },
  mounted(){
    this.profile = JSON.parse(getProfile());
  },
  components:{  navigation  }

}
</script>

<style>
</style>
