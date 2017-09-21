<template>

</template>

<script>

export default {
  name:'callback',
  mounted(){
    this.$nextTick(() => {
      window.location.href = '/';
    });
  }
}
</script>

<style lang="css">
</style>
