<template>
  <div class="assets-card margin-top-10px" :style="bgColor" @click="onClick">
    <div class="icon-container">
      <van-icon :name="icon" :color="bgColor.borderColor" size="20px" class="icon" />
    </div>
    <span class="title">{{ title }}</span>
    <span class="value" v-if="value">￥{{ value }}</span>
  </div>
</template>

<script>
import Color from "color";

export default {
  name: "AssetsCard",
  props: {
    color: {
      type: String
    },
    icon: {
      type: String
    },
    title: {
      type: String
    },
    value: {
      type: String
    }
  },
  data() {
    return {};
  },
  computed: {
    colorObject() {
      // 将颜色值转换为Color模块对象
      return Color(this.color);
    },
    bgColor() {
      return {
        // .hex()是获取Color对象的hex颜色值
        // .darken()是加深颜色
        borderColor: this.colorObject.darken(0.1).hex(),
        backgroundColor: this.colorObject.hex()
      };
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
.assets-card {
  width: 100%;
  height: 56px;
  border: 1px solid;
  border-left: 8px solid;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  .icon-container {
    position: relative;
    flex: none;
    width: 36px;
    height: 36px;
    border-radius: 18px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 2px 2px 5px rgba(7, 17, 27, 0.5);
    margin-left: 8px;

    .icon {
      position: absolute;
      top: 18px;
      left: 18px;
      margin-top: -10px;
      margin-left: -10px;
      opacity: 0.7;
    }
  }

  .title {
    flex: auto;
    color: #ffffff;
    margin-left: 10px;
  }

  .value {
    flex: none;
    color: #ffffff;
    margin-right: 10px;
  }
}
</style>