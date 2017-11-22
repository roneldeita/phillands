<template>
  <el-form :model="unitDetails" :rules="unitDetailsRules" ref="unitDetails">
    <el-row class="text-left">
      <h2>Unit Details</h2><br>
      <h5>Bedrooms</h5>
      <el-col :span="24" class="input">
        <el-radio-group v-model="bedrooms" @change="changeBedrooms" fill="#13ce66">
          <el-radio-button label="Studio"></el-radio-button>
          <el-radio-button v-for="n in 10" :label="n" :key="n"></el-radio-button>
        </el-radio-group>
      </el-col>
      <h5>Bathrooms</h5>
      <el-col :span="24" class="input">
        <el-radio-group v-model="bathrooms" @change="changeBathrooms" fill="#13ce66">
          <el-radio-button label="None"></el-radio-button>
          <el-radio-button v-for="n in 10" :label="n" :key="n"></el-radio-button>
        </el-radio-group>
      </el-col>
      <h5>Parking</h5>
      <el-col :span="24" class="input">
        <el-radio-group v-model="parking" @change="changeParking" fill="#13ce66">
          <el-radio-button label="None"></el-radio-button>
          <el-radio-button v-for="n in 10" :label="n" :key="n"></el-radio-button>
        </el-radio-group>
      </el-col>
      <h5>Floor Area</h5>
      <el-col :span="24" class="input">
        <el-form-item prop="floorArea" class="">
          <el-input type="number" class="amount" placeholder="" v-model="unitDetails.floorArea" @change="changeFloorArea">
            <template slot="append">sqm</template>
          </el-input>
        </el-form-item>
      </el-col>
      <h5>Lot Area</h5>
      <el-col :span="24" class="input">
        <el-form-item prop="lotArea" class="">
          <el-input type="number" class="amount" placeholder="" v-model="unitDetails.lotArea" @change="changeLotArea">
            <template slot="append" class="bg-pl-green">sqm</template>
          </el-input>
        </el-form-item>
      </el-col>
      <h5>Balcony</h5>
      <el-col :span="24" class="input">
        <el-radio-group v-model="balcony" fill="#13ce66" @change="changeBalcony">
          <el-radio-button label="Yes"></el-radio-button>
          <el-radio-button label="No"></el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="24" class="input">
        <el-button type="btn-pl-green" size="large" @click="backToPreviousStep">Back</el-button>
        <el-button type="success" class="btn-pl-green pull-right" size="large" @click="handleStep('unitDetails')">Continue</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name:'step-two',
  data(){
    return{
      unitDetails:{
        floorArea:'',
        lotArea:''
      },
      unitDetailsRules:{
        floorArea:[
          { required: true, message: 'Please input amount', trigger: 'blur' }
        ],
        lotArea:[
          { required: true, message: 'Please input amount', trigger: 'blur' }
        ]
      },
      bedrooms:'Studio',
      bathrooms:'None',
      parking:'None',
      balcony:'Yes'
    }
  },
  methods:{
    handleStep:function(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          this.$emit('continue')
        }else{
          //console.log(valid)
        }
      });
    },
    backToPreviousStep:function(){
        this.$emit('back')
    },
    changeBedrooms:function(bedrooms){
      this.$emit('bedrooms', (bedrooms === 'Studio' ? 0 : bedrooms));
    },
    changeBathrooms:function(bathrooms){
      this.$emit('bathrooms', bathrooms);
    },
    changeParking:function(parking){
      this.$emit('parking', (parking === 'None' ? 0 : parking));
    },
    changeFloorArea:function(area){
      this.$emit('floorarea', area)
    },
    changeLotArea:function(area){
      this.$emit('lotarea', area)
    },
    changeBalcony:function(balcony){
      this.$emit('balcony', (balcony === 'Yes' ?  1 : 0));
    }
  }
}
</script>

<style>
.amount .el-input-group__append{
  background-color: #13ce66 !important;
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
