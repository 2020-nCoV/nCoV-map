import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';
import * as echarts from 'echarts';
import mapbox from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './assets/index.css';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(ElementUI, { locale });
Vue.prototype.$echarts = echarts;
Vue.prototype.$mapbox = mapbox;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
