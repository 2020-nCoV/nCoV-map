<template>
    <div ref='lineChart' style='width: 300px; height:300px'></div>
</template>

<script>
const option = {
  title: {
    text: '全国疫情趋势图',
    left: 'center',
    top: 10,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['2.6', '2.7', '2.8', '2.9', '2.10', '2.11', '2.12'],
    axisLine: {
      lineStyle: {
        color: '#eee',
      },
    },
    axisLabel: {
      color: '#333',
    },
  },
  yAxis: {
    name: '单位:例',
    type: 'value',
    nameLocation: 'end',
    min: 35000,
    axisLabel: {
      fontSize: 10,
    },
    nameTextStyle: {
      align: 'right',
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      lineStyle: {
        color: '#eee',
      },
    },
  },
  grid: {
    top: 60,
    left: 40,
    right: 10,
    bottom: 50,
  },
  series: [{
    data: [38338, 42125, 47276, 48675, 51328, 54401, 59907],
    type: 'line',
  }],
};
export default {
  props: ['infectionData'],
  mounted() {
    console.log(this.$refs);
    const myChart = this.$echarts.init(this.$refs.lineChart);
    myChart.setOption(option);
  },

};
</script>

<style lang="stylus" scoped>

</style>
