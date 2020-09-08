<template>
  <div class="FamilyPage">
    <assets-card
      color="#36d7b7"
      icon="gold-coin"
      title="家庭资产"
      :value="amount"
      @XClick="clickAssets"
    ></assets-card>
    <assets-card color="#007acc" icon="bill" title="家庭账单" @XClick="clickBill"></assets-card>
    <assets-card color="#dd5246" icon="add" title="记一笔" @XClick="doMakeBill"></assets-card>
  </div>
</template>

<script>
import AssetsCard from "@/components/homeViews/comp/AssetsCard.vue";

export default {
  name: "FamilyPage",
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
      this.$router.push("/familybill");
    },
    doMakeBill() {
      this.$router.push("/acountingpage?type=family");
    }
  },
  created() {
    this.axios(
      this.axiosConfig("get", "fassets/getamount", {
        familyid: this.$store.state.familyID
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