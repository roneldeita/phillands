<template>
  <div v-loading.fullscreen="fullScreenLoading" :element-loading-text="'Uploading your files, Please wait...' + uploadprogress +'%'">
    <el-form :model="contact" :rules="contactRules" ref="contact">
      <el-row class="text-left">
        <h2>Contacts</h2><br>
        <el-col :span="24" class="input">
          <el-form-item prop="fullName" style="margin-bottom:25px">
            <el-input v-model="contact.fullName" @change="changeFullname">
              <template slot="prepend">Full name</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="contact.email" @change="changeEmail">
              <template slot="prepend">Email</template>
            </el-input>
          </el-form-item><br><br>
          <h5>Contact Number</h5>
          <el-form-item label="" prop="radio">
            <el-radio-group v-model="contact.radio" @change="changeRadio" style="margin-bottom:-30px">
              <el-radio label="mobile"></el-radio>
              <el-radio label="home"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="number">
            <el-input class="mobile" type="number" placeholder="e.g. 9435949248" v-model="contact.number" @change="changeNumber">
              <el-select v-model="contact.provider" slot="prepend">
                <el-option label="+63" value="+63"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <br />
          <!-- <el-form :inline="true" label-width="55px"> -->
            <!-- <el-form-item label="" prop="radio">
              <el-radio-group v-model="contact.radio">
                <div style="margin-bottom:10px">
                  <el-radio label="mobile" style="width:80px"></el-radio>
                    <el-input class="mobile" type="number" placeholder="e.g. 9435949248" v-model="contact.mobile" @change="changeMobile" :disabled="contact.radio != 'mobile'">
                      <el-select v-model="mobileProvider" slot="prepend" @change="changeMobileProvider" :disabled="contact.radio != 'mobile'">
                        <el-option label="+63" value="+63"></el-option>
                      </el-select>
                    </el-input>
                </div>
                <div>
                  <el-radio label="home" style="width:80px"></el-radio>
                  <el-input class="home" type="number" placeholder="e.g. 9435949248" v-model="contact.home" @change="changeHome" :disabled="contact.radio != 'home'">
                    <el-select v-model="homeProvider" slot="prepend" @change="changeHomeProvider" :disabled="contact.radio != 'home'">
                      <el-option label="+63" value="+63"></el-option>
                    </el-select>
                  </el-input>
                </div>
              </el-radio-group>
            </el-form-item> -->
        </el-col>
        <el-col :span="24" class="input">
          <el-button type="btn-pl-green" size="large" @click="backToPreviousStep">Back</el-button>
          <el-button type="success" class="btn-pl-green pull-right" size="large" @click="handleStep('contact')" :disabled="finishButton" :loading="finishButton">{{ finishButton ? "Finishing" : 'Finish'}}</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name:'step-six',
  props:['uploadprogress'],
  data(){
    return{
      fullScreenLoading:false,
      finishButton:false,
      contact:{
        fullName:'',
        email:'',
        radio:'mobile',
        provider:'+63',
        number:'',
        mobile:'',
        home:'',
      },
      contactRules:{
        fullName:[
          { required: true, message: 'Description is required', trigger: 'blur' },
        ],
        email:[
          { required: true, message: 'Please input email', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],
        radio:[
          { required: true, message: 'Select one', trigger: 'change' }
        ],
        number:[
          { required: true, message: 'Your contact number is required', trigger: 'blur' },
        ]
      },
      mobileProvider:'+63',
      homeProvider:'+63',
    }
  },
  methods:{
    handleStep:function(formName){
      this.finishButton = true;
      this.fullScreenLoading = true;
      this.$refs[formName].validate((valid) => {
        if(valid){
          this.$emit('finish')
        }else{
          //console.log(valid)
          this.finishButton = false;
          this.fullScreenLoading = false;
        }
      });
    },
    backToPreviousStep:function(){
      this.$emit('back')
    },
    changeFullname:function(name){
      this.$emit('fullname', name);
    },
    changeEmail:function(email){
      this.$emit('email', email);
    },
    changeRadio:function(type){
      if(type === 'mobile'){
        this.$emit('home', '');
        this.$emit('mobile', this.contact.number);
      }else{
        this.$emit('mobile', '');
        this.$emit('home', this.contact.number);
      }
    },
    changeNumber:function(number){
      if(this.contact.radio === 'mobile'){
        this.$emit('mobile', number);
      }else{
        this.$emit('home', number);
      }
    },
    // changeMobileProvider:function(provider){
    //   this.$emit('mobileprovider', provider);
    // },
    // changeMobile:function(number){
    //   this.$emit('mobile', number);
    // },
    // changeHomeProvider:function(provider){
    //   this.$emit('homeprovider', provider);
    // },
    // changeHome:function(number){
    //   this.$emit('home', number);
    // },
  }
}
</script>

<style lang="css">
  .input{
    margin-bottom: 10px
  }
  .el-select{
    min-width: 70px;
  }
  .mobile,
  .home{
    width: 375px !important;
  }
  .radio{
    width: 120px
  }
  @media (max-width: 575px){
    .mobile,
    .home{
        width:  100% !important;
      }
  }
</style>
