<template>
    <div class='logo-wrapper'>
        <div class="sidebar-button"></div>
        <div class='logo'></div>
        <div class='app-title'>
          nCoV疫情地图
          <span style="font-size:12px; font-weight:400; color:#444;">-内测版</span>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
.logo-wrapper
  text-align: left
  padding-left: 5px

.sidebar-button
  position: relative
  top: 4px
  display none
  width: 20px
  height: 20px
  background: url('../assets/bars.svg') no-repeat center

.logo
  position relative
  top: -5px
  vertical-align middle
  display: inline-block
  width: 30px;
  height: 30px;
  background url('../assets/logo.png')  no-repeat
  background-size 100%

.app-title
  display: inline-block
  font-size: 18px
  font-weight: 800

@media (max-width:719px) {
  .app-title {
    font-size: 18px
    font-weight: 800
    margin-left: 10px
  }

  .logo {
    display: none
  }

  .sidebar-button {
      display: inline-block;
  }
}
</style>
