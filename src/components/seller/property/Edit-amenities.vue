<template>
  <div>
    <div class="text-right">
      <h4 class="pull-left txt-pl-green">Amenities</h4>
      <el-button v-if="!amenitiesEdit" @click="amenitiesEdit = true" icon="edit">Edit</el-button>
      <el-button type="success" class="btn-pl-green" v-if="amenitiesEdit" @click="saveAmenities">Save</el-button>
      <el-button v-if="amenitiesEdit" @click="amenitiesEdit = false; cancelAmenitiesEdit()">Cancel</el-button>
    </div>
    <el-row v-if="!amenitiesEdit" class="">
      <el-col :sm="12" :md="10">
        <el-button class="amenities" v-for="amenity in amenitiesForm.amenities" :key="0" size="small" style="width:auto"><span class="fa fa-check txt-pl-green"></span> {{ amenity }}</el-button>
        <p v-if="amenitiesForm.amenities ===''" class="pull-left txt-pl-light">None</p>
      </el-col>
    </el-row>
    <el-form v-if="amenitiesEdit" :model="amenitiesForm" label-width="0" class="amenities-form">
      <el-row>
        <el-col :sm="18" :md="10">
          <p>Choose the amenities from the options or manually type if not available.</p>
          <el-select
            v-model="amenitiesForm.amenities"
            size="large"
            multiple
            filterable
            allow-create
            placeholder=""
            style="width:100%;">
            <el-option
              v-for="amenity in amenitiesOptions"
              :key="0"
              :label="amenity.label"
              :value="amenity.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
//dependency
import axios from 'axios';
//api
import { baseUrl,getProperty } from '../../../assets/utils/properties-api.js'
import { getIdToken } from '../../../assets/utils/auth.js'
//json
import amenitiesOpts from '../../../../static/json/amenities.json'

export default {
  name:'edit-amenities',
  data(){
    return{
      amenitiesEdit:false,
      amenitiesOptions: [],
      amenitiesForm:{
        amenities:''
      },
      ammenitiesRules:{},
    }
  },
  methods:{
    getProperty:function(property_no){
      getProperty(property_no).then((property) =>{
          this.property_id = property.id;
          this.property_no = property.property_no;
          //amenities
          if(property.property_detail.amenities != ''){
            this.amenitiesForm.amenities = property.property_detail.amenities.split(",");
          }
      });
    },
    saveBasic:function(){
      var basic = {
        id : this.property_id,
        edit: 'details',
        title: this.basicForm.title,
        description: this.basicForm.description
      }
      this.$refs.basicForm.validate((valid) => {
        if(valid){
          axios.defaults.headers.common['token'] = getIdToken();
          return axios.post(baseUrl()+'/broker/property/update', basic)
          .then(response => {
            if(response.data.message === "Success"){
              this.basicEdit = false;
              this.$message({
                message: 'The information was successfully updated',
                type: 'success'
              });
            };
          }).catch( error => {
            console.log(error)
          });
        }
      });
    },
    cancelAmenitiesEdit:function(){
      getProperty(this.property_no).then((property) =>{
        if(property.property_detail.amenities != ''){
          this.amenitiesForm.amenities = property.property_detail.amenities.split(",");
        }
      });
    },
    saveAmenities:function(){
      var amenities = {
        id: this.property_id,
        edit: 'details',
        amenities: this.amenitiesForm.amenities.toString()
      }

      axios.defaults.headers.common['token'] = getIdToken();
      return axios.post(baseUrl()+'/broker/property/update', amenities)
      .then( response => {
        if(response.data.message === "Success"){
          this.amenitiesEdit = false;
          this.$message({
            message: 'The information was successfully updated',
            type: 'success'
          });
        };
      }).catch( error => {
        console.log(error)
      });
    },
  },
  mounted(){
    this.getProperty(this.$route.params.property_no);
    this.amenitiesOptions = amenitiesOpts;
  }
}
</script>

<style>
  .amenities-form .el-tag--primary{
    background-color: #13ce66 !important;
  }
  .amenities-form .el-select__tags-text{
    color: #ffffff !important;
    font-size: 14px !important;
  }
  .amenities-form .el-tag__close{
    color: #ffffff !important;
  }
  .amenities-form .el-tag__close:hover{
    background-color: #f2f2f2 !important;
    color: #999999 !important;
  }
</style>
<style scoped>
  .amenities{
    margin:5px;
    width: 80px;
  }
</style>
