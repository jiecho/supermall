<template>
  <div>
    <nav-ber>
      <div slot="center" class="nav-ber">
        <div
          v-for="(item, index) in navBerArray"
          class="center"
          :class="{'active': index===currentIndex}"
        >{{item}}</div>
      </div>
    </nav-ber>
  </div>
</template>

<script>
import NavBer from "components/common/navber/NavBer";

export default {
  name: "DetailNavBar",
  props: {
    navBerArray: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  components: {
    NavBer
  }
};
</script>
<style scoped>
.nav-ber {
  display: flex;
}
.center {
  flex: 1;
}
.active {
  color: red;
}
</style>