<template>
<div>
    <div class="header">
      <Header></Header>
    </div>
    <div class="main">
      <div class="login_container">
        <bubbles-effect :options="options"></bubbles-effect>
        <el-form ref="form" :model="form" label-width="10px" class="login_form">
          <el-container>
            <el-image
            style="width: 50px; height: 50px;display:block;margin: 0 auto"
            :src="logo"
            :fit="fit">
            </el-image>
          </el-container>
          <el-form-item style="margin-top: 10px">
            <el-input v-model="form.username" placeholder="手机号/邮箱" clearable ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.code" placeholder="验证码" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.password" placeholder="密码" clearable show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%" v-on:click="login()">登录</el-button>
          </el-form-item>
          <span style="margin-right: 5px;color: #FFFFFF">忘记密码</span>
          <span style="color: #FFFFFF">|</span>
          <span style="margin-left: 5px;color: #FFFFFF" v-on:click="register()">注册</span>
        </el-form>
      </div>
    </div>
    <div class="footer">
      <Footer></Footer>
    </div>
</div>
</template>
<script>
import Footer from './componennts/footer.vue';
import Header from './componennts/header.vue';

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      logo: '../../assets/image/logo.png',
      form: {
        username: '',
        password: '',
        code: '',
      },
    };
  },
  methods: {
    register() {
      this.$router.push({
        path: '/register',
      });
    },
    login() {
      this.$router.push({
        path: '/situation',
      });
    },
  },
};
</script>
<style scoped>
  .header {
    padding: 10px;
    top: 0;
    color: #333;
    position: fixed;
    height: 8%;
    width: 100%;
  }
  .footer {
    color: #333;
    width: 100%;
    position: fixed;
    height: 32%;
    bottom: 0;
    background-color:floralwhite;
  }

  .main {
    top:8%;
    width: 100%;
    position: fixed;
    height: 60%;
    background: url("../../assets/image/login_bg.png")top no-repeat;
    background-size: 100%;
  }
  .login_form {
    width: 350px;
    background-color: #50596f;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 30px 3px rgba(119,118,118,0.33);
    margin:40px auto;
  }

  .login_container {
    width: 100%;
    height: 100%;
    position: absolute;
  }
</style>
