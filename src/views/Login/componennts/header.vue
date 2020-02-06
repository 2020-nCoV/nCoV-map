<template>
  <div>
    <el-row>
      <el-col :span="10"><div><Header></Header></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="8"><div>
        <el-col :span="12"><div><el-input
          placeholder="搜索"
          v-model="search"
          suffix-icon="el-icon-search"
        >
        </el-input></div></el-col>
        <el-col :span="12"><div class="about_us">
          <i class="el-icon-share"></i>
          <Typography style="margin-left: 5px">关于我们</Typography>
        </div></el-col>
      </div></el-col>
    </el-row>
  </div>
</template>
<script>
import Header from '../../../components/Header.vue';

export default {
  components: {
    Header,
  },
  data() {
    return {
      search: '',
    };
  },
};
</script>
<style>
  .bg-purple {
    background: #FFFFFF;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .about_us{
    padding: 10px;
    text-align: center;
    font-size: 18px;
  }
</style>
