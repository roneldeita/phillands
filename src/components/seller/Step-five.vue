<template>
  <div class="">
    <el-row class="text-left">
      <h2>Contacts</h2><br>
      <el-col :span="24" class="input">
        <el-input class="full-name" v-model="fullName" @change="changeFullname">
          <template slot="prepend">Full name</template>
        </el-input>
        <el-input class="email" v-model="email" @change="changeEmail">
          <template slot="prepend">Email</template>
        </el-input><br><br>
        <h5>Contact Numbers</h5>
        <el-form :inline="true" label-width="55px">
          <!-- <el-form-item label="Mobile"> -->
            <el-radio class="radio" v-model="radio" label="mobile">Mobile Phone</el-radio>
            <el-input class="mobile" type="number" placeholder="e.g. 09435949248" v-model="mobile" @change="changeMobile">
              <el-select v-model="mobileProvider" slot="prepend" @change="changeMobileProvider">
                <el-option label="+63" value="+63"></el-option>
              </el-select>
            </el-input><br>
          <!-- </el-form-item> -->
          <!-- <el-form-item label="Home" style="margin-top:-20px"> -->
          <el-radio class="radio" v-model="radio" label="home">Home Phone</el-radio>
            <el-input class="home" type="number" placeholder="e.g. 09435949248" v-model="home" @change="changeHome">
              <el-select v-model="homeProvider" slot="prepend" @change="changeHomeProvider">
                <el-option label="+63" value="+63"></el-option>
              </el-select>
            </el-input>
          <!-- </el-form-item> -->
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name:'step-one',
  data(){
    return{
      fullName:'',
      email:'',
      mobile:'',
      mobileProvider:'+63',
      home:'',
      homeProvider:'+63',
      radio:'phone'
    }
  },
  methods:{
    changeFullname:function(name){
      this.$emit('fullname', name);
    },
    changeEmail:function(email){
      this.$emit('email', email);
    },
    changeMobileProvider:function(provider){
      this.$emit('mobileprovider', provider);
    },
    changeMobile:function(number){
      this.$emit('mobile', number);
    },
    changeHomeProvider:function(provider){
      this.$emit('homeprovider', provider);
    },
    changeHome:function(number){
      this.$emit('home', number);
    },
  }
}
</script>

<style lang="css">
  .input{
    margin-bottom: 10px
  }
  .email,
  .full-name{
    max-width: 500px;
    margin-bottom: 10px;
  }
  .el-select{
    min-width: 70px;
  }
  .mobile,
  .home{
    max-width: 375px;
    margin-bottom: 10px;
  }
  .radio{
    width: 120px
  }
</style>
