<template>
    <div class="situation">
        <span class='subtitle'>实时疫情</span>
        <!-- <Map :mapData='provinceData'/> -->
        <div class='todo'>TODO： 实时疫情打点展示 以及 疫情数据图表展示</div>
        <DataBoard></DataBoard>
        <FilterBox></FilterBox>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import * as types from '../../store/actions-type';
// import Map from '@/components/InfectionMap.vue';
import DataBoard from '@/components/DataBoard.vue';
import FilterBox from '@/components/FilterBox.vue';
import statData from '@/assets/statData';

const { mapActions } = createNamespacedHelpers('situation');
export default {
  components: {
    // Map,
    DataBoard,
    FilterBox,
  },
  computed: {
    // ...mapState(['provinceData']),
  },
  methods: {
    // ...mapActions([types.SET_PROVINCEDATA]),
    ...mapActions([types.SET_INFECTIONDATA, types.GET_GEO]),
  },
  mounted() {
    this.$store.commit(`situation/${types.SET_INFECTIONDATA}`, statData);
    // try {
    //   this[types.SET_INFECTIONDATA]();
    // } catch (e) {
    //   throw new Error();
    // }
  },
};
</script>

<style scoped>
</style>
