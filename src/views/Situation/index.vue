<template>
    <div class="situation">
        <!-- <span class='subtitle'>实时疫情</span> -->
        <TopNav></TopNav>
        <Map :mapData='provinceData'/>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import * as types from '../../store/actions-type';
import Map from '@/components/InfectionMap.vue';
import TopNav from '@/components/TopNav.vue';

const { mapActions, mapState } = createNamespacedHelpers('situation');
export default {
  components: {
    Map,
    TopNav,
  },
  computed: {
    ...mapState(['provinceData']),
  },
  methods: {
    ...mapActions([types.SET_PROVINCEDATA, types.GET_GEO]),
  },
  mounted() {
    try {
      this[types.SET_PROVINCEDATA]();
    } catch (e) {
      throw new Error();
    }
  },
};
</script>

<style scoped>
.situation {
  width: 100%;
  height: 100%;
}
</style>
