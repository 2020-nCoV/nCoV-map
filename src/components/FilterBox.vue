<template>
  <div class='filter-box'>
      <div class='tool-wrapper' @click='handleToolbar'>
        <span class='box-title'>数据过滤</span>
        <i class='icon' :class='iconStyle'></i>
      </div>
      <transition name='slide'>
        <div class='tool-panel' v-if='isShow'>

        <div class='filter-group'>
          <div class='filter-title'>地图模式</div>
          <el-radio-group class='filter-item' v-model='modeValue' size='mini' >
            <el-radio-button label='0'>着色</el-radio-button>
            <el-radio-button label='1'>打点</el-radio-button>
            <el-radio-button label='2'>热力</el-radio-button>
          </el-radio-group>
        </div>

        <div class='filter-group'>
          <div class='filter-title'>病例类型</div>
          <el-radio-group class='filter-item' v-model='type' size='mini' @change='handleSwitch'>
            <el-radio-button label='confirmedCount'>确诊</el-radio-button>
            <el-radio-button label='suspectedCount'>怀疑</el-radio-button>
            <el-radio-button label='curedCount'>治愈</el-radio-button>
            <el-radio-button label='deadCount'>死亡</el-radio-button>
          </el-radio-group>
        </div>

        <div class='filter-group'>
          <div class='filter-title'>区域</div>
          <el-radio-group class='filter-item' v-model='areaValue' size='mini' >
            <el-radio-button label='0'>全国</el-radio-button>
            <el-radio-button label='1'>湖北</el-radio-button>
            <el-radio-button label='2'>非湖北</el-radio-button>
          </el-radio-group>
        </div>

          <!-- <div class='filter-item map-opt'>
            <el-select
            v-model='modeValue'
            placeholder='地图模式'
            size='small'
            >
              <el-option
                v-for='item in modeOptions'
                :key='item.value'
                :label='item.label'
                :value='item.value'>
              </el-option>
            </el-select>
          </div>

          <div class='filter-item'>
            <el-select
            v-model='blValue'
            placeholder='病例类型'
            size='small'
            >
              <el-option
                v-for='item in blOptions'
                :key='item.value'
                :label='item.label'
                :value='item.value'>
              </el-option>
            </el-select>
          </div>

          <div class='filter-item'>
            <el-select
            v-model='areaValue'
            placeholder='区域'
            size='small'
            >
              <el-option
                v-for='item in areaOptions'
                :key='item.value'
                :label='item.label'
                :value='item.value'>
              </el-option>
            </el-select>
          </div> -->

          <!-- <div class='chart-wrapper'>
            <LineChart :cData='infectionData'></LineChart>
          </div> -->

        </div>
      </transition>
  </div>
</template>

<script>
// import LineChart from '@/components/LineChart.vue';

const CONFIRM = 'confirmedCount';
export default {
  components: {
    // LineChart,
  },
  data() {
    return {
      isShow: false,
      blValue: '0',
      modeValue: '0',
      areaValue: '0',
      type: CONFIRM,
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
      infectionData: [{
        data: [38338, 42125, 47276, 48675, 51328, 54401, 59907],
        type: 'line',
      }],
    };
  },
  computed: {
    iconStyle() {
      return this.isShow ? 'el-icon-caret-right' : 'el-icon-caret-left';
    },
  },
  methods: {
    handleToolbar() {
      this.isShow = !this.isShow;
    },
    handleSwitch(type) {
      this.$bus.$emit('infectionType', type);
    },
  },
};
</script>

<style lang='stylus' scoped>
.filter-box
  display: block;
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 9;

.tool-wrapper
  box-sizing: border-box;
  height: 100px;
  padding: 5px;
  border-radius: 2px;
  background-color: #fff;
  cursor: pointer;
  .icon
    position: absolute;
    top: 12px;
    left: 5px;
    color: #333;
  &:hover
    background-color: #eee;

.box-title
  padding-top: 24px;
  font-size: 13px;
  writing-mode: vertical-rl;
  letter-spacing: 2px;

.filter-group
  padding: 10px;

.filter-title
  font-size: 13px;
  color: #666;

.filter-item
  display: inline-block;
  margin-top: 10px;

.tool-panel
  width: 250px;
  min-height: 100px;
  position: absolute;
  top: 0;
  right: 25px;
  border-radius: 2px 0 2px 2px;
  background-color: #fff;
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
 width: 120px;

@media (max-width: 719px)
  .filter-box
    display: none;

</style>
