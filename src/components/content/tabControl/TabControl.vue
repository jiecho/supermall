<template>
  <div class="tab-control">
    <div v-for="(item, index) in tabControl" class="tab-control-item" :class="{active: index === currentcount}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabControl",
  data() {
    return {
      currentcount: 0,
    }
  },
  props: {
    tabControl: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    itemClick(index) {
      this.currentcount = index
      this.$emit("controlClick",index)
    }
  }
 
};
</script>
<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
}

.tab-control-item  span{
  padding: 5px;
}
.active{
  color:  var(--color-high-text);
}
.active span {
  border-bottom: 2px solid var(--color-tint);
}
</style>