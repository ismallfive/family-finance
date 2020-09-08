<template>
  <van-nav-bar :fixed="fixed" :title="title" left-text="返回" left-arrow @click-left="onClickBack">
    <template #right>
      <van-button type="primary" size="mini" color="#644edd" @click="onComplete">{{ buttonContext }}</van-button>
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  name: "MyNavBar",
  props: {
    title: {
      type: String,
      default: "标题"
    },
    fixed: {
      type: Boolean,
      default: false
    },
    buttonContext: {
      type: String,
      default: "确定"
    }
  },
  methods: {
    onClickBack() {
      this.$router.goBack();
    },
    onComplete() {
      this.$emit("XClick");
    }
  }
};
</script>

<style scoped>
.van-button--mini {
  font-size: 12px;
  font-weight: 700;
  min-width: 40px;
}
</style>