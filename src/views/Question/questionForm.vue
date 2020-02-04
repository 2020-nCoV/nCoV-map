<template>
  <div class="container">
    <div class="title">表单</div>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top">
            <el-form-item label="最近的新型冠状病毒肺炎疫情，您关注吗?" prop="ifFocusOn" size="medium">
              <el-radio-group v-model="ruleForm.ifFocusOn">
                <el-radio border label="很关注"></el-radio>
                <el-radio border label="有点关注"></el-radio>
                <el-radio border label="不确定"></el-radio>
                <el-radio border label="不太关注"></el-radio>
                <el-radio border label="很不关注"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式">
              <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item class="submit">
              <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
              <el-button @click="resetForm('form')">重 置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { addSurvey } from '@/api';

export default {
  data() {
    return {
      ruleForm: {
        ifFocusOn: '',
        desc: '',
      },
      rules: {
        ifFocusOn: [{ required: true, message: '请选择', trigger: 'change' }],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }],
      },
    };
  },
  methods: {
    async submitForm(formName) {
      console.log(this.ruleForm);
      try {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const options = {};
            options.params = this.ruleForm;
            options.data = this.ruleForm;
            options.method = 'post';
            const res = await addSurvey(options);
            if (res.error_code === 0) {
              this.$message.success(`${res.msg}`);
              this.resetForm(formName);
            }
          }
          return false;
        });
      } catch (error) {
        this.$message.error(error.data.msg);
        console.log(error);
      }
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="stylus" scoped>
.container {
   margin-left: 154px;
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;
    border-bottom: 1px solid #dae1ec;
  }

  .wrap {
    padding: 20px;
      .el-form.el-form--label-top {
        text-align: left;
      }
  }

  .submit {
    float: left;
  }
}
</style>
