<template>
    <div>
        <!-- <h1>实时疫情</h1> -->
        <Map :mapData='provinceData'/>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import Map from '../../components/Mapbox.vue';
// import Map from '../../components/Map.vue';
import * as types from '../../store/actions-type';

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
