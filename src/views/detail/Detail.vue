<template>
  <div>
    <detail-nav-bar :navBerArray = "navBerArray"></detail-nav-bar>
  </div>
</template>

<script>
import DetailNavBar from 'views/detail/childComps/DetailNavBar'
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      navBerArray: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  components: {
    DetailNavBar
  },
  created() {
    console.log(this.$route.params.iid);
    
  }
};
</script>
<style scoped>

</style>