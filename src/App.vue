<template>
  <div>
    <div class='header'>
      <Header/>
    </div>
    <!-- <div class='aside'>
      <Nav/>
    </div> -->
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
// import Nav from './components/Nav.vue';
// import MapBox from './components/Mapbox.vue';

export default {
  components: {
    Header,
    Footer,
    // Nav,
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
  line-height: 40px;
  z-index: 9;

.aside
  display: block;
  position: fixed;
  z-index: 9;
  top: 70px;
  text-align: center;
  height: 100%;
  overflow: auto;

@media (max-width 719px) {
  .aside {
    display: none;
  }
}

.main
  position: fixed;
  top: 0;
  left: 0;
  width: 100%
  height: 100%

.footer
  position: fixed;
  left: 50%;
  bottom: 1px;
  margin-left: -50px;
  font-size: 12px;
  color: #222;

</style>
