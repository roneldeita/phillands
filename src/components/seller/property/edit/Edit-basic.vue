<template>
  <div>
    <div class="text-right">
      <el-button v-if="!basicEdit" @click="basicEdit = true" icon="edit">Edit</el-button>
      <el-button type="success" class="btn-pl-green" v-if="basicEdit"  @click="saveBasic">Save</el-button>
      <el-button v-if="basicEdit" @click="basicEdit = false; cancelBasicEdit(property_no)">Cancel</el-button>
    </div>
    <div v-if="!basicEdit">
      <p class="label">Title</p>
      <h3>{{ basicForm.title }}</h3>
      <p class="label">Description</p>
      <p style="white-space: pre-wrap; max-height:130px; overflow-y:scroll">{{ basicForm.description }}</p>
    </div>
    <el-form v-if="basicEdit" :model="basicForm" :rules="basicRules" ref="basicForm" label-width="0" class="form">
      <el-form-item label="Title" prop="title">
        <el-input v-model="basicForm.title" size="large"></el-input>
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input type="textarea" :rows="5" v-model="basicForm.description"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//api
import { getProperty } from '../../../../assets/utils/properties-api.js'

export default {
  name:'edit-basic',
  computed: {
    token:  function () {
      return this.$store.getters.phillandsIdToken
    }
  },
  data(){
    return{
      basicEdit:false,
      basicForm:{
        title:'',
        description:'',
      },
      basicRules:{
        title:[
          { required: true, message: 'Title is required', trigger: 'blur' }
        ],
        description:[
          { required: true, message: 'Description is required', trigger: 'blur' },
          { min: 20, max: 2000, message: 'Description should be atleast 20 characters and max of 2000', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    getProperty:function(property_no){
      getProperty(property_no).then((property) =>{
          this.property_id = property.id;
          this.property_no = property.property_no;
          //basic info
          this.basicForm.title = property.property_detail.title;
          this.basicForm.description = property.property_detail.description;
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
          this.axios.defaults.headers.common['token'] = this.token;
          return this.axios.post(process.env.API_URL+'/broker/property/update', basic)
          .then(response => {
            if(response.data.message === "Success"){
              this.basicEdit = false;
              this.$message({
                message: 'The information was successfully updated',
                type: 'success'
              });
            };
          }).catch(error => {
            console.log(error)
          });
        }
      });
    },
    cancelBasicEdit:function(){
      getProperty(this.property_no).then((property) =>{
        this.basicForm.title = property.property_detail.title;
        this.basicForm.description = property.property_detail.description;
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
