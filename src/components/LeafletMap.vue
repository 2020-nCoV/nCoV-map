<template>
  <div id="mapapp"></div>
</template>

<script>

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import chinaJson from '../assets/maps/100000_full.json';
import provinceData from '../assets/data/20200201';

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

// const CHINA_ADCODE = '100000_full';
// const CHINA_OUTLINE_ADCODE = '100000';
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
        const res = axios.get(url);
        resolve(res);
      });
    },
    injectDataToMap(features, data) {
      features.forEach((elem) => {
        data.forEach((item) => {
          if (elem.properties.name === item.name) {
            elem.properties.density = item.value;
          }
        });
      });
    },
    addProvincesMap() {
      this.injectDataToMap(chinaJson.features, provinceData.data);
      this.provinceLayer = L.geoJSON(chinaJson.features, {
        style: this.mapStyle,
        onEachFeature: this.onEachFeature,
      }).addTo(this.map);
    },
    addCitysMap() {
      // console.log(chinaJson);
      // console.log(provinceData);
      // this.injectDataToMap(chinaJson.features, provinceData.data);

      const citysData = [];
      PROVINCE_ADCODES.forEach((adcode) => {
        citysData.push(axios(`/province/${adcode}_full.json`).then((res) => {
          if (res.status === 200) {
            return res.data;
          }
          return null;
        }));
      });
      Promise.all(citysData).then((results) => {
        console.log('all done', results);
        results.forEach((city) => {
          L.geoJSON(city.features, {
            style: this.mapStyle,
            onEachFeature: this.onEachFeature,
          }).addTo(this.map);
        });
      });
    },
    loadData() {
      // this.addProvincesMap();
      this.addCitysMap();
    },
  },
  mounted() {
    this.initMap();
    this.loadData();
  },
};
</script>

<style scoped>
/* 整体 map 样式 */
#mapapp {
  background: #ffffff;
  position: absolute;
  height: 560px;
  width: 100%;
  margin-left: 153px;
  top: 53px;
}
</style>
