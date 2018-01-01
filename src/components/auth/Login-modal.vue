<template>
  <div>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      size="tiny"
      @close="toggleLoginModal"
      class="login-modal"
      >
      <el-row>
        <el-col :span="24" style="padding:30px; background:#f0f0f0">
          <img src="../../assets/PL_Logo_250px.png" style="width:60%">
        </el-col>
        <el-col :offset="2" :span="20" class="">

          <el-tabs v-show="!forgetPassword" v-model="activeAuthTab">
            <el-tab-pane label="Login" name="login">
              <div class="" style="padding:5px 0 10px 0">
                <el-button type="default" @click="authenticate('google')" style="width:100%" disabled><span class="fa fa-google"></span> Login with google</el-button>
              </div>
              <div class="" style="padding:5px 0 10px 0">
                <el-button type="info" @click="authenticate('facebook')" style="width:100%" disabled><span class="fa fa-facebook-official"></span> Login with facebook</el-button>
              </div>
              <p>or</p>
              <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="0">
                <el-form-item label="" prop="email">
                  <el-input v-model="loginForm.email" placeholder="Email" @keyup.enter.native="handleLogin('loginForm')"></el-input>
                </el-form-item>
                <el-form-item label="" prop="password" style="margin-top:25px">
                  <el-input :type="password.type" v-model="loginForm.password" placeholder="Password" :on-icon-click="handleViewPassword" @keyup.enter.native="handleLogin('loginForm')">
                  </el-input>
                  <span :class="password.class" id="show-password" @click="handleViewPassword"></span>
                </el-form-item>
                <el-form-item class="text-left" style="margin-top:25px">
                  <el-button type="success" class="btn-pl-green" @click="handleLogin('loginForm')">Login</el-button>
                </el-form-item>
                <el-button type="text" @click="forgetPassword = true"> Forgot your password?</el-button>
              </el-form>
            </el-tab-pane>

            <el-tab-pane label="Register" name="register">
              <el-form :model="registerForm" :rules="registerRules" ref="registerForm" label-width="0">
                <el-form-item label="" prop="first_name" style="margin-bottom:22px">
                  <el-input v-model="registerForm.first_name" placeholder="Your first name"></el-input>
                </el-form-item>
                <el-form-item label="" prop="last_name" style="margin-bottom:22px">
                  <el-input v-model="registerForm.last_name" placeholder="Your last name"></el-input>
                </el-form-item>
                <el-form-item label="" prop="contact" style="margin-bottom:22px">
                  <el-input type="number" v-model="registerForm.contact" placeholder="Your Contact Number"></el-input>
                </el-form-item>
                <el-form-item label="" prop="email" style="margin-bottom:22px">
                  <el-input v-model="registerForm.email" placeholder="Email Address"></el-input>
                </el-form-item>
                <el-form-item label="" prop="password" style="margin-bottom:25px">
                  <el-input type="password" v-model="registerForm.password" placeholder="Password"></el-input>
                </el-form-item>
                <el-form-item class="text-left">
                  <el-button type="success" class="btn-pl-green" @click="handleRegistration('registerForm')">Register</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>

          </el-tabs>

          <el-tabs v-show="forgetPassword">
            <el-tab-pane label="Reset Password">
              <p class="text-left">Enter the email address associated with your account, and we’ll email you a link to reset your password.</p>
              <el-form :model="resetPasswordForm" :rules="resetPasswordRules" ref="resetPasswordForm" label-width="0">
                <el-form-item label="" prop="email" style="margin-bottom:22px">
                  <el-input v-model="resetPasswordForm.email" placeholder="Email Address"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button class="pull-left" type="text" @click="forgetPassword = false"><span class="el-icon-arrow-left"></span> Back to Login</el-button>
                  <el-button type="success" class="btn-pl-green pull-right" @click="handleResendPassword('resetPasswordForm')">Send Reset Link</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>

        </el-col>
      </el-row>
      <br>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import { isLoggedIn, login, register, getAccess } from '../../assets/utils/auth.js';

export default {
  name:'login-modal',
  props:['loginmodal'],
  data(){
    return{
      dialogVisible: this.loginmodal,
      activeAuthTab:'login',
      forgetPassword:false,
      password:{
        type:'password',
        class:'fa fa-eye'
      },
      loginForm:{
        email:'',
        password:''
      },
      registerForm:{
        first_name:'',
        last_name:'',
        contact:'',
        email:'',
        password:''
      },
      resetPasswordForm:{
        email:''
      },
      loginRules:{
        email: [
          { required: true, message: 'Please input email', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please input password', trigger: 'blur' }
        ]
      },
      registerRules:{
        first_name: [
          { required: true, message: 'Please input your first name', trigger: 'blur' },
          { type: 'string', message: 'Must be letters', trigger: 'blur' }
        ],
        last_name:[
          { required: true, message: 'Please input your first name', trigger: 'blur' },
          { type: 'string', message: 'Must be letters', trigger: 'blur' }
        ],
        contact:[
          { required: true, message: 'Please input your contact number', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please input email', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please input password', trigger: 'blur' }
        ]
      },
      resetPasswordRules:{
        email: [
          { required: true, message: 'Please input email', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    toggleLoginModal () {
      this.$store.dispatch('toggleLoginModal')
    },
    dialogClose:function(){
      this.$emit('loginmodalclose', this.dialogVisible);
      //this.$router.replace({name:'index'});
    },
    authenticate: function (provider) {
      this.$auth.authenticate(provider).then(function (authResponse) {
        console.log(authResponse);
        // Execute application logic after successful social authentication
      })
    },
    handleLogin:function(formName){
      this.$refs[formName].validate((valid) => {

        if(valid){

          this.doLogin(this.loginForm);

        }else{
          //console.log(valid)
        }

      });
    },
    handleRegistration:function(formName){

      this.$refs[formName].validate((valid) => {

        if(valid){
          axios.post(process.env.API_URL+'/register', this.registerForm)
          .then(response => {
            this.doLogin({email:this.registerForm.email, password:this.registerForm.password});
          })
          .catch(error => {
            this.$message.error(error.response.data.message)
          });

        }else{
          //
        }

      });

    },
    doLogin:function(formData){
      axios.post(process.env.API_URL+'/login',formData)
      .then(response => {
        localStorage.setItem('access_token', response.data.token);
        var userInfo = JSON.stringify(response.data.user);
        localStorage.setItem('user', userInfo);
        getAccess()
        .then(response =>{
          if(response.role === 2){
            window.location  = '/admin'
          }else{
            if(this.$route.query.redirect !=''){
              this.$router.replace({path:this.$route.query.redirect});
              location.reload();
            }else{
              location.reload();
            }
          }
        });
      })
      .catch(error => {
        this.$message.error('Email or Password is incorrect')
      });
    },
    resetPasswordWasClick:function(){
      this.$emit('resetpassword');
    },
    handleResendPassword:function(formName){
      this.$refs[formName].validate((valid) => {

        if(valid){
          axios.post(process.env.API_URL+'/forgot_password/request_key', this.resetPasswordForm)
          .then(response => {
            this.$message.success('We have sent you an email with reset instruction.');
            this.resetPasswordForm.email = '';
          }).catch(error => {
            this.$message.error(error.response.data.message)
          });
        }else{

        }

      });
    },
    handleViewPassword: function(){
      if(this.password.type === 'password'){
        this.password.type ='text';
        this.password.class ='fa fa-eye-slash'
      }else{
        this.password.type ='password';
        this.password.class ='fa fa-eye'
      }
    }
  },
  watch:{
    loginmodal:function(e){
      this.dialogVisible = this.loginmodal
    }
  },
  mounted(){
    //this.dialogVisible = this.modal
  },
  created() {
  },
}
</script>

<style>
  .login-modal .el-dialog .el-dialog__header .el-dialog__headerbtn{
    outline: none !important;
  }
  #show-password{
    position: absolute !important;
    top:10px !important;
    right: 10px!important;
    cursor: pointer !important;
    color: #a6a6a6 !important;
  }
  @media (max-width: 768px) {
    .el-dialog--tiny{
      top: 0% !important;
      bottom: 0% !important;
      min-height: 600px !important;
      height: 100% !important;
      width: 100% !important;
    }
  }
</style>
