<template>
  <div class="bill">
    <my-nav-bar title="家庭账单" fixed></my-nav-bar>
    <div class="container">
      <bill-card v-for="(item, index) in familyData" :key="index" :FData="item"></bill-card>
    </div>
  </div>
</template>

<script>
import MyNavBar from "@/components/MyNavBar.vue";
import BillCard from "@/components/homeViews/comp/BillCard.vue";

export default {
  name: "FamilyBill",
  components: {
    MyNavBar,
    BillCard
  },
  data() {
    return {
      familyData: []
    };
  },
  created() {
    // console.log(this.$store.state.familyID);

    this.axios(
      this.axiosConfig("get", "fassets/getbill", {
        familyid: this.$store.state.familyID
      })
    )
      .then(result => {
        if (result.data !== "no results") {
          this.familyData = result.data;
        } else {
          this.$toast.fail(result.data);
        }
      })
      .catch(err => {
        this.$toast.fail(err);
      });
  }
};
</script>

<style lang="less" scoped>
@import "@/assets/style/mixins.less";

.bill {
  .lightGreyBg();

  .container {
    margin-top: 55px;
  }
}
</style>