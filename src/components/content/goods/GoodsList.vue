<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goodsItem="item">
    </goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "components/content/goods/GoodsListItem";

export default {
  naem: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>
<style scoped>
.goods{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>