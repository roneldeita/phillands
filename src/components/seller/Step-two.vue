<template>
  <el-row class="text-left">
    <h2>Unit Details</h2><br>
    <h5>Bedrooms</h5>
    <el-col :span="24" class="input">
      <el-radio-group v-model="bedrooms" fill="#56BA50">
        <el-radio-button label="Studio"></el-radio-button>
        <el-radio-button v-for="n in 10" :label="n" :key="n"></el-radio-button>
      </el-radio-group>
    </el-col>
    <h5>Bedrooms</h5>
    <el-col :span="24" class="input">
      <el-radio-group v-model="bathrooms" fill="#56BA50">
        <el-radio-button v-for="n in 10" :label="n" :key="n"></el-radio-button>
      </el-radio-group>
    </el-col>
    <h5>Parking</h5>
    <el-col :span="24" class="input">
      <el-radio-group v-model="parking" fill="#56BA50">
        <el-radio-button label="None"></el-radio-button>
        <el-radio-button v-for="n in 10" :label="n" :key="n"></el-radio-button>
      </el-radio-group>
    </el-col>
    <h5>Floor Area</h5>
    <el-col :span="24" class="input">
      <el-input type="number" class="amount" placeholder="" v-model="floorArea">
        <template slot="append">sqm</template>
      </el-input>
    </el-col>
    <h5>Lot Area</h5>
    <el-col :span="24" class="input">
      <el-input type="number" class="amount" placeholder="" v-model="lotArea">
        <template slot="append">sqm</template>
      </el-input>
    </el-col>
    <h5>Balcony</h5>
    <el-col :span="24" class="input">
      <el-radio-group v-model="balcony" fill="#56BA50">
        <el-radio-button label="Yes"></el-radio-button>
        <el-radio-button label="No"></el-radio-button>
      </el-radio-group>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name:'step-two',
  data(){
    return{
      bedrooms:"",
      bathrooms:"",
      parking:"None",
      floorArea:"",
      lotArea:"",
      balcony:""
    }
  }
}
</script>

<style  scoped>
.input{
  margin-bottom: 10px;
}
.el-input{
  max-width: 230px;
}
</style>
