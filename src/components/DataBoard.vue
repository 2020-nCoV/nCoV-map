<template>
    <div class='databoard-wrapper'>
        <div class='top-wrapper'>
            <DataBoardItem
            v-for='(item) in count'
            :key='item.type'
            :num='item.num'
            :incNum='item.incNum'
            :type='item.type'
            :text='item.text'
            >
            </DataBoardItem>
        </div>
        <el-collapse-transition>
          <div class='content-wrapper' v-if='isShow'>
            <LineChart :cData='infectionData'></LineChart>
          </div>
        </el-collapse-transition>
        <div class='split-wrapper' @click='handleShow'>
          <span class='info'>{{collapInfo}}</span>
          <i class='icon' :class='iconClass'></i>
        </div>
        <div class='bottom-wrapper'>
            <span class='info'>更新至{{date}}</span>
            <span class='info'>数据说明</span>
        </div>
    </div>
</template>

<script>
import DataBoardItem from './DataBoardItem.vue';
import LineChart from './LineChart.vue';

export default {
  components: {
    DataBoardItem,
    LineChart,
  },
  computed: {
    iconClass() {
      return this.isShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down';
    },
    collapInfo() {
      return this.isShow ? '收起' : '更多数据';
    },
  },
  data() {
    return {
      isShow: false,
      date: '2020/02/13 23:33',
      infectionData: [{
        name: '确诊病例',
        data: [38338, 42125, 47276, 48675, 51328, 54401, 59907],
        type: 'line',
      }, {
        name: '疑似病例',
        data: [4109, 5089, 6230, 8109, 8821, 9901, 10109],
        type: 'line',
      }, {
        name: '治愈病例',
        data: [3038, 3833, 4215, 4865, 5232, 5556, 6956],
        type: 'line',
      }, {
        name: '死亡病例',
        data: [598, 704, 760, 801, 998, 1102, 1382],
        type: 'line',
      }],
      count: [
        {
          type: 'confirm',
          text: '确诊病例',
          num: 59907,
          incNum: 15153,
        },
        {
          type: 'suspected',
          text: '疑似病例',
          num: 13435,
          incNum: 2807,
        },
        {
          type: 'cured',
          text: '治愈病例',
          num: 6189,
          incNum: 1173,
        },
        {
          type: 'dead',
          text: '死亡病例',
          num: 1368,
          incNum: 254,
        },
      ],
    };
  },
  methods: {
    handleShow() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style lang="stylus" scoped>
.databoard-wrapper
  position: fixed;
  top: 60px;
  left: 20px;
  z-index: 9;
  background-color: #fff;
  box-shadow: 0 0 5px 0 #ccc;

.top-wrapper
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 10px 30px 10px 0;

.bottom-wrapper
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: solid #eee 1px;
  padding: 5px 30px 5px 30px;

  .info
    color: #999;

.content-wrapper
  display: flex;
  justify-content: center;
  padding: 10px;
  border-top: solid #eee 1px;

.split-wrapper
  display: flex;
  justify-content: center;
  padding: 5px;
  border-top: solid #eee 1px;
  cursor: pointer;

  .info
    margin-right: 10px
    color: #333;

  .icon
    font-size: 12px
    line-height: 16px

.info
  font-size: 12px;

@media (max-width: 719px) {
  .databoard-wrapper {
    left: 0
  }
}

</style>
