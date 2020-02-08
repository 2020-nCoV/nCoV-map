<template>
    <div>
        <span class='subtitle'>援助武汉</span>
        <Mapbox></Mapbox>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import * as types from '../../store/actions-type';
import Mapbox from '../../components/Mapbox.vue';

const { mapActions, mapState } = createNamespacedHelpers('situation');

export default {
  components: {
    Mapbox,
  },
  computed: {
    ...mapState(['provinceData']),
  },
  methods: {
    ...mapActions([types.SET_PROVINCEDATA]),
  },
  mounted() {
    this[types.SET_PROVINCEDATA]();
  },
};
</script>
