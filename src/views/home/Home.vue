<template>
  <div id="home">
    <nav-ber class="home-nav">
      <div slot="center">购物街</div>
    </nav-ber>
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="scroll"
      :pullUpLoad="true"
      @pullingUp="pullingUp"
    >
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :tabControl="['流行','新款','精选']" class="tab-control" @controlClick="controlClick"></tab-control>
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
      isShow: false
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

        //监听图片加载完成
    this.$bus.$on("itemImageLoad", () => {
     this.$refs.scroll.refresh()
      
    });
  },
  mounted() {

  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
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
    },
    //监听上拉方法
    pullingUp() {
      this.getHomeGoods(this.currentType);
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