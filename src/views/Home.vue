<template>
  <div class="home">
    <img alt="nCoVlogo" src="../assets/logo.png">
    <Map msg="Welcome to nCoV-map App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Map from '@/components/Map.vue';

export default {
  name: 'home',
  components: {
    Map,
  },
};
</script>
