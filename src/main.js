import Vue from 'vue';
import './plugins/element';
import './plugins/echarts';
import mapbox from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './theme/style.css';
import App from './index.vue';
import router from './router';
import store from './store';

Vue.prototype.$mapbox = mapbox;
Vue.prototype.$bus = new Vue();

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
