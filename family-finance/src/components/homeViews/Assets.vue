<template>
  <div class="assets">
    <assets-header @PClick="BartoPersonal" @FClick="BartoFamily"></assets-header>
    <div class="page-container">
      <personal-page v-if="PersonalpageShow"></personal-page>
      <family-page v-else></family-page>
    </div>
  </div>
</template>

<script>
import AssetsHeader from "@/components/homeViews/comp/AssetsHeader.vue";
import PersonalPage from "@/components/homeViews/assetsViews/PersonalPage.vue";
import FamilyPage from "@/components/homeViews/assetsViews/FamilyPage.vue";

export default {
  name: "Assets",
  components: {
    AssetsHeader,
    PersonalPage,
    FamilyPage
  },
  data() {
    return {
      // PersonalpageShow: this.$route.hash
    };
  },
  computed: {
    PersonalpageShow() {
      return !this.$route.hash;
    }
  },
  methods: {
    BartoPersonal() {
      // this.PersonalpageShow = true;
      this.$router.push("/home/assets");
      // console.log(this.PersonalpageShow);
    },
    BartoFamily() {
      // this.PersonalpageShow = false;
      this.$router.push("/home/assets#2");
      // console.log(this.PersonalpageShow);
    }
  }
};
</script>

<style lang="less" scoped>
.page-container {
  padding: 0 15px;
}
</style>