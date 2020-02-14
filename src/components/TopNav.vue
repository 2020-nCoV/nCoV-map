<template>
    <div class='switch-button' v-if='isShow'>
        <el-radio-group v-model="type" size="small" @change='handleSwitch'>
        <el-radio-button label="situation">实时</el-radio-button>
        <el-radio-button label="statistics">历史</el-radio-button>
        </el-radio-group>
    </div>
</template>

<script>
export default {
  data() {
    return {
      type: 'situation',
      isShow: false,
    };
  },
  methods: {
    handleSwitch(value) {
      this.$router.push(value);
    },
  },
  watch: {
    $route: {
      handler(to) {
        const { path } = to;
        this.type = path.slice(1);
      },
      immediate: true,
    },
  },
  mounted() {
    this.$bus.$on('mapReady', (value) => {
      this.isShow = !!value;
    });
  },
};
</script>

<style scoped>
.switch-button {
  position: fixed;
  z-index: 10;
  left: 50%;
  margin-left: -50px;
  margin-top: 2px;
}

@media (max-width:719px) {
  .switch-button {
    left: unset;
    right: 40px;
  }
}
</style>
