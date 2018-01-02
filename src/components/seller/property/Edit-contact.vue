<template>
  <div>
    <div class="text-right">
      <h4 class="pull-left txt-pl-green">Contact Details</h4>
      <el-button v-if="!contactEdit" @click="contactEdit = true" icon="edit">Edit</el-button>
      <el-button type="success" class="btn-pl-green" v-if="contactEdit"  @click="saveContact">Save</el-button>
      <el-button v-if="contactEdit" @click="contactEdit = false; cancelContactEdit(property_no)">Cancel</el-button>
    </div>
    <el-row v-if="!contactEdit">
      <el-col :sm="12" :md="8" :lg="6">
        <p class="label">Full name</p>
        <p>{{ contactForm.full_name }}</p>
      </el-col>
      <el-col :sm="12" :md="8" :lg="18">
        <p class="label">Mobile Number</p>
        <p>{{ contactForm.mobile_ccc }} {{ contactForm.mobile }}</p>
      </el-col>
      <el-col :sm="12" :md="8" :lg="6">
        <p class="label">Email</p>
        <p>{{ contactForm.email }}</p>
      </el-col>
      <el-col :sm="12" :md="8" :lg="18">
        <p class="label">Home Number</p>
        <p>{{ contactForm.home_ccc }} {{ contactForm.home }}</p>
      </el-col>
    </el-row>
    <el-form v-if="contactEdit" :model="contactForm" :rules="contactRules" ref="contactForm" label-width="0" class="form">
      <el-col :sm="12" :md="8" :lg="6">
        <el-form-item style="display:inline-block" label="" prop="full_name">
          <p class="label"><span class="required">*</span>Full name</p>
          <el-input v-model="contactForm.full_name" class="inputContact"></el-input>
        </el-form-item>
      </el-col>
      <el-col :sm="12" :md="8" :lg="18">
        <el-form-item style="display:inline-block" label="" prop="mobile">
          <p class="label"><span class="required">*</span>Mobile Number</p>
          <el-input class="inputContact" type="number" v-model="contactForm.mobile">
            <el-select v-model="contactForm.mobile_ccc" slot="prepend" style="width:70px">
              <el-option label="+63" value="+63"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :sm="12" :md="8" :lg="6">
        <el-form-item style="display:inline-block" label="" prop="email">
          <p class="label"><span class="required">*</span>Email</p>
          <el-input v-model="contactForm.email" class="inputContact"></el-input>
        </el-form-item>
      </el-col>
      <el-col :sm="12" :md="8" :lg="18">
        <el-form-item style="display:inline-block" label="" prop="home">
          <p class="label"><span class="required">*</span>Home Number</p>
          <el-input class="inputContact" type="number" v-model="contactForm.home">
            <el-select v-model="contactForm.home_ccc" slot="prepend" style="width:70px">
              <el-option label="+63" value="+63"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script>
//api
import { getProperty } from '../../../assets/utils/properties-api.js'

export default {
  name:'edit-contact',
  computed: {
    token:  function () {
      return this.$store.getters.phillandsIdToken
    }
  },
  data(){
    return{
      contactEdit:false,
      contactForm:{
        full_name:'',
        email:'',
        home_ccc:'',
        home:'',
        mobile_ccc:'',
        mobile:''
      },
      contactRules:{
        full_name:[
          { required: true, message: 'Full name is required', trigger: 'blur' }
        ],
        email:[
          { required: true, message: 'Email is required', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],
        mobile:[
          // { required: true, message: 'Your contact number is required', trigger: 'blur' },
        ]
      }
    }
  },
  methods:{
    getProperty:function(property_no){
      getProperty(property_no).then((property) =>{
          this.property_id = property.id;
          this.property_no = property.property_no;
          //contact info
          this.contactForm.full_name = property.property_contact.full_name;
          this.contactForm.email = property.property_contact.email;
          this.contactForm.home_ccc = property.property_contact.home_ccc;
          this.contactForm.home = property.property_contact.home;
          this.contactForm.mobile_ccc = property.property_contact.mobile_ccc;
          this.contactForm.mobile = property.property_contact.mobile;
      });
    },
    saveContact:function(){
      var contacts = {
        id : this.property_id,
        edit: 'contacts',
        full_name: this.contactForm.full_name,
        email: this.contactForm.email,
        home_ccc: this.contactForm.home_ccc,
        home: this.contactForm.home,
        mobile_ccc: this.contactForm.mobile_ccc,
        mobile: this.contactForm.mobile
      }
      this.$refs.contactForm.validate((valid) => {
        if(valid){
          console.log(contacts)
          this.axios.defaults.headers.common['token'] = this.token;
          return this.axios.post(process.env.API_URL+'/broker/property/update', contacts)
          .then(response => {
            if(response.data.message === "Success"){
              this.contactEdit = false;
              this.$message({
                message: 'The information was successfully updated',
                type: 'success'
              });
            };
          }).catch( error => {
            //console.log(error)
          });
        }
      });
    },
    cancelContactEdit:function(){
      getProperty(this.property_no).then( property => {
        this.contactForm.full_name = property.property_contact.full_name;
        this.contactForm.email = property.property_contact.email;
        this.contactForm.home_ccc = property.property_contact.home_ccc;
        this.contactForm.home = property.property_contact.home;
        this.contactForm.mobile_ccc = property.property_contact.mobile_ccc;
        this.contactForm.mobile = property.property_contact.mobile;
      });
    }
  },
  mounted(){
    this.getProperty(this.$route.params.property_no);
  }
}
</script>

<style scoped>
  .label{
    color: #999999;
    font-size: 14px;
    padding-top: 0px;
    margin-bottom: 5px;;
  }
  .required{
    color:#ff4949;
    margin-right:4px
  }
  .inputContact{
    width: 220px !important;
  }
  .inputNumber{
    width:120px !important;
  }
</style>
