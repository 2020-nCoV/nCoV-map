# nCoV-map 项目 前端开发指南

## 技术栈
vue 全家桶
mapv
Openlayers
leaflet
Mapbox
Echarts

## 后期采用
Cesium


## 开发环境
node >= 10

## 开发约定

### 1. 功能开发
都在 `src/views/` 目录下，模块都给大家预留好了。

### 2. 前端接口
都统一在 `src/api/` 目录下管理，建议一个功能模块里的接口都放在同一个接口文件里，接口文件也已经给大家预留好了。
使用方式可以参考 `situation` 模块。

### 3. 状态管理
都统一在 `src/store/` 目录下，建议一个功能模块的状态放在 `src/store/modules/` 的独立文件里。然后在 `src/store/index.js` 里引入即可。

