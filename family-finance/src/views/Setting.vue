<template>
  <div class="setting">
    <van-nav-bar title="设置" left-text="返回" left-arrow @click-left="onClickBack" />
    <div class="container">
      <van-cell title="账号与安全" is-link class="account" :to="{ name:'Account' }" />
      <van-cell-group>
        <van-cell title="关于" is-link :to="{ name:'About' }" />
        <van-cell title="检查更新" is-link @click="checkUpdate" />
      </van-cell-group>

      <div class="loginOut" @click="logOut">
        <span class="loginOutBtn">退出登录</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Setting",
  methods: {
    onClickBack() {
      this.$router.goBack();
    },
    checkUpdate() {
      this.$toast({
        message: "当前已是最新版本",
        position: "bottom"
      });
    },
    logOut() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定退出登录吗？"
        })
        .then(() => {
          localStorage.removeItem("uname");
          localStorage.removeItem("familyID");
          this.$router.push("/");
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "@/assets/style/mixins.less";

.setting {
  .lightGreyBg();

  .account {
    margin: 10px 0;
  }

  .loginOut {
    margin-top: 30px;
    width: 100%;
    height: 45px;
    background-color: #ffffff;

    .loginOutBtn {
      display: inline-block;
      width: 100%;
      height: 45px;
      line-height: 45px;
      text-align: center;
      color: #7462d9;
      font-size: 15px;
      font-weight: 700;
    }
  }
}
</style>