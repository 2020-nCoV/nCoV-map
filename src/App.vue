<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class='logo'></div>
        <div class='app-title'>nCov疫情大数据分析与预警平台</div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">实时疫情</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-first-aid-kit"></i>
              <span slot="title">援助武汉</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-s-promotion"></i>
              <span slot="title">人口迁移</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-timer"></i>
              <span slot="title">时间序列分析</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-location-information"></i>
              <span slot="title">空间结构分析</span>
            </el-menu-item>
            <el-menu-item index="6">
              <i class="el-icon-chat-line-square"></i>
              <span slot="title">疫情驱动分析</span>
            </el-menu-item>
            <el-menu-item index="7">
              <i class="el-icon-connection"></i>
              <span slot="title">舆情分析</span>
            </el-menu-item>
            <el-menu-item index="8">
              <i class="el-icon-document"></i>
              <span slot="title">问卷分析</span>
            </el-menu-item>
            <el-menu-item index="9">
              <i class="el-icon-s-data"></i>
              <span slot="title">统计分析</span>
            </el-menu-item>
            <el-menu-item index="10">
              <i class="el-icon-message-solid"></i>
              <span slot="title">预警分析</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view/>
          </el-main>
          <el-footer>©2020</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>


<script>
import Header from './components/Header.vue';
import Nav from './components/Nav.vue';

export default {
  Components: {
    Header,
    Nav,
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="stylus">
*
  margin: 0
  padding: 0

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

.logo
  position relative
  top: -5px
  vertical-align middle
  display: inline-block
  width: 30px;
  height: 30px;
  background url('assets/logo.png')  no-repeat
  background-size 100%

.app-title
  display: inline-block
  font-size: 24px
  font-weight: 800
  margin-left: 5px

.el-header {
  text-align: left
  line-height: 60px;
}

.el-footer {
  line-height: 60px;
}

.el-aside
  padding-top: 20px;
  text-align: center;
  height: 650px;

</style>
