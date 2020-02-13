<template>
    <div class='filter-wrapper'>
      <span class='box-title'>数据分析</span>
    </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
    };
  },

};
</script>

<style lang="stylus" scoped>
.filter-wrapper
  box-sizing: border-box;
  position: fixed;
  top: 150px;
  right: 10px;
  z-index: 9;
  padding: 5px;
  obrder: 1px solid #368fea;
  border-radius: 4px;
  background-color: #409EFF;
  color: #fff;
  box-shadow: 0 0 5px 0 #409EFF;
  cursor: pointer;

.box-title
  padding-top: 8px;
  font-size: 13px;
  writing-mode: vertical-rl;
  letter-spacing: 3px;

</style>
