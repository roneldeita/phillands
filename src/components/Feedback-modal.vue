<template>
  <div>
    <el-dialog
      title="Suggestions and Feedbacks"
      :visible.sync="feedbackVisible"
      size="tiny"
      @close="dialogClose"
      class="feedback-container"
      >
      <el-form>
        <el-form-item label="" prop="full_name" style="margin-bottom:22px">
          <el-input placeholder="Your Full name"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'feedback-modal',
  props: ['feedbackmodal'],
  data(){
    return{
      feedbackVisible: this.feedbackmodal,
    }
  },
  methods: {
    dialogVisible() {

    },
    dialogClose(){
      this.$emit('feedbackmodalclose', this.feedbackVisible);
    }
  },
  watch:{
    feedbackmodal:function(e){
      this.feedbackVisible = this.feedbackmodal
    }
  }
}
</script>
<style>
.feedback-container .el-dialog .el-dialog__header{
  background-color: #13ce66;
  color: #ffffff;
  padding:10px 0 !important;
}
.feedback-container .el-dialog .el-dialog__header .el-dialog__title{
  color: #ffffff;
  font-size: 20px;
}
.feedback-container .el-dialog .el-dialog__header .el-dialog__headerbtn{
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  outline: none !important;
}
.feedback-container .el-dialog .el-dialog__header .el-dialog__headerbtn .el-icon{
  color:#ffffff !important
}
</style>
