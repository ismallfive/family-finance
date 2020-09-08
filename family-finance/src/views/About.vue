<template>
  <div class="about">
    <van-nav-bar title="关于" left-text="返回" left-arrow @click-left="onClickBack" />
    <logo></logo>
    <div class="copyright">
      <p class="copyright-text">计算机171徐小武 版权所有</p>
      <p class="copyright-text">Copyright © 2017-2020 Xiaowu.</p>
      <p class="copyright-text">All Right Reserved.</p>
    </div>
  </div>
</template>

<script>
import Logo from "@/components/Logo.vue";

export default {
  name: "About",
  components: {
    logo: Logo
  },
  methods: {
    onClickBack() {
      this.$router.goBack();
    }
  }
};
</script>

<style lang="less" scoped>
@import "@/assets/style/mixins.less";

.about {
  .lightGreyBg();

  .copyright {
    position: absolute;
    width: 100%;
    bottom: 20px;

    .copyright-text {
      text-align: center;
      font-size: 10px;
      margin-top: 3px;
      color: #969799;
    }
  }
}
</style>