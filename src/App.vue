<template>
  <div>
    <div class='header'>
      <Header/>
    </div>
    <div class='aside'>
      <Nav/>
    </div>
    <div class='main'>
      <router-view/>
      <!-- <MapBox/> -->
    </div>
    <div class='footer'>
      <Footer/>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Nav from './components/Nav.vue';
// import MapBox from './components/Mapbox.vue';

export default {
  components: {
    Header,
    Footer,
    Nav,
    // MapBox,
  },
};
</script>

<style lang="stylus" scoped>
*
  margin: 0
  padding: 0

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

.header
  position: fixed;
  line-height: 60px;
  z-index: 9;

.aside
  position: fixed;
  z-index: 9;
  top: 80px;
  text-align: center;
  height: 100%;
  overflow: auto;

.main
  position: fixed;
  z-index: 9;
  top: 80px;
  left: 153px;
  width: 100%
  height: 100%

.footer
  position: fixed;
  left: 50%;
  margin-left: -12px;
  font-size: 12px;

.subtitle
  position: absolute
  bottom: 4px
  right: 4px
  font-size: 12px

@media (max-width:719px) {
  .app-title {
    font-size: 18px
    font-weight: 800
    margin-left: 10px
  }

  .logo {
    display: none
  }

  .sidebar-button {
      display: inline-block;
  }
}

</style>
