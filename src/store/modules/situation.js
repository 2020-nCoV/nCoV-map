import { fetchData } from '@/api';
import * as types from '../actions-type';

export default {
  namespaced: true,
  state: {
    provinceData: null,
  },
  mutations: {
    [types.SET_PROVINCEDATA](state, payload) {
      state.provinceData = payload;
    },
  },
  actions: {
    async [types.SET_PROVINCEDATA]({ commit }) {
      const { data } = await fetchData();
      if (data.ok) {
        commit(types.SET_PROVINCEDATA, data.data);
      }
    },
  },
};
