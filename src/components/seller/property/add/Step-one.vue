<template>
  <el-row class="text-left">
    <h2>Key Information</h2><br>
    <el-col :span="24" class="input">
      <el-form :model="keyInfo" :rules="keyInfoRules" ref="keyInfo" :inline="true" class="demo-form-inline">
        <el-form-item style="display:inline-block;" prop="offerType" class="offerType">
          <h5>Offer type</h5>
          <el-select v-model="keyInfo.offerType" placeholder="Select" size="large" @change="changeOfferType">
            <el-option label="For Sale" value="1"></el-option>
            <el-option label="For Rent" value="2"></el-option>
            <el-option label="Pre-selling" value="3"></el-option>
            <el-option label="Foreclosure" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="display:inline-block" prop="propertyType" class="">
          <h5>Property type</h5>
          <el-select v-model="keyInfo.propertyType" placeholder="Select" size="large" @change="changePropertyType">
            <el-option v-if="keyInfo.offerType === '1'"
              v-for="type in keyInfo.ForSalePropertyTypes"
              :key="type.id"
              :label="type.label"
              :value="type.value"></el-option>
            <el-option v-if="keyInfo.offerType != '4' && keyInfo.offerType != '1'"
              v-for="type in keyInfo.propertyTypes"
              :key="type.id"
              :label="type.label"
              :value="type.value"></el-option>
            <el-option v-if="keyInfo.offerType === '4'"
              v-for="type in keyInfo.ForeclosurePropertyTypes"
              :key="type.id"
              :label="type.label"
              :value="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="display:inline-block;" prop="sellingPrice" class="">
          <h5>{{ keyInfo.offerType ==="2" ? 'Rental Fee' : 'Selling Price'}}</h5>
          <el-input type="number" placeholder="Enter the amount" size="large" v-model="keyInfo.sellingPrice" @change="changeSellingPrice">
            <template slot="prepend">₱</template>
            <!-- <template v-if="keyInfo.offerType === '2'" slot="append">Monthly</template> -->
            <el-select v-if="keyInfo.offerType === '2'" v-model="keyInfo.priceOption" @change="changePriceOption" slot="append" placeholder="Select" style="width:105px">
              <el-option label="Monthly" value="1"></el-option>
              <el-option label="Daily" value="4"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
      </el-form><br>
      <el-button type="success" class="btn-pl-green"  size="large" @click="handleStep('keyInfo')">Continue</el-button>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name:'step-one',
  data(){
    return{
      keyInfo:{
        offerType:'1',
        propertyType:'Condominium',
        sellingPrice:0,
        priceOption:'1',
        ForSalePropertyTypes: [{
            id:1,
            value: 1,
            label: 'Condominium'
          },{
            id:2,
            value: 2,
            label: 'House and Lot'
          },{
            id:3,
            value: 3,
            label: 'Townhouse'
          },{
            id:4,
            value: 6,
            label: 'Lot'
          },{
            id:5,
            value: 7,
            label: 'Building'
          }],
        propertyTypes: [{
            id:1,
            value: 1,
            label: 'Condominium'
          },{
            id:2,
            value: 2,
            label: 'House and Lot'
          },{
            id:3,
            value: 3,
            label: 'Townhouse'
          }],
        ForeclosurePropertyTypes: [{
            id:1,
            value: 1,
            label: 'Condominium'
          },{
            id:2,
            value: 2,
            label: 'House and Lot'
          },{
            id:3,
            value: 3,
            label: 'Townhouse'
          },{
            id:4,
            value: 4,
            label: 'Commercial Lot'
          },{
            id:5,
            value: 5,
            label: 'Vacant Lot'
          }]
      },
      keyInfoRules:{
        sellingPrice:[
          { required: true, message: 'Please input amount', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    changeOfferType:function(type){
      this.keyInfo.propertyType = 'Condominium';
      this.$emit('offertype', type);
      //change the price option
      if(parseInt(type) === 2){
        this.$emit('priceoption', 1)
      }else{
        this.$emit('priceoption', 0)
      }

    },
    changePropertyType:function(type){
      this.$emit('propertytype', type)
    },
    changeSellingPrice:function(amount){
      this.$emit('sellingprice', amount)
    },
    changePriceOption:function(option){
      this.$emit('priceoption', option)
    },
    handleStep:function(formName){

        this.$refs[formName].validate((valid) => {

          if(valid){
            this.$emit('continue')
          }else{
            //console.log(valid)
          }

        });
    }
  }
}
</script>
<style scoped>
  .input{
    margin-bottom: 20px;
  }
</style>
