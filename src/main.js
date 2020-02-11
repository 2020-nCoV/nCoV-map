import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';
import * as echarts from 'echarts';
import mapbox from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './theme/style.css';
import App from './index.vue';
import router from './router';
import store from './store';

Vue.use(ElementUI, { locale });
Vue.prototype.$echarts = echarts;
Vue.prototype.$mapbox = mapbox;

Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  const { isLogin } = store.state;
  // if (to.path === '/login') {
  //   localStorage.removeItem('token');
  // }
  // let token = localStorage.getItem('token');
  // const outtime = false;
  // if (token) {
  //   // 如果token失效，outtime设为true
  // } else {
  //
  // }
  if (!isLogin && to.meta.needLogin) {
    router.replace({
      path: '/login',
      query: { redirect: to.path },
    });
  } else {
    next();
  }
});
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
