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
import _ from 'lodash';
import statData from '../assets/statData';

const adcodeMap = {
  北京市: 110000,
  天津市: 120000,
  河北省: 130000,
  山西省: 140000,
  内蒙古自治区: 150000,
  辽宁省: 210000,
  吉林省: 220000,
  黑龙江省: 230000,
  上海市: 310000,
  江苏省: 320000,
  浙江省: 330000,
  安徽省: 340000,
  福建省: 350000,
  江西省: 360000,
  山东省: 370000,
  河南省: 410000,
  湖北省: 420000,
  湖南省: 430000,
  广东省: 440000,
  广西壮族自治区: 450000,
  海南省: 460000,
  重庆市: 500000,
  四川省: 510000,
  贵州省: 520000,
  云南省: 530000,
  西藏自治区: 540000,
  陕西省: 610000,
  甘肃省: 620000,
  青海省: 630000,
  宁夏回族自治区: 640000,
  新疆维吾尔自治区: 650000,
  台湾省: 710000,
  香港特别行政区: 810000,
  澳门特别行政区: 820000,
};
const token = 'pk.eyJ1IjoiMTM1OTQzOTUxMzYiLCJhIjoiY2p6dWtrYTJ2MDZjYjNncGhicmQ5emNxaiJ9.vhAO6Rbm0OWX902bpp90pQ';
const maxValue = 250;
export default {
  name: 'Map',
  props: ['mapData'],
  data() {
    return {
      style: {
        height: `${window.innerHeight - 20}px`,
      },
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
    mapData() {

    },
  },
  methods: {
    resizeChart() {
      return _.throttle(() => {
        this.style.height = `${window.innerHeight - 20}px`;
      }, 400);
    },
    initMapbox() {
      const map = this.mapInstance;
      window.map = map;
      map.on('load', () => {
        map.flyTo({
          center: [107.80592052753099, 29.359559158104966],
          zoom: 5.5,
          speed: 0.15,
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
                console.log('key', key);
                map.addSource(String(adcodeMap[key]), {
                  type: 'geojson',
                  data: geo,
                });
              });
          });
        setTimeout(() => {
          statData.forEach(({ cities, locationId }) => {
            const expression = ['match', ['get', 'adcode']];
            cities.forEach((city) => {
              const red = (city.confirmedCount / maxValue);
              const color = `rgba(${255}, ${0}, ${0}, ${red})`;
              expression.push(city.locationId, color);
            });
            expression.push('rgba(0,0,0,0)');
            if (expression.length < 4) return;
            map.addLayer({
              id: String(locationId),
              type: 'fill',
              source: String(locationId),
              paint: {
                'fill-color': expression,
              },
            }, 'waterway-label');
          });
        }, 2000);
      });

      // const maxValue = 500;
      // geojson.features.forEach((item, index) => {
      //   item.id = index;
      //   item.properties.$index = index;
      // });
      // const expression = ['match', ['get', 'name']];
      //   const { provinceName, cities, locationId } = province;
      //   cities.forEach((row) => {
      //     const { cityName, confirmedCount } = row;
      //     const red = (confirmedCount / maxValue);
      //     const color = `rgba(${255}, ${0}, ${0}, ${red})`;
      //     expression.push(cityName, color);
      //   });
      //   expression.push('rgba(0,0,0,0)');
      //   map.addLayer({
      //     id: locationId,
      //     type: 'fill',
      //     source: provinceName,
      //     paint: {
      //       'fill-color': expression,
      //     },
      //   }, 'waterway-label');
      // });
      // map.addLayer({
      //   id: 'state-borders',
      //   type: 'line',
      //   source: 'cqgeojson',
      //   layout: {},
      //   paint: {
      //     'line-color': [
      //       'case',
      //       ['boolean', ['feature-state', 'hover'], false],
      //       'rgba(255,255,255,1)',
      //       'rgba(0,0,0,0)',
      //     ],
      //     'line-width': 2,
      //   },
      // });
    },
  },
  mounted() {
    this.$mapbox.accessToken = token;
    this.initMapbox();
    // window.addEventListener('resize', this.resizeChart());
  },
  destroyed() {
    // window.removeEventListener('resize', this.resizeChart());
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  .map-wraper
    width: 100%
    height: 100%
</style>
