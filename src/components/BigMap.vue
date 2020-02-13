<template>
  <div class='map-wrapper'>
    <div
      id='big_map'
      :style='style'
    >
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import { createNamespacedHelpers } from 'vuex';
import adcodes from '@/assets/maps/adcodes';
import axios from '@/utils/http';

const { mapState } = createNamespacedHelpers('situation');

const MAP_TOKEN = 'pk.eyJ1IjoiOTI0MTUyNjUxIiwiYSI6ImNrNjkwdXYwNjBhMzUzZHBtZHZqMHc1Y3QifQ.-ghyt3JdDn12Wk31yifDLw';
const MAP_STYLE = 'mapbox://styles/mapbox/light-v9';
const MAP_ZOOM = 1.1012459845601623; // 1.0; //
const MAP_CENTER = [105.1171875, 37.10776507118514]; // [107.80592052753099, 29.359559158104966]; // [106.90464586973894, 38.38927373581919]; //
const STYLE_LAYER_ID = 'cities-join';
const CONFIRM = 'confirmedCount';
// const SUSPECTED = 'suspectedCount';
// const CURED = 'curedCount';
// const DEAD = 'deadCount';

// const maxValue = 20000;
const LEVEL_1 = '1000';
const LEVEL_2 = '500';
const LEVEL_3 = '100';
const LEVEL_4 = '10';
const LEVEL_5 = '1';
const COLOR_LEVEL_1 = 'rgba(103,0,6,0.9)'; // '#7F1818'; // 'rgba(255,0,0,1)'; //
const COLOR_LEVEL_2 = 'rgba(139,6,13,0.9)'; // '#BF2121'; // 'rgba(255,0,0,0.8)'; //
const COLOR_LEVEL_3 = 'rgba(202,43,39,0.9)'; // '#FF7B69'; // 'rgba(255,0,0,0.3)'; //
const COLOR_LEVEL_4 = 'rgba(255,123,103,0.9)'; // '#FFAA85'; // 'rgba(255,0,0,0.2)'; //
const COLOR_LEVEL_5 = 'rgba(255,168,133,0.9)'; // '#FFEDCC'; // 'rgba(255,0,0,0.15)'; //
const COLOR_DEFAULT = 'rgba(255,255,255,0.5)'; // 'rgba(255,255,255,0.8)'; // '#FFF';

export default {
  name: 'BigMap',

  data() {
    return {
      style: {
        height: `${window.innerHeight}px`,
      },
    };
  },
  computed: {
    ...mapState(['infectionData']),
    mapInstance() {
      return new this.$mapbox.Map({
        container: 'big_map',
        style: MAP_STYLE,
        center: MAP_CENTER,
        zoom: MAP_ZOOM,
      });
    },
    adColors() {
      const o = {};
      adcodes.forEach((code) => {
        o[code] = COLOR_DEFAULT;
      });
      return o;
    },
  },
  watch: {
    infectionData(newData) {
      console.log(newData);

      if (this.mapInstance.isStyleLoaded()) {
        console.log('---cc---');
        this.reColorMap(newData);
      }
    },
  },
  methods: {
    resize() {
      return _.throttle(() => {
        this.style.height = `${window.innerHeight}px`;
      }, 400);
    },
    addMapControl() {
      this.mapInstance.addControl(new this.$mapbox.NavigationControl(), 'top-right');
      this.mapInstance.addControl(new this.$mapbox.FullscreenControl());
      this.mapInstance.addControl(new MapboxLanguage());
    },
    getColor(d) {
      if (d >= LEVEL_1) {
        return COLOR_LEVEL_1;
      } if (d >= LEVEL_2 && d < LEVEL_1) {
        return COLOR_LEVEL_2;
      } if (d >= LEVEL_3 && d < LEVEL_2) {
        return COLOR_LEVEL_3;
      } if (d >= LEVEL_4 && d < LEVEL_3) {
        return COLOR_LEVEL_4;
      } if (d >= LEVEL_5 && d < LEVEL_4) {
        return COLOR_LEVEL_5;
      }
      return COLOR_DEFAULT;
    },
    initMapbox() {
      const map = this.mapInstance;
      this.addMapControl();
      map.on('load', () => {
        map.flyTo({
          center: MAP_CENTER,
          zoom: 3,
          speed: 0.3,
          curve: 1,
          easing(t) {
            return t;
          },
        });
        this.drawMap();
        map.once('zoomend', () => {
          this.$bus.$emit('mapReady', true);
        });
      });
    },
    reColorMap(newData) {
      const idata = this.extrDataObj(newData, CONFIRM);
      const colorExp = this.makeColorExp(idata);
      this.mapInstance.setPaintProperty(STYLE_LAYER_ID, 'fill-color', colorExp);
    },
    clearLayer() {
      try {
        const { layers } = this.mapInstance.getStyle();
        for (let i = 0; i < layers.length; i += 1) {
          if (layers[i].id === STYLE_LAYER_ID) {
            this.mapInstance.removeLayer(STYLE_LAYER_ID);
            this.mapInstance.removeSource('cities');
            break;
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getGeo() {
      const geo = await axios.request({ url: 'assets/geojson/allcitiesgeo.json' });
      // console.log(geo);
      return geo.data;
    },
    extrDataObj(rawData, category) {
      // category: CONFIRM | SUSPECTED | CURED | DEAD
      const temp = { ...this.adColors };
      if (rawData && category) {
        rawData.forEach(({ cities }) => {
          cities.forEach((city) => {
          // const green = (Math.random() * 10 / 15) * 255;
          // const color = `rgba(${0}, ${green}, ${0}, 0.7)`;
            const color = this.getColor(city[category]);
            if (city.locationId !== 0) {
              temp[city.locationId] = color;
            }
          });
        });
      }
      // console.log(temp);
      return temp;
    },
    makeColorExp(data) {
      const expression = ['match', ['get', 'adcode']];
      adcodes.forEach((code) => {
        expression.push(Number(code), data[code]);
      });
      expression.push('rgba(0,0,0,0)');
      // console.log(expression);
      return expression;
    },
    drawMap() {
      const idata = this.extrDataObj(this.infectionData, CONFIRM);
      this.getGeo().then((geodata) => {
        // console.log(geodata);
        this.mapInstance.addSource('cities', {
          type: 'geojson',
          data: geodata,
        });

        this.mapInstance.addLayer(
          {
            id: STYLE_LAYER_ID,
            type: 'fill',
            source: 'cities',
            // 'source-layer': 'cities',
            paint: {
              'fill-color': this.makeColorExp(idata),
            },
          },
          'waterway-label',
        );
      });
    },
  },
  mounted() {
    this.$mapbox.accessToken = MAP_TOKEN;
    this.initMapbox();
    window.addEventListener('resize', this.resize());
  },
  destroyed() {
    window.removeEventListener('resize', this.resize());
  },
};
</script>

<style lang='stylus' scoped>
  .map-wraper
    width: 100%
    height: 100%
</style>
