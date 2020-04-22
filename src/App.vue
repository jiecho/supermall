<template>
  <div id="app">
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
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
