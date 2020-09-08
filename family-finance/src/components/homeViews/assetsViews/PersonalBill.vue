<template>
  <div class="personal-bill">
    <my-nav-bar title="个人账单" fixed></my-nav-bar>
    <div class="container">
      <bill-card v-for="(item, index) in personalData" :key="index" :PData="item"></bill-card>
    </div>
  </div>
</template>

<script>
import MyNavBar from "@/components/MyNavBar.vue";
import BillCard from "@/components/homeViews/comp/BillCard.vue";

export default {
  name: "PersonalBill",
  components: {
    MyNavBar,
    BillCard
  },
  data() {
    return {
      personalData: []
    };
  },
  created() {
    this.axios(
      this.axiosConfig("get", "uassets/getbill", {
        uname: this.$store.state.uname
      })
    )
      .then(result => {
        if (result.data.bill) {
          this.personalData = result.data.bill;
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

.personal-bill {
  .lightGreyBg();

  .container {
    margin-top: 55px;
  }
}
</style>