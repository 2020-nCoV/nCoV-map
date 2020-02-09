<template>
    <div class="situation">
        <span class='subtitle'>实时疫情</span>
        <Map :mapData='provinceData'/>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import * as types from '../../store/actions-type';
import Map from '@/components/InfectionMap.vue';

const { mapActions, mapState } = createNamespacedHelpers('situation');
export default {
  components: {
    Map,
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
