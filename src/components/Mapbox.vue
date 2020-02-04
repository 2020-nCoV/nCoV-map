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
// import ad110000 from '../assets/geojson/110000';
// import ad120000 from '../assets/geojson/120000';
// import ad130000 from '../assets/geojson/130000';
// import ad140000 from '../assets/geojson/140000';
// import ad150000 from '../assets/geojson/150000';
// import ad210000 from '../assets/geojson/210000';
// import ad220000 from '../assets/geojson/220000';
// import ad230000 from '../assets/geojson/230000';
// import ad310000 from '../assets/geojson/310000';
// import ad320000 from '../assets/geojson/320000';
// import ad330000 from '../assets/geojson/330000';
// import ad340000 from '../assets/geojson/340000';
// import ad350000 from '../assets/geojson/350000';
// import ad360000 from '../assets/geojson/360000';
// import ad370000 from '../assets/geojson/370000';
// import ad410000 from '../assets/geojson/410000';
// import ad420000 from '../assets/geojson/420000';
// import ad430000 from '../assets/geojson/430000';
// import ad440000 from '../assets/geojson/440000';
// import ad450000 from '../assets/geojson/450000';
// import ad460000 from '../assets/geojson/460000';
// import ad500000 from '../assets/geojson/500000';
// import ad510000 from '../assets/geojson/510000';
// import ad520000 from '../assets/geojson/520000';
// import ad530000 from '../assets/geojson/530000';
// import ad540000 from '../assets/geojson/540000';
// import ad610000 from '../assets/geojson/610000';
// import ad620000 from '../assets/geojson/620000';
// import ad630000 from '../assets/geojson/630000';
// import ad640000 from '../assets/geojson/640000';
// import ad650000 from '../assets/geojson/650000';
// import ad710000 from '../assets/geojson/710000';
// import ad810000 from '../assets/geojson/810000';
// import ad820000 from '../assets/geojson/820000';
import statData from '../assets/statData';

// const codeGeoJsonMap = {
//   ad110000,
//   // ad120000,
//   // ad130000,
//   // ad140000,
//   // ad150000,
//   // ad210000,
//   // ad220000,
//   // ad230000,
//   // ad310000,
//   // ad320000,
//   // ad330000,
//   // ad340000,
//   // ad350000,
//   // ad360000,
//   // ad370000,
//   // ad410000,
//   // ad420000,
//   // ad430000,
//   // ad440000,
//   // ad450000,
//   // ad460000,
//   // ad500000,
//   // ad510000,
//   // ad520000,
//   // ad530000,
//   // ad540000,
//   // ad610000,
//   // ad620000,
//   // ad630000,
//   // ad640000,
//   // ad650000,
//   // ad710000,
//   // ad810000,
//   // ad820000,
// };

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
const maxValue = 200;
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
          statData.forEach(({ provinceName, cities, locationId }) => {
            const expression = ['match', ['get', 'adcode']];
            cities.forEach((city) => {
              const red = (city.confirmedCount / maxValue);
              const color = `rgba(${255}, ${0}, ${0}, ${red})`;
              expression.push(city.locationId, color);
            });
            expression.push('rgba(0,0,0,0)');
            if (expression.length < 4) return;
            console.log('provinceName', provinceName);
            console.log('expression', expression);
            setTimeout(() => {
              map.addLayer({
                id: String(locationId),
                type: 'fill',
                source: String(locationId),
                paint: {
                  'fill-color': expression,
                },
              }, 'waterway-label');
            }, 0);
          });
        }, 5000);
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
