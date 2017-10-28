<template>
  <div>
    <div class="text-right">
      <h4 class="pull-left txt-pl-green">Unit Details</h4>
      <el-button v-if="!unitDetailEdit" @click="unitDetailEdit = true" icon="edit">Edit</el-button>
      <el-button type="success" class="btn-pl-green" v-if="unitDetailEdit"  @click="saveUnitDetail">Save</el-button>
      <el-button v-if="unitDetailEdit" @click="unitDetailEdit = false; cancelUnitDetailEdit()">Cancel</el-button>
    </div>
    <el-row v-if="!unitDetailEdit" class="">
      <el-col :xs="12" :sm="8" :md="6" class="">
        <p class="label">Bedrooms</p>
        <p><span class="fa fa-bed"></span> {{ unitDetailForm.bedrooms }}</p>
      </el-col>
      <el-col :xs="12" :sm="8" :md="18" class="">
        <p class="label">Bathrooms</p>
        <p><span class="fa fa-bath"></span> {{ unitDetailForm.bathrooms }}</p>
      </el-col>
      <el-col :xs="12" :sm="8" :md="6" class="">
        <p class="label">Parking</p>
        <p><span class="fa fa-car"></span> {{ unitDetailForm.parking }}</p>
      </el-col>
      <el-col :xs="12" :sm="8" :md="18" class="">
        <p class="label">Floor Area</p>
        <p>{{ unitDetailForm.floor_area }} sqm</p>
      </el-col>
      <el-col :xs="12" :sm="8" :md="6" class="">
        <p class="label">Lot Area</p>
        <p>{{ unitDetailForm.lot_area }} sqm</p>
      </el-col>
    </el-row>
    <el-form v-if="unitDetailEdit" :model="unitDetailForm" :rules="unitDetailRules" ref="unitDetailForm" label-width="0" class="form">
      <el-row>
        <el-col :sm="12" :md="6" :lg="6" class="">
          <el-form-item label="" prop="bedrooms">
            <p class="label"><span class="required">*</span>Bedrooms</p>
            <el-input-number v-model="unitDetailForm.bedrooms" :min="0" :max="10"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="6" :lg="18" class="">
          <el-form-item label="" prop="bathrooms">
            <p class="label"><span class="required">*</span>Bathrooms</p>
            <el-input-number v-model="unitDetailForm.bathrooms" :min="0" :max="10"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="6" :lg="6" class="">
          <el-form-item label="" prop="parking">
            <p class="label"><span class="required">*</span>Parking</p>
            <el-input-number v-model="unitDetailForm.parking" :min="0" :max="10"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="6" :lg="18">
            <el-form-item prop="floor_area">
              <p class="label"><span class="required">*</span>Floor Area</p>
              <el-input type="number" class="amount" v-model="unitDetailForm.floor_area" style="max-width:150px">
                <template slot="append">sqm</template>
              </el-input>
            </el-form-item>
        </el-col>
        <el-col :sm="12" :md="6" :lg="6">
            <el-form-item prop="lot_area" label="">
              <p class="label"><span class="required">*</span>Lot Area</p>
              <el-input type="number" class="amount" v-model="unitDetailForm.lot_area" style="max-width:150px">
                <template slot="append">sqm</template>
              </el-input>
            </el-form-item>
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

export default {
  name:'edit-unitdetails',
  data(){
    return{
      unitDetailEdit:false,
      unitDetailForm:{
        bedrooms:'',
        bathrooms:'',
        parking:'',
        floor_area:'',
        lot_area:'',
        balcony:''
      },
      unitDetailRules:{
        floor_area:[
          { required: true, message: 'Floor Area is required', trigger: 'blur' }
        ],
        lot_area:[
          { required: true, message: 'Lot Area is required', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    getProperty:function(property_no){
      getProperty(property_no).then((property) =>{
          this.property_id = property.id;
          this.property_no = property.property_no;
          //details
          this.unitDetailForm.bedrooms = property.property_detail.bedrooms;
          this.unitDetailForm.bathrooms = property.property_detail.bathrooms;
          this.unitDetailForm.parking = property.property_detail.parking;
          this.unitDetailForm.floor_area = property.property_detail.floor_area.toString();
          this.unitDetailForm.lot_area = property.property_detail.lot_area.toString();
          this.unitDetailForm.balcony = property.property_detail.balcony;
      });
    },
    saveUnitDetail:function(){
      const self = this;
      var unitDetail = {
        id : this.property_id,
        edit: 'details',
        bedrooms:this.unitDetailForm.bedrooms,
        bathrooms:this.unitDetailForm.bathrooms,
        parking:this.unitDetailForm.parking,
        floor_area:this.unitDetailForm.floor_area,
        lot_area:this.unitDetailForm.lot_area,
        balcony:this.unitDetailForm.balcony
      }
      this.$refs.unitDetailForm.validate((valid) => {
        if(valid){
          axios.defaults.headers.common['token'] = getIdToken();
          return axios.post(baseUrl()+'/broker/property/update', unitDetail)
          .then(function(response){
            if(response.data.message === "Success"){
              self.unitDetailEdit = false;
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
    cancelUnitDetailEdit:function(){
      getProperty(this.property_no).then((property) =>{
        this.unitDetailForm.bedrooms = property.property_detail.bedrooms.toString();
        this.unitDetailForm.bathrooms = property.property_detail.bathrooms;
        this.unitDetailForm.parking = property.property_detail.parking;
        this.unitDetailForm.floor_area = property.property_detail.floor_area;
        this.unitDetailForm.lot_area = property.property_detail.lot_area;
        this.unitDetailForm.balcony = property.property_detail.balcony;
      });
    },
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
