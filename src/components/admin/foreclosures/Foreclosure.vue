<template>
  <div>

  </div>
</template>
<script>
import Papa from 'papaparse'
// import bdo from '../../../assets/worksheets/bdo.csv'

export default {
  name: "",
  data() {
    return {

    }
  },
  mounted() {
    Papa.parse("../../../../assets/worksheets/normal.csv", {
      complete: function (results, file){
        console.log(results)
        console.log(file)
      },
      error: function (error){
        console.log(error)
      }
    })
  }
}
</script>
<style scoped>
</style>
