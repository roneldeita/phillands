<template>
  <div class="text-center">
    <el-row class="upper-footer">
      <el-col :offset="2" :md="12" class="text-left">
        <h4>CONTACT US</h4>
        <br>
        <p><b>Queries</b></p>
        <p>Contact Numbers: 0906 474 2471 / 0918 401 1082 / 426-3051</p>
        <p>Email Address: info@phillands.com</p>
        <br>
        <p><b>Advertise with Us:</b></p>
        <!-- <p>Contact Numbers: 0939 113 9867 / 0905 284 6076 / 0933 669 4007 / 984-9864</p>
        <p>Email Address: marketing@phillands.com</p> -->
        <p>Contact Numbers: 0906 474 2471 / 0918 401 1082 / 426-3051</p>
        <p>Email Address: info@phillands.com</p>
        <!-- <br> -->
        <p>Unit 218 pacific Century Tower, 1472-146 Quezon Ave. Brgy. South Triangle Quezon City</p>
        <!-- <br> -->
        <p>Office Hours: Monday - Friday 8:30am - 6:30pm</p>
        <br><br>
        <h4>FEEDBACK & SUPPORT</h4>
        <p>Help us in making Phillands Realty better by sending us suggestion and feedbacks.</p>
        <el-button class="btn-email-us btn-pl-green" @click="FeedbackWasClicked()">Email Us</el-button>
      </el-col>
      <el-col :md="9" class="text-left">
        <h4>SUBSCRIBE TO OUR NEWSLETTER</h4>
        <br>
        <p>Stay up to date about Real Estate in the Philippines. Unsubscribe anytime.</p>
        <el-input class="subscribe-btn" placeholder="Enter your email address">
          <el-button type="success" class="btn-pl-green" slot="append">SUBSCRIBE</el-button>
        </el-input>
        <br><br>
        <h4>CONNECT WITH PHILLANDS</h4>
        <img src="../../assets/social/fb.png" class="social-icon" alt="">
        <img src="../../assets/social/twitter.png" class="social-icon" alt="">
        <img src="../../assets/social/linkedin.png" class="social-icon" alt="">
        <img src="../../assets/social/google_plus.png" class="social-icon" alt="">
      </el-col>
    </el-row>
    <el-row class="lower-footer">
      <el-col :md="24">
        <h6>© 2017 Phillands Real Estates. All rights reserved. Material may not be published or reproduced in any form without prior written permission. </h6>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name:'bottom-navigation',
  methods: {
    FeedbackWasClicked:function(){
      //console.log('test');
      this.$emit('feedback');
    },
  }
}
</script>
<style>
.subscribe-btn .el-input-group__append{
  background-color: #56BA50 !important;
  outline: 0 !important;
  border-color:  #56BA50 !important;
  color: #ffffff !important
}
</style>

<style scoped>
  .upper-footer{
    margin-top: 150px;
    padding: 100px 0;
    background-color: #e6e6e6;
  }
  .social-icon{
    margin-right:5px;
    width: 35px;
  }
  .lower-footer{
    padding:10px 0 5px 0;
    background-color: #ffffff;
  }
  /* .upper-footer p{
    height: 6px;
  } */
  @media (max-width : 991px){
    /* .upper-footer p{
      height: 24px;
    } */
    .upper-footer > .el-col{
      margin: 0;
      padding: 0 15px 25px 15px;
    }
  }

  .btn-email-us{
    padding-left: 30px;
    padding-right: 30px;
  }
</style>
