<template>
  <div class="recommends">
    <div v-for="item in recommends" class="recommends-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
name: 'RecommendView',
props: {
  recommends: {
    type: Array,
    default(){
      return []
    }
  }
}
}

</script>
<style>
.recommends {
  display: flex;
  font-size: 12px;
  padding: 10px 0 20px;
  text-align: center;
  border-bottom: 8px solid #eee;
}
.recommends-item {
  flex: 1;

}
.recommends-item img{
  width: 70px;
  height: 70px;
  margin-bottom: 10px;

}
</style>