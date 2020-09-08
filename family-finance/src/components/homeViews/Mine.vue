<template>
  <div class="mine">
    <my-header title="我"></my-header>
    <info-card class="info" @Xclick="clickInfo"></info-card>
    <van-cell title="通知" icon="chat-o" is-link style="margin-bottom:10px" @click="notice" />
    <van-cell title="设置" icon="setting-o" is-link :to="{ name:'Setting' }" />
  </div>
</template>

<script>
import Header from "@/components/homeViews/comp/Header.vue";
import infoCard from "@/components/homeViews/comp/infoCard.vue";

export default {
  name: "Mine",
  components: {
    myHeader: Header,
    infoCard
  },
  methods: {
    clickInfo() {
      this.$router.push("/userinfo");
    },
    notice() {
      this.$toast({
        message: "暂无通知",
        position: "bottom"
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "@/assets/style/mixins.less";

.mine {
  .lightGreyBg();
  .info {
    margin: 10px 0;
  }
}
</style>