<template>
  <div>
    <tab-ber>
      <tab-ber-item path="/home">
        <img src="~assets/img/tabbar/home.svg" alt slot="item-icon" />
        <img src="~assets/img/tabbar/home_active.svg" alt slot="item-icon-avtive" />
        <div slot="item-text">首页</div>
      </tab-ber-item>

      <tab-ber-item path="/category">
        <img src="~assets/img/tabbar/category.svg" alt slot="item-icon" />
        <img src="~assets/img/tabbar/category_active.svg" alt slot="item-icon-avtive" />
        <div slot="item-text">分类</div>
      </tab-ber-item>

      <tab-ber-item path="/care">
        <img src="~assets/img/tabbar/shopcart.svg" alt slot="item-icon" />
        <img src="~assets/img/tabbar/shopcart_active.svg" alt slot="item-icon-avtive" />
        <div slot="item-text">购物车</div>
      </tab-ber-item>

      <tab-ber-item path="/profile">
        <img src="~assets/img/tabbar/profile.svg" alt slot="item-icon" />
        <img src="~assets/img/tabbar/profile_active.svg" alt slot="item-icon-avtive" />
        <div slot="item-text">我的</div>
      </tab-ber-item>
    </tab-ber>
  </div>
</template>

<script>
import TabBerItem from 'components/common/tabbar//TabberItem'
import TabBer from 'components/common/tabbar/Tabber'

export default {
 name: 'MainTabBer',
 components: {
    TabBer,
    TabBerItem
  }
}

</script>
<style>
</style>