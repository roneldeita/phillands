<template>
  <div>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      size="tiny"
      @close="dialogClose"
      class="login-modal"
      >
      <el-row>
        <el-col :span="24" style="padding:30px; background:#f0f0f0">
          <img src="../../assets/PL_Logo_250px.png" style="width:60%">
        </el-col>
        <el-col :offset="2" :span="20" class="">

          <el-tabs v-model="activeAuthTab">

            <el-tab-pane label="Login" name="login">
              <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="0">
                <el-form-item label="" prop="email">
                  <el-input v-model="loginForm.email" placeholder="Email"></el-input>
                </el-form-item>
                <el-form-item label="" prop="password" style="margin-top:25px">
                  <el-input type="password" v-model="loginForm.password" placeholder="Password"></el-input>
                </el-form-item>
                <el-form-item class="text-left" style="margin-top:25px">
                  <el-button type="primary" @click="handleLogin('loginForm')">Login</el-button>
                </el-form-item>
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
                  <el-button type="primary" @click="handleRegistration('registerForm')">Register</el-button>
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
import { isLoggedIn, login, register } from '../../assets/utils/auth.js';

export default {
  name:'login-modal',
  props:['modal'],
  data(){
    return{
      dialogVisible: this.modal,
      activeAuthTab:'login',
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
      }
    }
  },
  methods:{
    dialogClose:function(){
      this.$emit('modalclose', this.dialogVisible)
    },
    handleLogin:function(formName){

        this.$refs[formName].validate((valid) => {

          if(valid){
            const self = this;

            axios.post('http://103.16.170.117:8090/login',this.loginForm)
            .then(function (response) {
              localStorage.setItem('access_token', response.data.token);
              localStorage.setItem('user', JSON.stringify(response.data.user));

              location.reload();

            })
            .catch(function (error) {
              self.$message.error('Email or Password is incorrect')

            });

          }else{
            //console.log(valid)
          }

        });
    },
    handleRegistration:function(formName){
      this.$refs[formName].validate((valid) => {

        if(valid){
          register(this.registerForm)
        }else{
          console.log(valid)
        }

      });

    }
  },
  watch:{
    modal:function(e){
      this.dialogVisible = this.modal
    }
  },
  mounted(){
    //this.dialogVisible = this.modal
  }
}
</script>

<style>
  @media (max-width: 575px) {
    .el-dialog--tiny{
      top: 0% !important;
      bottom: 0% !important;
      height: 100% !important;
      width: 100% !important;
    }
  }
</style>
