<template>
  <el-row class="text-left">
    <h2>Key Information</h2><br>
    <el-col :span="24" class="input">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item style="display:inline-block;" class="">
          <h5>Offer type</h5>
          <el-select v-model="offerType" placeholder="Select" size="large" @change="changeOfferType">
            <el-option label="For Sale" value="1"></el-option>
            <el-option label="For Rent" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="display:inline-block" class="">
          <h5>Property type</h5>
          <el-select v-model="propertyType" placeholder="Select" size="large" @change="changePropertyType">
            <el-option
              v-for="type in propertyTypes"
              :key="type.id"
              :label="type.label"
              :value="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="display:inline-block;" class="">
          <h5>{{ offerType ==="2" ? 'Selling Price' : 'Rental Fee'}}</h5>
          <el-input type="number" class="amount" placeholder="Enter the amount" size="large" v-model="sellingPrice" @change="changeSellingPrice">
            <template slot="prepend">₱</template>
            <template v-if="offerType === '2'" slot="append">Monthly</template>
          </el-input>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name:'step-one',
  data(){
    return{
      offerType:"1",
      propertyType:"Condominium",
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
        }],
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
    }
  }
}
</script>

<style>
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>

<style scoped>
  .input{
    margin-bottom: 20px;
  }
</style>
