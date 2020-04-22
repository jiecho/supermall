<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default() {
        return 0;
      }
    },
    pullUpLoad: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  mounted() {
    (this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      // 默认值：0
      // 可选值：1、2、3
      // probeType 作用：有时候我们需要知道滚动的位置。当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。如果没有设置该值，其默认值为 0，即不派发 scroll 事件。
      //probeType 并非所有需求都是 选择 3 而且 3  时实时监听 比较损害性能 所以让有需要的组件传数据来设置
      // probeType: 3
      probeType: this.probeType,
      //监听上拉事件 true监听 false不监听
      pullUpLoad: this.pullUpLoad
    })),
      //监听scroll： 监听滚动事件  监听滚动的位置 当滚轮到一定高度时 显示出返回顶部的图标
      this.scroll.on("scroll", position => {
        //把数据发出去一个事件 到Home组件中
        this.$emit("scroll", position);
      });
    //pullingUp 监听上拉事件 只能监听一次上拉 如果要一直监听需要设置finishPullUp()
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  methods: {
    //time=500 默认500毫秒直接返回顶部
    // this.scroll 保证不为空 以防万一 因为调用者时created()钩子函数 this.scroll可能会得到 undefined
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    //刷新监听上拉更多
    // this.scroll 保证不为空 以防万一 因为调用者时用created()钩子函数 this.scroll可能会得到 undefined
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    //刷新高度
    // this.scroll 保证不为空 以防万一 因为调用者时created()钩子函数 this.scroll可能会得到 undefined
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    //保存组件离开前的位置
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    }
  }
};
</script>
<style scoped>
</style>