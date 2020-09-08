<template>
  <div class="accounting">
    <div class="header van-hairline--bottom">
      <div class="tab">
        <div class="left-tab" :class="{ active: isActive }" @click="toIncome">收入</div>
        <div class="right-tab" :class="{ active: !isActive }" @click="toSpending">支出</div>
      </div>
      <van-icon name="close" size="20px" class="close" color="#565656" @click="close"></van-icon>
    </div>
    <!-- ======== -->
    <accounting-comp :toWhere="toWhere" :type="type"></accounting-comp>
  </div>
</template>

<script>
import AccountingComp from "@/components/homeViews/comp/AccountingComp.vue";

export default {
  name: "AccountingPage",
  components: {
    AccountingComp
  },
  data() {
    return {
      isActive: true,
      // 收入还是支出
      type: "plus"
    };
  },
  computed: {
    // 计入个人账单还是家庭账单
    toWhere() {
      return this.$route.query.type;
    }
  },
  methods: {
    toIncome() {
      this.isActive = true;
      this.type = "plus";
      console.log(this.type);
    },
    toSpending() {
      this.isActive = false;
      this.type = "decrease";
      console.log(this.type);
    },
    close() {
      this.$router.goBack();
    }
  },
  mounted() {
    console.log(this.toWhere);
  }
};
</script>

<style lang="less" scoped>
.accounting {
  width: 100%;

  .header {
    position: relative;
    width: 100%;
    height: 50px;

    .tab {
      text-align: center;
      height: 50px;
      line-height: 50px;

      .left-tab {
        display: inline-block;
        background-color: #ffffff;
        color: #5177e6;
        width: 60px;
        height: 30px;
        line-height: 30px;
        font-size: 15px;
        border: 1px solid #5177e6;
        border-radius: 5px 0 0 5px;
      }

      .right-tab {
        .left-tab();
        border-radius: 0 5px 5px 0;
      }

      .active {
        background-color: #5177e6;
        color: #ffffff;
      }
    }

    .close {
      position: absolute;
      top: 25px;
      right: 15px;
      margin-top: -10px;
    }
  }
}
</style>