import Vue from 'vue';
import Vuex from 'vuex';

import * as types from './actions-type';
import situation from './modules/situation';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
  },
  mutations: {
    [types.SET_ISLOGIN](state, payload) {
      state.isLogin = payload;
    },
  },
  actions: {
  },
  modules: {
    situation,
  },
});
