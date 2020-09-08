<template>
  <div class="searchButton margin-top-10px" @click="onClick">
    <div class="icon-container">
      <van-icon class="icon-item" name="friends-o" color="#ffffff" size="24px" />
    </div>
    <span class="search-tips">查找：</span>
    <span class="search-text">{{ context }}</span>
  </div>
</template>

<script>
export default {
  name: "searchButton",
  props: {
    context: {
      default: ""
    }
  },
  methods: {
    onClick() {
      this.$emit("XClick");
    }
  }
};
</script>

<style lang="less" scoped>
.searchButton {
  display: flex;
  width: 100%;
  height: 50px;
  background-color: #ffffff;
  align-items: center;

  .icon-container {
    position: relative;
    flex: none;
    width: 34px;
    height: 34px;
    margin-left: 10px;
    background-color: #1989fa;

    .icon-item {
      position: absolute;
      top: 17px;
      left: 17px;
      margin-top: -12px;
      margin-left: -12px;
    }
  }

  .search-tips {
    display: inline-block;
    font-size: 15px;
    margin-left: 10px;
  }

  .search-text {
    font-size: 15px;
    color: #1989fa;
  }
}
</style>