<template>
  <el-row class="text-left">
    <h2>Amenities</h2><br>
    <el-col :span="24" class="input" style="margin-bottom:150px">
      <p>Choose the amenities from the options or manually type if not available.</p>
      <el-select
        v-model="amenities"
        size="large"
        multiple
        filterable
        allow-create
        placeholder=""
        @change="changeAmenities"
        style="width:100%;">
        <el-option
          v-for="amenity in amenitiesOptions"
          :key="0"
          :label="amenity.label"
          :value="amenity.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="24" class="input">
      <el-button type="btn-pl-green" size="large" @click="backToPreviousStep">Back</el-button>
      <el-button type="success" class="btn-pl-green pull-right" size="large" @click="handleStep('unitDetails')">Continue</el-button>
    </el-col>
  </el-row>
</template>
<script>
//json
import amenitiesOpts from '../../../static/json/amenities.json'

export default {
  name:'step-one',
  data(){
    return{
      amenities:['Parking'],
      amenitiesOptions: []
    }
  },
  methods:{
    handleStep:function(formName){
      this.$emit('continue')
    },
    backToPreviousStep:function(){
        this.$emit('back')
    },
    changeAmenities:function(data){
      this.$emit('amenities', data);
    }
  },
  mounted(){
    this.amenitiesOptions = amenitiesOpts;
  }
}
</script>

<style>
  .el-tag--primary{
    background-color: #56BA50 !important;
  }
  .el-select__tags-text{
    color: #ffffff !important;
    font-size: 14px !important;
  }
  .el-tag__close{
    color: #ffffff !important;
  }
  .el-tag__close:hover{
    background-color: #f2f2f2 !important;
    color: #999999 !important;
  }
</style>

<style scoped>
  .input{
    margin-bottom: 20px;
  }
</style>
