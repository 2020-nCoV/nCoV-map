<template>
    <div class='databoard-wrapper'>
        <div class='content-wrapper'>
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
        <div class='bottom-wrapper'>
            <span>更新至{{date}}</span>
            <span>数据说明</span>
        </div>
    </div>
</template>

<script>
import DataBoardItem from './DataBoardItem.vue';

export default {
  components: {
    DataBoardItem,
  },
  data() {
    return {
      date: '2020/02/13 23:33',
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

.content-wrapper
  padding: 10px 30px 10px 0;

.bottom-wrapper
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: solid #eee 1px;
  padding: 5px 30px 5px 30px;
  font-size: 12px;
  color: #999;

.content-wrapper
  display: flex;
  flex-direction: row;
  justify-content: space-around;

@media (max-width: 719px) {
  .databoard-wrapper {
    left: 0
  }
}

</style>
