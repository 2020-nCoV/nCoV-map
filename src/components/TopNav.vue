<template>
    <div class='switch-button'>
        <el-radio-group v-model="type" size="small">
        <el-radio-button label="实时"></el-radio-button>
        <el-radio-button label="历史"></el-radio-button>
        </el-radio-group>
    </div>
</template>

<script>
export default {
  data() {
    return {
      type: '实时',
    };
  },
  methods: {

  },
};
</script>

<style scoped>
.switch-button {
  position: fixed;
  z-index: 10;
  left: 50%;
  margin-left: -50px;
  margin-top: 10px;
}

@media (max-width:719px) {
  .switch-button {
    left: unset;
    right: 40px;
  }
}
</style>
