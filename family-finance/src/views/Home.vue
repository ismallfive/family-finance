<template>
  <div class="home">
    <router-view />

    <van-tabbar v-model="active" active-color="#644edd" route>
      <van-tabbar-item name="assets" icon="balance-o" replace :to="{ name:'assets' }">资产</van-tabbar-item>
      <van-tabbar-item name="family" icon="friends-o" replace :to="{ name:'family' }">家庭</van-tabbar-item>
      <van-tabbar-item name="mine" icon="contact" replace :to="{ name:'mine' }">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  components: {},
  data() {
    return {
      active: "assets"
    };
  },
  created() {}
};
</script>

