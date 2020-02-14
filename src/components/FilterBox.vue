<template>
  <div class='filter-box'>
      <div class='tool-wrapper' @click='handleToolbar'>
        <span class='box-title'>数据分析</span>
        <i class='icon' :class='iconStyle'></i>
      </div>
      <transition name='slide'>
        <div class='chart-panel' v-if='isShow'>

          <div class='filter-item map-opt'>
            <el-select
            v-model="modeValue"
            placeholder="地图模式"
            size='small'
            >
              <el-option
                v-for="item in modeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div class='filter-item'>
            <el-select
            v-model="blValue"
            placeholder="病例类型"
            size='small'
            >
              <el-option
                v-for="item in blOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div class='filter-item'>
            <el-select
            v-model="areaValue"
            placeholder="区域"
            size='small'
            >
              <el-option
                v-for="item in areaOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div class='chart-wrapper'>
            <LineChart :cData='infectionData'></LineChart>
          </div>

        </div>
      </transition>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue';

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      isShow: true,
      blValue: '0',
      modeValue: '0',
      areaValue: '0',
      modeOptions: [
        { value: '0', label: '地图着色' },
        { value: '1', label: '地图打点' },
        { value: '2', label: '地图热力' },
      ],
      blOptions: [
        { value: '0', label: '确诊' },
        { value: '1', label: '疑似' },
        { value: '2', label: '治愈' },
        { value: '3', label: '死亡' },
      ],
      areaOptions: [
        { value: '0', label: '全国' },
        { value: '1', label: '湖北' },
        { value: '2', label: '非湖北' },
      ],
      infectionData: {

      },
    };
  },
  computed: {
    iconStyle() {
      return this.isShow ? 'el-icon-caret-left' : 'el-icon-caret-right';
    },
  },
  methods: {
    handleToolbar() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style lang="stylus" scoped>
.filter-box
  position: fixed;
  top: 150px;
  right: 10px;
  z-index: 9;

.tool-wrapper
  box-sizing: border-box;
  padding: 5px;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  .icon
    position: absolute;
    bottom: 5px;
    left: 5px;
  &:hover
    background-color: #eee;

.box-title
  padding-top: 8px;
  padding-bottom: 12px;
  font-size: 13px;
  writing-mode: vertical-rl;
  letter-spacing: 3px;

.filter-item
  display: inline-block;
  margin-left: 10px;
  margin-top: 10px;

.chart-panel
  top: 0;
  right: 25px;
  width: 350px;
  height: 300px;
  position: absolute;
  border-radius: 4px 0 4px 4px;
  background-color: #fff;

.chart-wrapper
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;

.slide-enter
  opacity: 0
  transform: translate3d(10%, 0, 0)

.slide-enter-to
  opacity: 1
  transform: translate3d(0, 0, 0)

.slide-leave-to
  opacity: 0
  transform: translate3d(100%, 0, 0)

.slide-enter-active
.slide-leave-active
  transition: all 0.3s ease


.map-opt .el-select.el-select--small
 width: 120px;

.el-select.el-select--small
 width: 80px;

</style>
