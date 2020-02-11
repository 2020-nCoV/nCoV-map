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
import adcodeMap from '@/assets/maps/adcodeMap';

const { mapState } = createNamespacedHelpers('situation');

const MAP_TOKEN = 'pk.eyJ1IjoiOTI0MTUyNjUxIiwiYSI6ImNrNjkwdXYwNjBhMzUzZHBtZHZqMHc1Y3QifQ.-ghyt3JdDn12Wk31yifDLw';
const MAP_STYLE = 'mapbox://styles/mapbox/light-v9';
const MAP_ZOOM = 3.1012459845601623; // 1.0; //
const MAP_CENTER = [106.90464586973894, 38.38927373581919]; // [107.80592052753099, 29.359559158104966]; //

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
const COLOR_DEFAULT = 'rgba(255,255,255,0.9)'; // 'rgba(255,255,255,0.8)'; // '#FFF';
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
  },
  watch: {
    infectionData(newData) {
      console.log(newData);
      if (newData && this.mapInstance.isStyleLoaded()) {
        this.draw(this.mapInstance, newData);
        // to fix: 重复添加地图图层的报错
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
      window.map = map;
      this.addMapControl();
      map.on('load', () => {
        map.flyTo({
          center: [107.80592052753099, 29.359559158104966],
          zoom: 4.0,
          speed: 0.3,
          curve: 1,
          easing(t) {
            return t;
          },
        });
        const { origin } = window.location;
        Object.keys(adcodeMap)
          .forEach((key) => {
            fetch(`${origin}/assets/geojson/${adcodeMap[key]}.json`)
              .then(res => res.json())
              .then((geo) => {
                // console.log('key', key);
                map.addSource(String(adcodeMap[key]), {
                  type: 'geojson',
                  data: geo,
                });
              });
          });
        if (this.infectionData) {
          this.draw(map, this.infectionData);
        }
      });
    },
    draw(mapInstance, data) {
      if (data && Array.isArray(data) && data.length > 0) {
        setTimeout(() => {
          data.forEach(({ cities, locationId }) => {
            const expression = ['match', ['get', 'adcode']];
            cities.forEach((city) => {
            // const red = (city.confirmedCount * 255 / maxValue);
            // const color = `rgba(${255}, ${0}, ${0}, ${red})`;
              const color = this.getColor(city.confirmedCount);
              if (city.locationId !== 0) {
                expression.push(city.locationId, color);
              }
            });
            expression.push('rgba(0,0,0,0)');
            if (expression.length < 4) return;
            mapInstance.addLayer({
              id: String(locationId),
              type: 'fill',
              source: String(locationId),
              paint: {
                'fill-color': expression,
              },
            }, 'waterway-label');
          });
        },
        2000);
      }
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
