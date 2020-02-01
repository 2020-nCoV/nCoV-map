<template>
    <div>
        <BigMap></BigMap>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import * as types from '../../store/actions-type';
import BigMap from '../../components/BigMap.vue';

const { mapActions, mapState } = createNamespacedHelpers('situation');

export default {
  components: {
    BigMap,
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
