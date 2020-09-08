<template>
  <div class="header">
    <p class="title" :class="{active:isActive}" @click="personalClick">个人</p>
    <p class="title" :class="{active:!isActive}" @click="familyClick">家庭</p>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      // isActive: true
    };
  },
  computed: {
    isActive() {
      return !this.$route.hash;
    }
  },
  methods: {
    personalClick() {
      // this.isActive = true;
      this.$emit("PClick");
    },
    familyClick() {
      // this.isActive = false;
      this.$emit("FClick");
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  position: relative;
  width: 100%;
  height: 50px;
  // background-color: red;
  background-color: #ffffff;

  .title {
    display: inline;
    line-height: 50px;
    font-size: 18px;
    color: rgba(7, 17, 27, 0.7);
    font-weight: bold;
    margin-left: 15px;
  }

  .active {
    color: #644edd;
  }
}
</style>