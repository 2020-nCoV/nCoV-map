<template>
  <div class='map-wrapper'>
    <div
    id='mapbox'
    :style='style'
    >
    </div>
  </div>
</template>

<script>
const token = 'pk.eyJ1IjoiMTM1OTQzOTUxMzYiLCJhIjoiY2p6dWtrYTJ2MDZjYjNncGhicmQ5emNxaiJ9.vhAO6Rbm0OWX902bpp90pQ';
export default {
  name: 'MapBox',
  props: ['mapData'],
  data() {
    return {
      style: { width: '100%', height: `${window.innerHeight - 20}px` },
    };
  },
  computed: {
    mapInstance() {
      return new this.$mapbox.Map({
        container: 'mapbox',
        style: 'mapbox://styles/mapbox/light-v9',
        center: [107.80592052753099, 29.359559158104966],
        zoom: 5.0,
      });
    },
  },
  watch: {

  },
  methods: {
    initMapbox() {
      const map = this.mapInstance;
      map.on('load', () => {
        map.flyTo({
          center: [107.80592052753099, 29.359559158104966],
          zoom: 2.5,
          speed: 0.15,
          curve: 1,
          easing(t) {
            return t;
          },
        });
      });
    },
  },
  mounted() {
    this.$mapbox.accessToken = token;
    this.initMapbox();
  },
  destroyed() {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.map-wraper
  width: 100%
  height: 100%
</style>
