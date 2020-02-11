import { fetchData, fetchInfectionData } from '@/api';
import * as types from '../actions-type';

export default {
  namespaced: true,
  state: {
    provinceData: null,
    infectionData: null,
  },
  mutations: {
    [types.SET_PROVINCEDATA](state, payload) {
      state.provinceData = payload;
    },
    [types.SET_INFECTIONDATA](state, payload) {
      state.infectionData = payload;
    },
  },
  actions: {
    async [types.SET_PROVINCEDATA]({ commit }) {
      const { data } = await fetchData();
      if (data.ok) {
        commit(types.SET_PROVINCEDATA, data.data);
      }
    },
    async [types.SET_INFECTIONDATA]({ commit }) {
      const { data } = await fetchInfectionData();
      if (data.ok) {
        commit(types.SET_INFECTIONDATA, data.data);
      }
    },
  },
};
