<template lang="html">
  <div class="text-center" v-loading.fullscreen.lock="verifyLoading" style="margin-top:-15px;">
    <el-row v-if="showSuccess">
      <el-col :xs="24" :offset="3" :span="18" class="form-container">
        <div class="main-nav fixed-top" style="margin-top:50px">&nbsp;</div>
        <!-- <img src="/static/success_Icon.png" style="width:100px" /> -->
        <h1><span class="pe-7s-check txt-pl-green"></span></h1>
        <h1>Account Verified</h1>
        <h5>Your acount has been confirmed. Thanks!</h5><br><br>
        <el-button type="success" class="btn-pl-green" size="large" @click="handleBtn">Continue</el-button>
      </el-col>
    </el-row>
    <el-row v-if="showError">
      <el-col :xs="24" :offset="3" :span="18" class="form-container">
        <div class="main-nav fixed-top" style="margin-top:50px">&nbsp;</div>
        <h1><span class="pe-7s-close-circle"></span></h1>
        <h1>Sorry :(</h1>
        <h5>The verification link is broken</h5><br><br>
        <el-button type="success" class="btn-pl-green"  size="large" @click="handleBtn">Continue</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name:'email-verified',
  data(){
    return{
      verifyLoading: false,
      showSuccess:false,
      showError:false
    }
  },
  methods:{
    handleBtn:function(){
      window.location.href = '/profile';
    },
    verifyEmail(){
      this.verifyLoading = true;
      const verify = {
        email:this.$route.query.email,
        key:this.$route.query.key
      }
      console.log(verify)
      const self = this;
      setTimeout(function(){
        self.axios.get(process.env.API_URL+'/verification?email='+verify.email+'&key='+verify.key).then(response => {
          //set local storage
          const accountVerified = JSON.parse(localStorage.getItem('user'));

          if(accountVerified){
            accountVerified['verified'] = 1;
            localStorage.setItem('user', JSON.stringify(accountVerified))
          }
          //show success
          self.showSuccess = true;
          self.verifyLoading = false;
        }).catch(error => {

          self.showError = true;
          self.verifyLoading = false;
        });
      }, 3000)

      //this.verifyLoading = false;
    }
  },
  mounted(){
    document.documentElement.scrollTop = 0;
    this.verifyEmail();
  }
}
</script>

<style scoped>
  .main-nav{
    position: fixed;
    background-color: #ffffff;
    box-shadow: 0 4px 2px -3px #d9d9d9;
    margin-top: 60px;
    z-index: 1;
  }
  .pe-7s-check,
  .pe-7s-close-circle {
    font-size: 120px
  }
  .btn-pl-green{
    padding-left: 50px;
    padding-right: 50px;
  }
  .form-container{
    border-top: 10px solid #13ce66;
    padding: 80px 0;
    background-color: #f5f5f5;
  }

  @media (max-width: 769px) {
    .form-container{
      margin-top: -60px;
      margin-left: 0px;
      padding: 50px 15px;
    }
  }
</style>
