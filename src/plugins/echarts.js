import Vue from 'vue';
import * as echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/map';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/geo';
import 'echarts/lib/component/axis';
import 'echarts/lib/component/grid';

Vue.prototype.$echarts = echarts;
