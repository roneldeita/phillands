<template>
  <el-card class="box-card text-left">
    <div slot="header">
      <p>{{ name }}</p>
    </div>
    <div class="text item">
      <el-button>Edit Listing</el-button>
      <el-button type="success">Preview</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  name:'property-card',
  props:['name']
}
</script>
<style>
  .el-card__header{
    padding: 15px 20px 0px 20px !important;
    background-color: #f0f0f0;
  }
</style>

<style scoped>
  .el-card{
    box-shadow: 0px 0px 0px 0px !important;
    border-radius: 2px !important;
    margin-bottom: 20px;
  }
</style>
