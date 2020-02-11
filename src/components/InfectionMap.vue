<template>
  <div class="map-wp">
    <div id='infection-map' :style=style></div>
  </div>
</template>

<script>

import MapboxLanguage from '@mapbox/mapbox-gl-language';
import adcodeMap from '@/assets/maps/adcodeMap';
import statData from '@/assets/statData';
import axios from '@/utils/http';

const MAP_TOKEN = 'pk.eyJ1IjoiOTI0MTUyNjUxIiwiYSI6ImNrNjkwdXYwNjBhMzUzZHBtZHZqMHc1Y3QifQ.-ghyt3JdDn12Wk31yifDLw';
const MAP_STYLE = 'mapbox://styles/mapbox/streets-v10';
const MAP_ZOOM = 3.1012459845601623;
const MAP_CENTER = [106.90464586973894, 38.38927373581919];
// const MAX_VALUE = 4109;

const LEVEL_1 = '1000';
const LEVEL_2 = '500';
const LEVEL_3 = '100';
const LEVEL_4 = '10';
const LEVEL_5 = '1';
const COLOR_LEVEL_1 = 'rgba(255,0,0,0.9)'; // '#7F1818';
const COLOR_LEVEL_2 = 'rgba(255,0,0,0.7)'; // '#BF2121';
const COLOR_LEVEL_3 = 'rgba(255,0,0,0.5)'; // '#FF7B69';
const COLOR_LEVEL_4 = 'rgba(255,0,0,0.25)'; // '#FFAA85';
const COLOR_LEVEL_5 = 'rgba(255,0,0,0.2)'; // '#FFEDCC';
const COLOR_EMPTY = 'rgba(255, 255, 255, 0.5)';

export default {
  name: 'InfectionMap',
  props: ['mapData'],
  data() {
    return {
      style: {
        height: `${window.innerHeight}px`,
      },
      infectionLayers: [],
      statData: [],
      allLayer: [],
    };
  },
  computed: {
    mapApp() {
      return new this.$mapbox.Map({
        container: 'infection-map',
        style: MAP_STYLE,
        center: MAP_CENTER,
        zoom: MAP_ZOOM,
      });
    },
  },
  methods: {
    initMap() {
      window.map = this.mapApp;
      this.addMapControl();
      this.mapApp.on('load', async () => {
        this.loadingGeoData();
      });
    },
    addAllLayer() {
      this.infectionLayers.forEach((lyr) => {
        this.mapApp.addLayer(lyr);
      });
    },
    removeAllLayer() {
      this.allLayer.forEach((id) => {
        if (this.mapApp.getLayer(id)) this.mapApp.removeLayer(id);
      });
    },
    drawMap(mapData) {
      // if (this.allLayer.length !== 0) {
      //   this.removeAllLayer();
      // }
      this.prepare(mapData);

      if (this.infectionLayers.length !== 0) {
        this.addAllLayer();
      }
    },
    addMapControl() {
      this.mapApp.addControl(new this.$mapbox.NavigationControl(), 'top-right');
      this.mapApp.addControl(new this.$mapbox.FullscreenControl());
      this.mapApp.addControl(new MapboxLanguage());
    },
    prepare(mapData) {
      this.infectionLayers = [];
      mapData.forEach(({ cities, locationId }) => {
        this.allLayer.push(locationId);
        const colorExp = ['match', ['get', 'adcode']];
        cities.forEach((city) => {
          const color = this.getColor(city.confirmedCount);
          if (city.locationId !== 0) colorExp.push(city.locationId, color);
        });
        colorExp.push('rgba(255,0,0,0.1)');

        if (colorExp.length < 4) return;
        this.infectionLayers.push({
          id: String(locationId),
          type: 'fill',
          source: String(locationId),
          paint: {
            'fill-color': colorExp,
          },
        });
      });
    },
    async loadingGeoData() {
      const diff = [];
      const { origin } = window.location;
      let adcode;
      Object.keys(adcodeMap)
        .forEach((key) => {
          adcode = adcodeMap[key];
          diff.push(
            axios.request({ url: `${origin}/assets/geojson/${adcode}.json` })
              .then(res => ({
                key,
                geojson: res.data,
              })),
          );
        });
      const geofiles = await Promise.all(diff);
      geofiles.forEach(({ key, geojson }) => {
        this.mapApp.addSource(String(adcodeMap[key]), {
          type: 'geojson',
          data: geojson,
        });
      });
      this.drawMap(this.mapData.getAreaStat || statData);
    },
    getColor(d) {
      let color = COLOR_EMPTY;
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
    resize() {
      this.style.height = `${window.innerHeight}px`;
    },
  },
  watch: {
    mapData(newData) {
      if (newData && this.mapApp.isStyleLoaded()) {
        this.drawMap(newData.getAreaStat);
      }
    },
  },
  mounted() {
    window.addEventListener('resize', this.resize);
    this.$mapbox.accessToken = MAP_TOKEN;
    this.initMap();
  },
  destroyed() {
    window.removeEventListener('resize', this.resize);
  },
};
</script>

<style scoped lang="stylus">
.map-wp
  width: 100%
  height: 100%
</style>
