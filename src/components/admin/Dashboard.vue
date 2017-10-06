<template lang="html">
  <div>
    <h1>Administrative Area</h1>
    <p>{{ profile.role}}</p>
  </div>
</template>

<script>
import { getProfile } from '../../assets/utils/auth.js';

export default {
  name:'admin-dashboard',
  data(){
    return{
      profile:''
    }
  },
  mounted(){
    this.profile = JSON.parse(getProfile());
  }

}
</script>

<style>
</style>
