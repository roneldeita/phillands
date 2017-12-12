<template>
  <carousel :autoplay="true" :perPageCustom="[[320, 1], [480, 2], [768, 3], [991, 5] ]">
    <slide v-for="developer in developers" :key="developer.id">
      <img :src="developer.img" alt="developer.name">
    </slide>
  </carousel>
</template>

<script>
export default {
  name: 'developers',
  data() {
    return{
      developers :[
        { id: 1, name : 'avida', img: '/static/developers/Avida.png' },
        { id: 2, name : 'vista', img: '/static/developers/Vista.png' },
        { id: 3, name : 'sm', img: '/static/developers/SM_Prime.png' },
        { id: 4, name : 'axeia', img: '/static/developers/Axeia.png' },
        { id: 5, name : 'smdc', img: '/static/developers/SMDC.png' },
        { id: 6, name : 'ayala', img: '/static/developers/Ayala_Land.png' },
        { id: 7, name : 'alveo', img: '/static/developers/Alveao.png' },
        { id: 8, name : 'rockwell', img: '/static/developers/Rockwell.png' },
      ]
    }
  }
}
</script>

<style scoped>
img{
  max-width: 120px;
  margin:5px
}
</style>
