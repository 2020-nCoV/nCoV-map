<template>
  <div class='map-wrapper'>
    <h1>{{ msg }}</h1>
    <div
    id='myChart'
    :style='style'
    >
    </div>
  </div>
</template>

<script>
import chinaJson from 'echarts/map/json/china.json';
import _ from 'lodash';

export default {
  name: 'Map',
  props: {
    msg: String,
  },
  data() {
    return {
      style: { width: '100%', height: `${window.innerHeight - 120}px` },
    };
  },
  methods: {
    resizeChart() {
      this.style.height = `${window.innerHeight - 120}px`;
      return _.throttle(this.getEchartsInstance().resize(), 400);
    },
    getEchartsInstance() {
      return this.$echarts.init(document.getElementById('myChart'));
    },
    drawMap() {
      const mapName = 'china';
      this.$echarts.registerMap(mapName, chinaJson, {});
      this.getEchartsInstance().setOption({
        geo: {
          map: mapName,
        },
      });
    },
  },
  mounted() {
    this.drawMap();
    window.addEventListener('resize', this.resizeChart);
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeChart);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.map-wraper
  width: 100%
  height: 100%
</style>
