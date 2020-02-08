<template>
  <div id="mapapp"></div>
</template>

<script>

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from '@/utils/http';

import chinaJson from '../assets/maps/100000_full.json';

const LEVEL_1 = '1000';
const LEVEL_2 = '500';
const LEVEL_3 = '100';
const LEVEL_4 = '10';
const LEVEL_5 = '1';
const COLOR_LEVEL_1 = '#7F1818';
const COLOR_LEVEL_2 = '#BF2121';
const COLOR_LEVEL_3 = '#FF7B69';
const COLOR_LEVEL_4 = '#FFAA85';
const COLOR_LEVEL_5 = '#FFEDCC';

const PROVINCE_ADCODES = [
  '110000', '120000', '130000', '130000', '140000', '150000', '210000', '220000', '230000',
  '310000', '320000', '330000', '330000', '340000', '350000', '360000', '370000',
  '410000', '420000', '430000', '430000', '440000', '450000', '460000', '500000',
  '510000', '520000', '530000', '530000', '540000', '610000', '620000', '630000', '640000',
  '650000', '710000', '810000', '820000'];

export default {
  name: 'EpidemicMap',
  props: ['mapData'],
  data() {
    return {
      map: null,
      mapdata: null,
      epidemicData: null,
      outLineLayer: null,
      fullBounds: null,
      provinceLayer: null,
      cityLayer: null,
      outLineStyle: {
        weight: 8,
        opacity: 0.7,
        color: '#414141',
        fillOpacity: 0,
      },
      areaStat: null,
      isCityLevelView: true,
    };
  },
  methods: {
    initMap() {
      const opt = {
        minZoom: 3,
        maxZoom: 14,
        center: [31, 107],
        zoom: 4,
        zoomControl: true,
        attributionControl: false,
        crs: L.CRS.EPSG3857,
        doubleClickZoom: false,
      };

      this.map = L.map('mapapp', opt);
      this.addTileBaseMap();
      // 双击展示市级数据
      this.map.on('dblclick', () => {
        if (this.isCityLevelView) this.addProvincesMap();
        else this.addCitysMap();
      });
    },
    getColor(d) {
      let color = '#FFFFFF';
      if (d > LEVEL_1) {
        color = COLOR_LEVEL_1;
      } else if (d > LEVEL_2) {
        color = COLOR_LEVEL_2;
      } else if (d > LEVEL_3) {
        color = COLOR_LEVEL_3;
      } else if (d > LEVEL_4) {
        color = COLOR_LEVEL_4;
      } else if (d > LEVEL_5) {
        color = COLOR_LEVEL_5;
      }
      return color;
    },
    mapStyle(feature) {
      return {
        weight: 1,
        opacity: 1,
        color: '#414141',
        fillOpacity: 0.7,
        fillColor: this.getColor(feature.properties.density),
      };
    },
    highlightFeature(e) {
      const layer = e.target;
      layer.setStyle({
        weight: 2,
        opacity: 0.7,
        color: '#414141',
        fillOpacity: 1.3,
      });
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    },
    resetHighlight(e) {
      this.provinceLayer.resetStyle(e.target);
    },
    zoomToFeature(e) {
      this.map.fitBounds(e.target.getBounds());
    },
    onEachFeature(feature, layer) {
      layer.on({
        mouseover: this.highlightFeature,
        mouseout: this.resetHighlight,
        click: this.zoomToFeature,
      });
    },
    addTileBaseMap() {
      const osmURL = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      L.tileLayer(osmURL).addTo(this.map);
    },
    getData(url) {
      return new Promise((resolve) => {
        const res = axios.request({ url });
        resolve(res);
      });
    },
    injectDataToMap(features, data) {
      let prop;
      let name;
      features.forEach((elem) => {
        prop = elem.properties;
        data.forEach((item) => {
          // TODO: 市级匹配算法
          // 市、洲、自治州、盟等
          name = this.isCityLevelView ? item.cityName : item.provinceName || '';
          if (prop.name.slice(0, 2) === name.slice(0, 2)) {
            // elem.properties.density = item.value;
            prop.density = item.confirmedCount || 0;
            prop.confirmedCount = item.confirmedCount || 0;
            prop.suspectedCount = item.suspectedCount || 0;
            prop.deadCount = item.deadCount || 0;
            prop.curedCount = item.curedCount || 0;
            if (item.cities) {
              prop.cities = item.cities;
            }
          }
        });
      });
    },
    getProvinceName(adcode) {
      const table = new Map();
      const table2 = [
        ['110000', '北京'],
        ['120000', '天津'],
        ['130000', '河北'],
        ['140000', '山西'],
        ['150000', '内蒙古'],
        ['210000', '辽宁'],
        ['220000', '吉林'],
        ['230000', '黑龙江'],
        ['310000', '上海'],
        ['320000', '江苏'],
        ['330000', '浙江'],
        ['340000', '安徽'],
        ['350000', '福建'],
        ['360000', '江西'],
        ['370000', '山东'],
        ['410000', '河南'],
        ['420000', '湖北'],
        ['430000', '湖南'],
        ['440000', '广东'],
        ['450000', '广西'],
        ['460000', '海南'],
        ['500000', '重庆'],
        ['510000', '四川'],
        ['520000', '贵州'],
        ['530000', '云南'],
        ['540000', '西藏'],
        ['610000', '陕西'],
        ['620000', '甘肃'],
        ['630000', '青海'],
        ['640000', '宁夏'],
        ['650000', '新疆'],
        ['710000', '台湾'],
        ['810000', '香港'],
        ['820000', '澳门'],
      ];
      table2.forEach((e) => {
        table.set(e[0], e[1]);
      });
      return table.get(adcode.toString());
    },
    bindPopup(layer) {
      layer.eachLayer((lyr) => {
        const props = lyr.feature.properties;
        const epidemicInfo = `${props.name}:
        确诊病例：${props.confirmedCount}
        死亡病例：${props.deadCount}
        治愈病例：${props.curedCount}
        怀疑病例：${props.suspectedCount}
        `;
        lyr.bindPopup(epidemicInfo);
      });
    },
    addProvincesMap() {
      this.isCityLevelView = false;

      axios.request({ url: '/data.json' }).then((res) => {
        if (res.data.ok) {
          this.areaStat = res.data.data.getAreaStat;
          this.injectDataToMap(chinaJson.features, this.areaStat);
          this.provinceLayer = L.geoJSON(chinaJson.features, {
            style: this.mapStyle,
            onEachFeature: this.onEachFeature,
          }).addTo(this.map);
          this.bindPopup(this.provinceLayer);
        }
      });
    },
    addCitysMap() {
      this.isCityLevelView = true;
      this.map.removeLayer(this.provinceLayer);
      const data = new Map();

      this.areaStat.forEach((item) => {
        data.set(
          item.provinceShortName,
          item.cities,
        );
      });
      const citysData = [];
      const { origin } = window.location;

      PROVINCE_ADCODES.forEach((adcode) => {
        citysData.push(axios.request({ url: `${origin}/assets/geojson/${adcode}.json` }).then((res) => {
          if (res.status === 200) {
            return res.data;
          }
          return null;
        }));
      });
      let provinceCode;
      let provinceName;
      Promise.all(citysData).then((results) => {
        results.forEach((citys) => {
          provinceCode = citys.features[0].properties.parent.adcode;
          provinceName = this.getProvinceName(provinceCode);
          this.injectDataToMap(citys.features, data.get(provinceName));
          const cityLayer = L.geoJSON(citys.features, {
            style: this.mapStyle,
            onEachFeature: this.onEachFeature,
          }).addTo(this.map);
          this.bindPopup(cityLayer);
        });
      });
    },
    loadData() {
      this.addProvincesMap();
      // this.addCitysMap();
    },
  },
  mounted() {
    this.initMap();
    this.loadData();
  },
};
</script>

<style scoped>
/* 地图容器 */
#mapapp {
  background: #ffffff;
  width: 100%;
  height: 100%;
}
</style>
