<template>
  <div class="header">
    <p class="title">{{ this.title }}</p>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: {
      type: String
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  position: relative;
  width: 100%;
  height: 50px;
  background-color: #ffffff;

  .title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    color: rgba(7, 17, 27, 0.7);
    font-weight: bold;
    text-align: center;
  }
}
</style>