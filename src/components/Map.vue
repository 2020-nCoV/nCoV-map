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
import provinceData from '../assets/data/20200201';

const LEVE_1 = '>1000人';
const LEVE_2 = '500-999人';
const LEVE_3 = '100-499人';
const LEVE_4 = '10-99人';
const LEVE_5 = '1-9人';
const COLOR_LEVE_1 = '#7F1818';
const COLOR_LEVE_2 = '#BF2121';
const COLOR_LEVE_3 = '#FF7B69';
const COLOR_LEVE_4 = '#FFAA85';
const COLOR_LEVE_5 = '#FFEDCC';

let max;
const min = 1;
const pinMax = 100;
const pinMin = 30;
export default {
  name: 'Map',
  props: {
    msg: String,
  },
  data() {
    return {
      style: { width: '100%', height: `${window.innerHeight - 20}px` },
    };
  },
  computed: {
    echartsInstance() {
      return this.$echarts.init(document.getElementById('myChart'));
    },
  },
  methods: {
    resizeChart() {
      return _.throttle(() => {
        this.style.height = `${window.innerHeight - 20}px`;
        this.echartsInstance.resize();
      }, 400);
    },
    getGeoCoordMap(featuresData) {
      // {"天津": [117.190182, 39.125596]}
      const geoCoordMap = {};
      featuresData.forEach((v) => {
        const { name } = v.properties;
        geoCoordMap[name] = v.properties.cp;
      });
      return geoCoordMap;
    },
    convertProvinceDataWithCp(data) {
      // {name: "天津", value: [117.190182, 39.125596, 42]}
      const cpData = this.getGeoCoordMap(chinaJson.features);
      const newData = [];
      for (let i = 0; i < data.length; i += 1) {
        const { name } = data[i];
        newData.push({ name: data[i].name, value: cpData[name].concat(data[i].value) });
      }
      return newData;
    },
    convertProvinceData(data) {
      // {name: "天津", value: [42, '10-99人']}
      const newData = [];
      for (let i = 0; i < data.length; i += 1) {
        const temp = data[i].value;
        let category = '';
        if (temp >= 1000) {
          category = LEVE_1;
        } else if (temp >= 500 && temp <= 999) {
          category = LEVE_2;
        } else if (temp >= 100 && temp <= 499) {
          category = LEVE_3;
        } else if (temp >= 10 && temp <= 99) {
          category = LEVE_4;
        } else if (temp >= 1 && temp <= 9) {
          category = LEVE_5;
        }
        newData.push({ name: data[i].name, value: [temp, category] });
      }
      return newData;
    },
    drawMap() {
      const mapName = 'china';
      this.$echarts.registerMap(mapName, chinaJson, {});
      this.echartsInstance.setOption({
        title: {
          text: `${provinceData.date} 疫情地图`,
          subtext: `更新于 ${provinceData.date} 00:09`,
          x: 'center',
          y: '60',
          textStyle: {
            fontWeight: 'normal',
          },
        },
        toolbox: {
          show: true,
          x: 'center',
          y: 'bottom',
          feature: {
            saveAsImage: {},
          },
        },
        visualMap: {
          type: 'piecewise',
          show: true,
          min: 0,
          max: 200000,
          left: '200',
          bobttom: '60',
          calculable: true,
          seriesIndex: [1],
          categories: [LEVE_1, LEVE_2, LEVE_3, LEVE_4, LEVE_5],
          inRange: {
            color: [COLOR_LEVE_1, COLOR_LEVE_2, COLOR_LEVE_3, COLOR_LEVE_4, COLOR_LEVE_5],
          },
        },
        geo: {
          show: true,
          map: mapName,
          roam: true,
          label: {
            show: true,
            position: 'right',
            // distance: '10',
            offset: [0, 5],
            color: '#000',
            fontWeight: 'bold',
            fontSize: '11',
          },
          itemStyle: {
            normal: {
              // areaColor: '#031525',
              // borderColor: '#fff',
            },
            emphasis: {
              areaColor: '#e7e7e7',
              borderColor: '#FF6258',
              borderWidth: '5',
            },
          },
        },
        series: [
          {
            name: '气泡',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: this.convertProvinceDataWithCp(provinceData.data),
            symbol: 'pin',
            symbolSize(val) {
              max = provinceData.data.map(item => item.value).sort((a, b) => a - b).pop();
              const d = (pinMax - pinMin) / (max - min);
              return pinMax - (max - val[2]) * d;
            },

            label: {
              normal: {
                formatter(val) {
                  return val.value[2];
                },
                show: true,
                textStyle: {
                  color: '#000',
                  fontSize: 9,
                },
              },
            },
            itemStyle: {
              normal: {
                color: '#FFC900',
              },
            },
            zLevel: 6,
          },
          {
            type: 'map',
            map: mapName,
            geoIndex: 0,
            data: this.convertProvinceData(provinceData.data),
            aspectScale: 0.75,
            zoom: 1,
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            boundingCoords: [
              [-180, 90],
              [180, -90],
            ],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'inside',
                  color: '#000',
                  fontWeight: 'bold',
                },
              },
              areaColor: '#fff',
            },
          },
        ],
      });
    },
  },
  mounted() {
    this.drawMap();
    window.addEventListener('resize', this.resizeChart());
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeChart());
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.map-wraper
  width: 100%
  height: 100%
</style>
