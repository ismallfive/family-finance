<template>
  <div class="info-card" @click="handleClick">
    <van-image class="avatar" round width="65" height="65" fit="cover" :src="avatar" />
    <div class="name">
      <span class="nickname">{{ nickname }}</span>
      <span class="uname">{{ uname }}</span>
    </div>
    <van-icon name="arrow" class="arrow" />
  </div>
</template>

<script>
export default {
  name: "infoCard",
  data() {
    return {};
  },
  methods: {
    handleClick() {
      this.$emit("Xclick");
    }
  },
  computed: {
    nickname() {
      return this.$store.state.nickname;
    },
    uname() {
      return this.$store.state.uname;
    },
    avatar() {
      return this.$store.state.avatar;
    }
  }
};
</script>

<style lang="less" scoped>
.info-card {
  position: relative;
  width: 100%;
  height: 90px;
  padding: 16px;
  box-sizing: border-box;
  background-color: #ffffff;
  display: flex;

  .avatar {
    flex: none;
    align-self: center;
  }

  .name {
    flex: auto;
    margin-left: 15px;

    .nickname {
      display: block;
      font-size: 18px;
      font-weight: 700;
      margin-top: 10px;
    }

    .uname {
      display: block;
      font-size: 14px;
      color: #969799;
      margin-top: 10px;
    }
  }

  .arrow {
    flex: none;
    align-self: center;
    color: #969799;
  }
}
</style>