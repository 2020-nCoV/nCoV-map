<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose">
    <el-menu-item index="1">
      <i class="el-icon-menu"></i>
      <span slot="title">实时疫情</span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="el-icon-first-aid-kit"></i>
      <span slot="title">援助武汉</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-s-promotion"></i>
      <span slot="title">人口迁移</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-timer"></i>
      <span slot="title">时间序列分析</span>
    </el-menu-item>
    <el-menu-item index="5">
      <i class="el-icon-location-information"></i>
      <span slot="title">空间结构分析</span>
    </el-menu-item>
    <el-menu-item index="6">
      <i class="el-icon-chat-line-square"></i>
      <span slot="title">疫情驱动分析</span>
    </el-menu-item>
    <el-menu-item index="7">
      <i class="el-icon-connection"></i>
      <span slot="title">舆情分析</span>
    </el-menu-item>
    <el-menu-item index="8">
      <i class="el-icon-document"></i>
      <span slot="title">问卷分析</span>
    </el-menu-item>
    <el-menu-item index="9">
      <i class="el-icon-s-data"></i>
      <span slot="title">统计分析</span>
    </el-menu-item>
    <el-menu-item index="10">
      <i class="el-icon-message-solid"></i>
      <span slot="title">预警分析</span>
    </el-menu-item>
  </el-menu>
</template>

<script>

export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },

};
</script>
