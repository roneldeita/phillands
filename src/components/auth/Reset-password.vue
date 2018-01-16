<template>
  <div>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :xs="22" :span="8">
        <h1 class="text-muted text-left"><li class="fa fa-key"></li> Reset your password</h1>
        <br>
        <p class="text-left">You have requested to reset the password for: <b>{{ email }}</b></p>
        <el-form status-icon :model="resetPasswordForm" :rules="resetPasswordRules" ref="resetPasswordForm" label-width="0">
          <el-form-item label="" prop="newPassword" style="margin-top:25px">
            <el-input type="password" v-model="resetPasswordForm.newPassword" @keyup.enter.native="submitForm('resetPasswordForm')" placeholder="New password"></el-input>
          </el-form-item>
          <el-form-item label="" prop="confirmPassword" style="margin-top:25px">
            <el-input type="password" v-model="resetPasswordForm.confirmPassword" @keyup.enter.native="submitForm('resetPasswordForm')"  placeholder="Retype new password"></el-input>
          </el-form-item>
          <el-form-item class="text-left">
            <el-button type="success" class="btn-pl-green" @click="submitForm('resetPasswordForm')">Reset my password</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'ResetPassword',
  data(){
    var validateNewPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input your new password.'));
      } else if (value.length < 5) {
        callback(new Error('Password must be atleast 6 characters long.'));
      }else{
        callback();
      }
    };
    var validateConfirmPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please retype your new password.'));
      } else if (value !== this.resetPasswordForm.newPassword) {
        callback(new Error('Make sure your passwords match.'));
      }else{
        callback();
      }
    };
    return {
      resetPasswordForm:{
        newPassword:'',
        confirmPassword:''
      },
      resetPasswordRules:{
        newPassword:[
          { validator: validateNewPass, trigger: 'blur'}
        ],
        confirmPassword:[
          { validator: validateConfirmPass, trigger: 'blur'}
        ]
      },
      email: '',
      key: ''
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const formData = {
            password: this.resetPasswordForm.newPassword,
            email: this.email,
            key: this.key
          }
          this.axios.post(process.env.API_URL+'/forgot_password/reset', formData)
          .then(response =>{
            console.log(response.data)
            if(response.data.message === 'Success'){
              this.$store.dispatch('toggleLoginModal');
              this.resetPasswordForm.newPassword = '';
              this.resetPasswordForm.confirmPassword = '';
              setTimeout(() => {
                this.$message({showClose: true, duration: 0, type: 'success', message: 'Success! Your password has been changed.'});
              }, 1000);
            }
          }).catch(error =>{
            this.$message.error('This request has been expired.');
            console.log(error.response)
          })
        } else {
          return false;
        }
      });
    }
  },
  created(){
    this.email = this.$route.query.email;
    this.key = this.$route.query.key
  }
}
</script>
<style scoped>
</style>
