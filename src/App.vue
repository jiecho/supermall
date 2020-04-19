<template>
  <div id="app">
    <router-view></router-view>
    <main-tab-ber></main-tab-ber>

  </div>
</template>

<script>
import MainTabBer from 'components/content/mainTabber/MainTabBer'

export default {
  name: "App",
  components: {
    MainTabBer
  }
};
</script>

<style>
  @import "assets/css/base.css";

</style>
