<template>
  <div>
    <div class="text-right">
      <h4 class="pull-left txt-pl-green">Key Information</h4>
      <el-button v-if="!keyInfoEdit" @click="keyInfoEdit = true" icon="edit">Edit</el-button>
      <el-button type="success" class="btn-pl-green" v-if="keyInfoEdit" @click="saveKeyInfo">Save</el-button>
      <el-button v-if="keyInfoEdit" @click="keyInfoEdit = false; cancelkeyInfoEdit()">Cancel</el-button>
    </div>
    <el-row v-if="!keyInfoEdit">
      <el-col :sm="12" :md="8" :lg="6">
        <p class="label">Offer Type</p>
        <p>{{ keyInfoForm.offer_type === '1' ? 'For Sale' : 'For rent' }}</p>
      </el-col>
      <el-col :sm="12" :md="8" :lg="18">
        <p class="label">Property type</p>
        <p>{{ propertyType(keyInfoForm.property_type) }}</p>
      </el-col>
      <el-col :sm="12" :md="8" :lg="24">
        <p class="label">Price</p>
        <p>&#8369; {{ formatNumber(keyInfoForm.price) }}
          <span style="color:#cccccc" v-if="keyInfoForm.offer_type === '2' && keyInfoForm.price_option === '1'">/mo.</span>
          <span style="color:#cccccc" v-if="keyInfoForm.offer_type === '2' && keyInfoForm.price_option === '4'">/day</span>
        </p>
      </el-col>
    </el-row>
    <el-form v-if="keyInfoEdit" :model="keyInfoForm" :rules="keyInfoRules" ref="keyInfoForm" label-width="0" class="form">
      <el-col :sm="12" :md="8" :lg="6">
        <el-form-item style="display:inline-block" label="" prop="offer_type">
          <p class="label"><span class="required">*</span>Offer Type</p>
          <el-select v-model="keyInfoForm.offer_type" placeholder="Select" @change="changeOfferType">
            <el-option label="For Sale" value="1"></el-option>
            <el-option label="For Rent" value="2"></el-option>
            <el-option label="Foreclosure" value="4"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :sm="12" :md="8" :lg="18">
        <el-form-item style="display:inline-block" label="" prop="property_type">
          <p class="label"><span class="required">*</span>Property type</p>
          <el-select v-model="keyInfoForm.property_type" placeholder="Select">
            <el-option label="Condominium" value="1"></el-option>
            <el-option label="House and Lot" value="2"></el-option>
            <el-option label="Townhouse" value="3"></el-option>
            <el-option label="Commercial Lot" value="4"></el-option>
            <el-option label="Vacant Lot" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :sm="12" :md="8" :lg="24">
        <el-form-item style="display:inline-block;" prop="price" class="">
          <p class="label"><span class="required">*</span>{{ keyInfoForm.offer_type ==="2" ? 'Rental Fee' : 'Selling Price'}}</p>
          <el-input type="number" placeholder="Enter the amount" v-model="keyInfoForm.price">
            <template slot="prepend">₱</template>
            <!-- <template v-if="keyInfoForm.offer_type === '2'" slot="append">Monthly</template> -->
            <el-select v-if="keyInfoForm.offer_type === '2'" v-model="keyInfoForm.price_option" slot="append" placeholder="Select" style="width:96px">
              <el-option label="Monthly" value="1"></el-option>
              <el-option label="Daily" value="4"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
      </el-col>
    </el-form>
    <!-- {{ keyInfoForm }} -->
  </div>
</template>

<script>
//dependency
import axios from 'axios';
//api
import { getProperty } from '../../../assets/utils/properties-api.js'
import { getIdToken } from '../../../assets/utils/auth.js'

export default {
  name:'edit-keyinfo',
  data(){
    return{
      keyInfoEdit:false,
      keyInfoForm:{
        offer_type:'',
        property_type:'',
        price:'',
        price_option:'',
      },
      keyInfoRules:{
        price:[
          { required: true, message: 'Price is required', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    formatNumber: function(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  	},
    propertyType:function(propertyType){
      var type='';
      switch(propertyType){
        case '1':
          type = 'Condominium';
          break;
        case '2':
          type = 'House and Lot';
          break;
        case '3':
          type = 'Townhouse';
          break;
        case '4':
          type = 'Commercial Lot';
          break;
        case '5':
          type = 'Vacant Lot';
      }
      return type;
    },
    changeOfferType:function(type){
      if(parseInt(type) === 2){
        this.keyInfoForm.price_option = '1';
      }else{
        this.keyInfoForm.price_option = '0';
      }
    },
    cancelkeyInfoEdit:function(){
      getProperty(this.property_no).then((property) =>{
        this.keyInfoForm.offer_type = property.offer_type.toString();
        this.keyInfoForm.property_type = property.property_type.toString();
        this.keyInfoForm.price = property.price;
        this.keyInfoForm.price_option = property.price_option.toString();
      });
    },
    getProperty:function(property_no){
      getProperty(property_no).then((property) =>{
          this.property_id = property.id;
          this.property_no = property.property_no;
          //key info
          this.keyInfoForm.offer_type = property.offer_type.toString();
          this.keyInfoForm.property_type = property.property_type.toString();
          this.keyInfoForm.price_option = property.price_option.toString();
          this.keyInfoForm.price = property.price;
      });
    },
    saveKeyInfo:function(){
      const self = this;
      var keyInfo = {
        id : this.property_id,
        edit: 'offer',
        offer_type: this.keyInfoForm.offer_type,
        property_type : this.keyInfoForm.property_type,
        price: this.keyInfoForm.price,
        price_option: this.keyInfoForm.price_option
      }
      this.$refs.keyInfoForm.validate((valid) => {
        if(valid){
          axios.defaults.headers.common['token'] = getIdToken();
          return axios.post(process.env.API_URL+'/broker/property/update', keyInfo)
          .then(function(response){
            console.log(response)
            if(response.data.message === "Success"){
              self.keyInfoEdit = false;
              self.$message({
                message: 'The information was successfully updated',
                type: 'success'
              });
            };
          }).catch(function(error){
            //console.log(error)
          });
        }
      });
    },
    cancelBasicEdit:function(){
      getProperty(this.property_no).then((property) =>{
        this.keyInfoForm.offer_type = property.offer_type.toString();
        this.keyInfoForm.property_type = property.property_type.toString();
        this.keyInfoForm.price = property.price;
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
</style>
