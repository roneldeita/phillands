<template>
  <div>
    <el-dialog
      title="Suggestions and Feedbacks"
      :visible.sync="feedbackVisible"
      size="tiny"
      @close="toggleFeedbackModal"
      class="feedback-container"
      >
      <div class="feedback-form-container">
        <el-form :model="feedbackForm" :rules="feedbackRules" ref="feedbackForm">
          <el-form-item label="" prop="full_name">
            <el-input placeholder="Full name" v-model="feedbackForm.full_name"></el-input>
          </el-form-item>
          <el-form-item label="" prop="email">
            <el-input placeholder="Email" v-model="feedbackForm.email"></el-input>
          </el-form-item>
          <el-form-item label="" prop="message">
            <el-input type="textarea" placeholder="Message" :rows="5" v-model="feedbackForm.message"></el-input>
          </el-form-item>
          <el-form-item style="margin-bottom:5px">
            <el-button type="success" class="btn-pl-green" @click="handleFeedback('feedbackForm')">Submit</el-button>
          </el-form-item style="margin-bottom:5px">
          <!-- <el-form-item>
            <el-button @click="dialogClose">Cancel</el-button>
          </el-form-item> -->
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'feedback-modal',
  props: ['feedbackmodal'],
  data(){
    return{
      feedbackVisible: this.feedbackmodal,
      feedbackForm:{
        full_name:'',
        email:'',
        message:''
      },
      feedbackRules:{
        full_name: [
          { required: true, message: 'Please input your full name', trigger: 'blur' },
        ],
        email: [
          { required: true, message: 'Please input email', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],
        message: [
          { required: true, message: 'Please input your full name', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    handleFeedback:function(formName){
      this.$refs[formName].validate((valid) => {

        if(valid){
          axios.post(process.env.API_URL+'/feedback', this.feedbackForm)
          .then( response => {
            if(response.data.message === 'Success'){
              this.$alert('Your comment has been successfully submitted', 'Feedback Sent', {
                confirmButtonText: 'OK',
                type:'success'
              });
              this.clearInputs();
              this.dialogClose();
            }
          }).catch( error =>{
            console.log(error)
          })

        }else{
          //console.log(valid)
        }
      });
    },
    toggleFeedbackModal () {
      this.$store.dispatch('toggleFeedbackModal')
    },
    clearInputs(){
      this.feedbackForm.full_name ='';
      this.feedbackForm.email = '';
      this.feedbackForm.message ='';
    }
  },
  watch:{
    feedbackmodal:function(e){
      this.feedbackVisible = this.feedbackmodal
    }
  }
}
</script>
<style>
.feedback-container .el-dialog .el-dialog__header{
  background-color: #13ce66;
  color: #ffffff;
  padding:10px 0 !important;
}
.feedback-container .el-dialog .el-dialog__header .el-dialog__title{
  color: #ffffff;
  font-size: 20px;
}
.feedback-container .el-dialog .el-dialog__header .el-dialog__headerbtn{
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  outline: none !important;
}
.feedback-container .el-dialog .el-dialog__header .el-dialog__headerbtn .el-icon{
  color:#ffffff !important
}
</style>

<style scoped>
  .feedback-form-container{
    padding: 25px 25px 15px 25px;
    background-color: #f2f2f2
  }

  .feedback-form-container .el-button{
    width: 100%
  }

</style>
