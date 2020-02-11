<template>
    <div>
        <span class='subtitle'> 疫情历史</span>
        <div class='todo'>TODO： 历史数据在地图播放</div>
    </div>
</template>

<script>
import * as types from '@/store/actions-type';

export default {
  name: 'Statistics',
  mounted() {
    this.$store.commit(`situation/${types.SET_INFECTIONDATA}`, null);
  },
};
</script>
