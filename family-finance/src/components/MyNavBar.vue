<template>
  <van-nav-bar :fixed="fixed" :title="title" left-text="返回" left-arrow @click-left="onClickBack" />
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
    }
  },
  methods: {
    onClickBack() {
      this.$router.goBack();
    }
  }
};
</script>