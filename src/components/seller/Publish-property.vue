<template>
  <div>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="20">
        <el-steps :space="200" :active="activeStep" finish-status="success" :center="true">
          <el-step title="Step 1"></el-step>
          <el-step title="Step 2"></el-step>
          <el-step title="Step 3"></el-step>
          <el-step title="Step 4"></el-step>
          <el-step title="Step 5"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="20" class="border" style="min-height:300px">
        <step-one v-show="activeStep === 0"></step-one>
        <step-two v-show="activeStep === 1"></step-two>
        <step-three v-show="activeStep === 2"></step-three>
        <step-four v-show="activeStep === 3"></step-four>
        <step-five v-show="activeStep === 4"></step-five>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="20">
        <el-button type="success" class="pull-left" :disabled="activeStep <= 0" @click="activeStep--" icon="arrow-left">Previous Step</el-button>
        <el-button type="success" class="pull-right" :disabled="activeStep >= 5" @click="activeStep++">Next Step<i class="el-icon-arrow-right el-icon-right"></i></el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import stepOne from './step-one.vue'
import stepTwo from './step-two.vue'
import stepThree from './step-three.vue'
import stepFour from './step-four.vue'
import stepFive from './step-five.vue'

export default {
  name:'publish-property',
  data(){
    return{
      activeStep:0
    }
  },
  components:{ stepOne, stepTwo, stepThree, stepFour, stepFive }
}
</script>

<style scoped>

.el-step{
    font-size: 24px
}


</style>
