<template>
  <img class="img-responsive" :src="img" alt="">
</template>

<script>
export default {
  name:"advertisement",
  props:['img']
}
</script>

<style scoped>
  img{
    width: 100%;
  }
</style>
