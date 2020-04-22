<template>
  <div id="home">
    <nav-ber class="home-nav">
      <div slot="center">购物街</div>
    </nav-ber>
    <tab-control
      :tabControl="['流行','新款','精选']"
      class="tab-control"
      @controlClick="controlClick"
      ref="tabControl1"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="scroll"
      :pullUpLoad="true"
      @pullingUp="pullingUp"
    >
      <home-swiper :banners="banners" @imageLoad="imageLoadSwiper"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :tabControl="['流行','新款','精选']" @controlClick="controlClick" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 组件不可以直接监听click  需要.native修饰符 -->
    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
import NavBer from "components/common/navber/NavBer";
import Scroll from "components/common/scroll/Scroll";

import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";

import HomeSwiper from "views/home/childComps/HomeSwiper";
import RecommendView from "views/home/childComps/RecommendView";
import FeatureView from "views/home/childComps/FeatureView";

export default {
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        //流行
        pop: { page: 0, list: [] },
        //新款
        new: { page: 0, list: [] },
        //精选
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShow: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  components: {
    NavBer,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  //创建完执行
  created() {
    //请求轮播图数据
    this.getHomeMultidata();
    //请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //监听图片加载完成  使用防抖动函数更有效率更高 因为不使用图片有多少个就刷新多少次 使用防抖基本只要刷新一次
    // 了解节流函数？
    const refresh = debounce(this.$refs.scroll.refresh, 1);
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  //组件活跃时调用
  activated(){
    this.$refs.scroll.scrollTo(0, this.saveY,0);
    //最好进行刷新一下
    this.$refs.scroll.refresh()
  },
  //组件离开前调用
  deactivated () {
    //保存组件离开前的位置
    this.saveY = this.$refs.scroll.getScrollY();
    
  },
  methods: {
    //事件监听相关方法
    controlClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentcount = index
      this.$refs.tabControl2.currentcount = index
    },
    backClick() {
      // this.$refs.scroll 拿到scroll组件
      //.scroll scrollTo方法  在调用内部的scrollTo 直接返回顶部
      //1000 :  1000毫秒之内返回到顶部
      this.$refs.scroll.scrollTo(0, 0, 1000);
    },

    scroll(position) {
      //当高度小于-1000时显示返回顶部的图标 否则不显示
      this.isShow = position.y < -1000;

      //决定tabControl是否吸顶
      if (position.y < -this.tabOffsetTop) {
        this.isTabFixed = true;
      }else{
        this.isTabFixed = false;
      }
    },
    //监听上拉方法
    pullingUp() {
      this.getHomeGoods(this.currentType);
    },
    //监听轮播图图片加载完毕
    imageLoadSwiper() {
      // 获取 tabControl 的tabOffsetTop
      // 所有组件都有有个$el：用于获取组件中的元素
      // offsetTop: 元素到顶部的距离
      //  console.log(this.$refs.tabControl2.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    //网络请求相关的方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;

      getHomeGoods(type, page).then(res => {
        //把从服务器获取的数据放入this.goods[type].list数组保存起来
        this.goods[type].list.push(...res.data.list);

        //页码+1
        this.goods[type].page += 1;
        //刷新上拉事件  刷新监听 上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>
<style scoped>
/* #home {
  padding-top: 44px;
  height:100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
.content {
  height: calc(100% -93px);
  overflow: hidden;
} */

#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}

/*.content {*/
/*height: calc(100% - 93px);*/
/*overflow: hidden;*/
/*margin-top: 44px;*/
/*}*/
</style>