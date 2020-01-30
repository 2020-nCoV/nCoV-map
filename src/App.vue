<template>
  <div id="app">
    <el-container>
      <el-header>
        <Header/>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Nav/>
        </el-aside>
        <el-container>
          <el-main>
            <router-view/>
          </el-main>
          <el-footer>
            <Footer/>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Nav from './components/Nav.vue';

export default {
  components: {
    Header,
    Footer,
    Nav,
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

.el-header {
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
