<template>
  <el-row class="text-left">
      <h2>Key Information</h2><br>
      <h5>Offer type</h5>
      <el-col :span="24" class="input">
        <el-radio-group v-model="offertype" fill="#56BA50" size="large">
          <el-radio-button label="For Sale"></el-radio-button>
          <el-radio-button label="For Rent"></el-radio-button>
        </el-radio-group>
      </el-col>
      <h5>property type</h5>
      <el-col :span="24" class="input">
        <el-radio-group v-model="propertyType" fill="#56BA50" size="large">
          <el-radio-button
            v-for="type in propertyTypes"
            :key="type.id"
            :label="type.label"
            :value="type.value">
          </el-radio-button>
        </el-radio-group>
      </el-col>
      <h5>{{ offertype ==="For Sale" ? 'Selling Price' : 'Rental Fee'}}</h5>
      <el-col :span="24" class="input">
        <el-input type="number" class="amount" placeholder="Type the amount" size="large" v-model="sellingPrice">
          <template slot="prepend">₱</template>
          <template v-if="offertype === 'For Rent'" slot="append">Monthly</template>
        </el-input>
      </el-col>
  </el-row>
</template>
<script>
export default {
  name:'step-one',
  props:['offertype'],
  data(){
    return{
      sellingPrice:'0',
      propertyType: '',
      propertyTypes: [{
          id:1,
          value: 'Condominium',
          label: 'Condominium'
        },{
          id:2,
          value: 'House and Lot',
          label: 'House and Lot'
        },{
          id:3,
          value: 'Townhouse',
          label: 'Townhouse'
        }],
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
    margin-bottom: 10px;
  }
  .el-input{
    max-width: 230px;
  }
</style>
