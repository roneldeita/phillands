<template>
  <el-row class="text-left">
    <h2>Description And Photos</h2><br>
    <h5>Description</h5>
    <el-col :span="24" class="input">
      <el-input
        class="description"
        type="textarea"
        v-model="description"
        :rows="5"
        placeholder="If there are important details that we weren't able to ask, you can specify it here."
        @change="changeDescription"
      ></el-input>
    </el-col>
    <h5>Upload Images</h5>
    <el-col :span="24" class="input">
      <el-upload
        class="upload-images"
        action=""
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :on-change="handleChange"
        :auto-upload="false"
        list-type="picture-card"
        multiple>
        <i class="el-icon-plus"></i>
        <!-- <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
        <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div> -->
      </el-upload>
      <el-dialog v-model="dialogVisible" size="small">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog><br>
    </el-col>
    <el-col :span="24" class="input">
      <h5>Paste your YouTube video URL</h5>
      <el-input class="input" v-model="youtubeUrl" @change="changeYoutubeUrl">
        <template slot="prepend">YouTube URL</template>
      </el-input>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name:'step-one',
  data(){
    return{
      description:'',
      dialogImageUrl: '',
      dialogVisible:false,
      youtubeUrl:'',
      fileList: []
    }
  },
  methods:{
    changeDescription:function(desc){
      this.$emit('description', desc);
    },
    handleChange:function(file, fileList){
      //console.log(fileList);
      this.$emit('images', fileList);
    },
    handleRemove: function(file, fileList){
      //console.log(fileList);
      this.$emit('images', fileList);
    },
    handlePreview: function(file){
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    changeYoutubeUrl:function(url){
      this.$emit('youtubeurl', url);
    }
  }
}
</script>

<style scoped>
  .input{
    margin-bottom: 10px;
  }
  .description,
  .input,
  h5{
    max-width: 500px;
  }
</style>
