<template>
  <el-form :model="media" :rules="mediaRules" ref="media" class="">
    <el-row class="text-left">
      <h2>Description And Photos</h2><br>
      <h5>Title</h5>
      <el-col :span="24" class="input">
        <el-form-item prop="title">
          <el-input
            v-model="media.title"
            :rows="5"
            placeholder="e.g House and Lot for sale"
            @change="changeTitle">
          </el-input>
        </el-form-item>
      </el-col>
      <h5>Description</h5>
      <el-col :span="24" class="input">
        <el-form-item prop="description">
          <el-input
            class="description"
            type="textarea"
            v-model="media.description"
            :rows="5"
            placeholder="If there are important details that you want to add, you can specify it here."
            @change="changeDescription">
          </el-input>
        </el-form-item>
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
      <el-col :span="24" class="input">
        <el-button type="btn-pl-green" size="large" @click="backToPreviousStep">Back</el-button>
        <el-button type="success" class="btn-pl-green pull-right" size="large" @click="handleStep('media')">Continue</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name:'step-five',
  data(){
    return{
      media:{
        title:'',
        description:''
      },
      mediaRules:{
        description:[
          { required: true, message: 'Description is required', trigger: 'blur' },
          { min: 20, max: 2000, message: 'Description should be atleast 20 characters and max of 2000', trigger: 'blur' }
        ],
        title:[
          { required: true, message: 'Title is required', trigger: 'blur' },
        ]
      },
      dialogImageUrl: '',
      dialogVisible:false,
      youtubeUrl:'',
      fileList: [],
      list:[]
    }
  },
  methods:{
    handleStep:function(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          const fileValidation = this.checkFileBeforeUpload();

          if(fileValidation.approve === false){
            this.$message.error(fileValidation.msg);
          }else{
            this.$emit('continue')
          }

        }else{

          //console.log(valid)
        }
      });
    },
    backToPreviousStep:function(){
      this.$emit('back')
    },
    changeTitle:function(title){
      this.$emit('title', title);
    },
    changeDescription:function(desc){
      this.$emit('description', desc);
    },
    handleChange:function(file, fileList){

      const fileValidation = this.checkFileBeforeAttach(file, fileList);

      if(fileValidation.approve === false){
        this.$message.error(fileValidation.msg);
      }else{
        this.$emit('images', fileList);
        this.list = fileList;
      }

      console.log(this.list);
    },
    handleRemove: function(file, fileList){
      this.$emit('images', fileList);
      this.list = fileList;
    },
    handlePreview: function(file){
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    changeYoutubeUrl:function(url){
      this.$emit('youtubeurl', url);
    },
    checkFileBeforeAttach(file, fileList){

      var result = '';

      const validImage = [ 'image/jpeg', 'image/png' ];
      const validSize = file.raw.size / 1024 /1024 < 2;

      if(validImage.includes(file.raw.type)){//valid type
        if(!validSize){
          result =  { approve:false, msg:'Image size can not exceed 2MB'}
          fileList.splice(-1);
        }else{
          result =  { approve:true, msg:''}
        }
      }else{
        result =  { approve:false, msg:'Invalid Image Type'}
        fileList.splice(-1);
      }

      return result;

    },
    checkFileBeforeUpload(){

      var result='';

      if(Object.keys(this.list).length === 0){
        result =  { approve:false, msg:'You need to upload an images of the property'}
      }else if (Object.keys(this.list).length < 4) {
        result  = { approve:false, msg:'You need to upload at least 4 images'}
      }else if (Object.keys(this.list).length > 10) {
        result  = { approve:false, msg:'You cannot upload more than 10 images'}
      }

      return result;

    }
  }
}
</script>

<style>
  .el-upload-list li.el-upload-list__item.is-ready:first-child::before {
    display: block;
    text-align: center;
    content: "Primary Photo";
    color: #ffffff;
    background-color: #56BA50;
  }
</style>

<style scoped>
  .input{
    margin-bottom: 5px;
  }
</style>
