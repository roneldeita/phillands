<template>
  <div>
    <br>
    <br>
    <p class="four-o-four text-muted">404</p>
    <p>PAGE NOT FOUND</p>
    <router-link class="btn btn-success" :to="{ name: 'sale'}">Search propery</router-link><br>
    <router-link class="btn" :to="{ name: 'rent' }">Rent a propery</router-link><br>
    <router-link class="btn" :to="{ name: 'pre-selling' }">Pre-selling</router-link><br>

  </div>
</template>

<script>
export default {
  name:"not-found"
}
</script>

<style lang="css">
  .four-o-four{
    font-size: 100px;
    line-height: 60px
  }
</style>
