<template>
  <div :style='style'>
    <el-menu
      :default-active="defaultActive"
      @select='handleSelect'
      >
      <el-menu-item v-for="(item, index) in menus" :index="`${index + 1}`" :key="item.icon">
        <i :class="item.icon"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  data() {
    return {
      style: { height: `${window.innerHeight - 80}px` },
      defaultActive: '1',
      menus: [
        { name: '实时疫情', icon: 'el-icon-menu', value: 'situation' },
        { name: '援助武汉', icon: 'el-icon-first-aid-kit', value: 'support' },
        { name: '人口迁移', icon: 'el-icon-s-promotion', value: 'migrate' },
        { name: '时间序列分析', icon: 'el-icon-timer', value: 'time-analyse' },
        { name: '空间结构分析', icon: 'el-icon-location-information', value: 'space-analyse' },
        { name: '疫情驱动分析', icon: 'el-icon-chat-line-square', value: 'drive-analyse' },
        { name: '舆情分析', icon: 'el-icon-connection', value: 'public-opinion' },
        { name: '问卷分析', icon: 'el-icon-document', value: 'question' },
        { name: '统计分析', icon: 'el-icon-s-data', value: 'statistics' },
        { name: '预警分析', icon: 'el-icon-message-solid', value: 'alarm' },
      ],
    };
  },
  methods: {
    resizeNav() {
      return _.throttle(() => {
        this.style.height = `${window.innerHeight - 80}px`;
      });
    },
    handleSelect(index) {
      const path = this.menus[index - 1].value;
      this.$router.push(path).catch((e) => {
        if (e.name !== 'NavigationDuplicated') { throw new Error(e); }
      });
    },
    getIndexOfPath(path) {
      for (let i = 0; i < this.menus.length; i += 1) {
        if (path.slice(1) === this.menus[i].value) {
          return `${i + 1}`;
        }
      }
      return '0';
    },
  },
  watch: {
    $route: {
      handler(to) {
        const { path } = to;
        const index = this.getIndexOfPath(path);
        this.defaultActive = index;
      },
      immediate: true,
    },
  },
  mounted() {
    window.addEventListener('resize', this.resizeNav());
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeNav());
  },
};
</script>
