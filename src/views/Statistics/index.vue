<template>
    <div>
        <!-- <span class='subtitle'> 疫情历史</span> -->

        <div class="map-overlay top">
          <div class="map-overlay-inner">
            <h2>疫情发展历史</h2>
            <label id="date">{{sliderDate}}</label>
            <input id="slider" type="range" min=0 v-bind:max="maxStep" value=0 @change='sliderChangeHandler'/>
          </div>
        </div>

    </div>
</template>

<script>
import * as types from '@/store/actions-type';
import overtimeData from '@/assets/overtimeData';

// Make sure data are sorted when connecting with the endpoint.
// And have a user friendly date format.
export default {
  name: 'Statistics',
  data() {
    return {
      maxStep: overtimeData.length - 1,
      sliderDate: overtimeData[0].date,
    };
  },
  computed: {
  },
  methods: {
    sliderChangeHandler(event) {
      const currentIndex = Number(event.target.value);
      this.sliderDate = overtimeData[currentIndex].date;
      this.$store.commit(`situation/${types.SET_INFECTIONDATA}`, overtimeData[currentIndex].data);
    },
  },
  mounted() {
    this.$store.commit(`situation/${types.SET_INFECTIONDATA}`, overtimeData[0].data);
  },
};
</script>


<style scoped>
.map-overlay {
  font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
  position: absolute;
  width: 25%;
  top: 0;
  left: 0;
  padding: 10px;
  position: absolute;
  top: 80%;
  z-index: 100;
}
.map-overlay .map-overlay-inner {
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 10px;
}
.map-overlay h2 {
  line-height: 24px;
  display: block;
  margin: 0 0 10px;
}
.map-overlay input {
  background-color: transparent;
  display: inline-block;
  width: 100%;
  position: relative;
  margin: 0;
  cursor: ew-resize;
}
</style>
