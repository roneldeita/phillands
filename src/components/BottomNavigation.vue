<template>
  <div class="text-center">
    <el-row class="upper-footer">
      <el-col :offset="2" :md="12" class="text-left">
        <h4>CONTACT US</h4>
        <br>
        <p><b>Queries</b></p>
        <p>Contact Numbers: 0936 457 7814 / 0923 535 7157 / 426 3051</p>
        <p>Email Address: joann.sequitin@phillands.com</p>
        <br>
        <p><b>Advertise with Us:</b></p>
        <p>Contact Numbers: 0936 457 7814 / 0923 535 7157 / 426 3051</p>
        <p>Email Address: marketing@phillands.com</p>
        <br>
        <p>Unit 218 pacific Century Tower, 1472-146 Quezon Ave. Brgy. South Triangle Quezon City</p><br>
        <p>Office Hours: Monday - Friday 8:30am - 6:30pm</p>
      </el-col>
      <el-col :md="9" class="text-left">
        <h4>SUBSCRIBE TO OUR NEWSLETTER</h4>
        <br>
        <p>Stay up to date about Real Estate in the Philippines. Unsubscribe anytime.</p>
        <el-input placeholder="Enter your email address" style="margin-top:10px">
          <el-button type="success" slot="append">SUBSCRIBE</el-button>
        </el-input>
        <br><br>
        <h4>CONNECT WITH PHILLANDS</h4>
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
  name:'bottom-navigation'
}
</script>

<style scoped>
  .upper-footer{
    margin-top: 150px;
    padding: 100px 0;
    background-color: #e6e6e6;
  }
  .lower-footer{
    padding:10px 0 5px 0;
    background-color: #ffffff;
  }
  .upper-footer p{
    height: 6px;
  }
  @media (max-width : 991px){
    .upper-footer p{
      height: 24px;
    }
    .upper-footer > .el-col{
      margin: 0;
      padding: 0 15px 25px 15px;
    }
  }

</style>
