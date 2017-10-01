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
          </el-select>
        </el-form-item>
        <el-form-item style="display:inline-block" prop="propertyType" class="">
          <h5>Property type</h5>
          <el-select v-model="keyInfo.propertyType" placeholder="Select" size="large" @change="changePropertyType">
            <el-option
              v-for="type in keyInfo.propertyTypes"
              :key="type.id"
              :label="type.label"
              :value="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="display:inline-block;" prop="sellingPrice" class="">
          <h5>{{ keyInfo.offerType ==="2" ? 'Rental Fee' : 'Selling Price'}}</h5>
          <el-input type="number" class="amount" placeholder="Enter the amount" size="large" v-model="keyInfo.sellingPrice" @change="changeSellingPrice">
            <template slot="prepend">₱</template>
            <template v-if="keyInfo.offerType === '2'" slot="append">Monthly</template>
          </el-input>
        </el-form-item>
      </el-form><br>
      <el-button type="success" class="btn-pl-green" size="large" @click="handleStep('keyInfo')">Continue</el-button>
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
      this.$emit('offertype', type);
    },
    changePropertyType:function(type){
      this.$emit('propertytype', type)
    },
    changeSellingPrice:function(amount){
      this.$emit('sellingprice', amount)
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
