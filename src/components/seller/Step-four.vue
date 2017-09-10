<template>
  <el-row class="text-left">
    <h2>Description And Photos</h2><br>
    <h5>
      <small>If there are important details that we weren't able to ask, you can specify it here.</small><br>
      <small>Please note: links and contact info entered will be removed.</small>
    </h5>
    <el-col :span="24">
      <el-input class="description" type="textarea" v-model="description" :rows="5"></el-input>
    </el-col>
    <h5>Upload Images</h5>
    <el-col :span="24" class="input">
      <el-upload
        class="upload-demo"
        action=""
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :on-change="handleChange"
        list-type="picture-card"
        multiple>
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name:'step-one',
  data(){
    return{
      description:'',
      fileList: [
        {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
        {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
      ]
    }
  },
  methods:{
    handleChange:function(file, fileList){
      console.log(file);
      console.log(fileList);
    },
    handleRemove: function(){

    },
    handlePreview: function(){

    }
  }
}
</script>

<style scoped>
  .description{
   max-width: 600px;
}
</style>
