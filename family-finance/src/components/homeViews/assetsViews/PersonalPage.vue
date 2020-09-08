<template>
  <div class="PersonalPage">
    <assets-card
      color="#fb5059"
      icon="gold-coin"
      title="个人资产"
      :value="amount"
      @XClick="clickAssets"
    ></assets-card>
    <assets-card color="#644edd" icon="bill" title="个人账单" @XClick="clickBill"></assets-card>
    <assets-card color="#f88b0e" icon="add" title="记一笔" @XClick="doMakeBill"></assets-card>
  </div>
</template>

<script>
import AssetsCard from "@/components/homeViews/comp/AssetsCard.vue";

export default {
  name: "PersonalPage",
  components: {
    AssetsCard
  },
  data() {
    return {
      amount: ""
    };
  },
  methods: {
    clickAssets() {
      console.log("资产");
    },
    clickBill() {
      this.$router.push("/personalbill");
    },
    doMakeBill() {
      this.$router.push("/acountingpage?type=personal");
    }
  },
  created() {
    this.axios(
      this.axiosConfig("get", "uassets/getamount", {
        uname: this.$store.state.uname
      })
    ).then(res => {
      // console.log(res);

      if (res.data.amount) {
        this.amount = res.data.amount.toFixed(2);
      }
    });
  }
};
</script>

<style lang="less" scoped>
</style>