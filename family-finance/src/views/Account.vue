<template>
  <div class="account">
    <van-nav-bar title="账号与安全" left-text="返回" left-arrow @click-left="onClickBack" />
    <van-cell-group style="margin-top:10px">
      <van-cell title="修改密码" is-link :to="{ name:'ChangePasswd' }" />
      <van-cell title="注销账号" is-link @click="RemoveAccount" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "Account",
  methods: {
    onClickBack() {
      this.$router.goBack();
    },
    RemoveAccount() {
      this.$toast({
        message: "暂不支持注销账号",
        position: "bottom"
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "@/assets/style/mixins.less";

.account {
  .lightGreyBg();
}
</style>