<template>
  <div>
  <h4 class="product_intro">项目介绍</h4>
  <el-image
    style="width: 190px; height: 18px;display:block;margin: 0 auto"
    :src="divider"
    >
  </el-image>
  <el-row style="margin-top: 10px">
    <el-col :span="8">
      <div style="text-align: center">
        <div style="margin-bottom: 5px">
          <el-image
            style="width: 36px; height: 36px;display: inline-block;vertical-align: middle"
            :src="title1"
            >
          </el-image>
          <span style="display: inline-block;margin-left: 5px;margin-top: -5px">项目方向</span>
        </div>
        <div class="box"><span>我们致力于将疫情信息以时空大数据可视化的方式呈现，并计划上线web端，使疫情信息更为可读；
我们致力于基于疫情数据开展分析建模工作，以理清全国层面、区域层面等各尺度的疫情空间特征、时空演变规律、扩散影响因素。</span></div>
      </div>
    </el-col>
    <el-col :span="8"><div><div style="text-align: center">
      <div style="margin-bottom: 5px">
        <el-image
          style="width: 36px; height: 36px;display: inline-block;vertical-align: middle"
          :src="title2"
          >
        </el-image>
        <span style="display: inline-block;margin-left: 5px;margin-top: -5px">关于我们</span>
      </div>
      <div class="box"><span>“nCoV疫情地图”项目组是一支自发形成的志愿者队伍。我们的成员来自于世界各知名高校的专家学者、博士、硕士和本科生，行业内有影响力的工程师和设计师。面对nCoV疫情的扩散，我们主动自发集结起来，尽我们所能，希望让这个世界更温暖一点。</span></div>
    </div></div></el-col>
    <el-col :span="8"><div><div style="text-align: center">
      <div style="margin-bottom: 5px">
        <el-image
          style="width: 36px; height: 36px;display: inline-block;vertical-align: middle"
          :src="title3"
          >
        </el-image>
        <span style="display: inline-block;margin-left: 5px;margin-top: -5px">技术支持</span>
      </div>
      <div class="box"><span>我们致力于通过计算机技术结合人工收集整理高颗粒度的疫情信息，建立更新及时的疫情数据库，开源提供给全球各研究团队用于科学研究。</span></div>
    </div></div></el-col>
  </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      divider: '../../../assets/image/bottom_divider.png',
      title1: '../../assets/image/ellipse1.png',
      title2: '../../assets/image/ellipse2.png',
      title3: '../../assets/image/ellipse3.png',
    };
  },
};
</script>
<style>
  .product_intro{
    color: green;
    text-align: center;
  }
  .box {
    width: 400px;
    margin: 0 auto;
  }
  .box span {
    line-height: 20px;
    font-size: 14px;
  }
</style>
