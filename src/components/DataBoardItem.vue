<template>
    <div class='databoard-item' :class='type'>
        <div class='main-num num'>{{num}}</div>
        <div class='main-title'>{{text}}</div>
        <div class='other-info'>
            <span class='second-title'>昨日</span>
            <span class='num'>+{{incNum}}</span>
        </div>
    </div>
</template>

<script>
export default {
  props: ['num', 'incNum', 'type', 'text'],
};
</script>

<style lang="stylus" scoped>
.databoard-item
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 30px;

.main-num
  font-size: 20px;
  font-weight: 900;

.main-title
  font-size: 14px;
  padding:  0 0 2px 0;
  color: #333;

.other-info
  font-size: 12px;

.other-info .num
  font-weight: 800;

.second-title
  color: #999;

.confirm .num
  color: red

.suspected .num
  color: orange

.cured .num
  color: green

.dead .num
  color: black


</style>
