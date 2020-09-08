<template>
  <div class="bind">
    <van-search
      v-model="searchContext"
      show-action
      placeholder="请输入家庭编号"
      @search="onSearch"
      @cancel="onCancel"
      @input="onChange"
    />

    <search-button v-if="buttonShow" :context="searchContext" @XClick="doSearch"></search-button>
    <!-- ========== -->
    <div class="hasResult margin-top-10px" v-if="hasResultShow">
      <van-icon name="wap-home" class="home-icon" size="20px" color="#5fb7df" />
      <span class="homeName">{{ familyName }}</span>
      <van-button size="small" color="#644edd" class="bind-button" @click="doBind">立即绑定</van-button>
    </div>
    <!-- ========== -->
    <div class="noResult margin-top-10px" v-if="noResultShow">
      <p class="noResultText">该家庭不存在</p>
    </div>
  </div>
</template>

<script>
import searchButton from "@/components/homeViews/comp/searchButton.vue";
export default {
  name: "BindFamily",
  components: {
    searchButton
  },
  data() {
    return {
      searchContext: "",
      buttonShow: false,
      hasResultShow: false,
      noResultShow: false,
      familyID: "",
      familyName: ""
    };
  },
  methods: {
    onSearch(val) {
      this.buttonShow = false;
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });
      this.searchAjax(val);
    },
    onCancel() {
      this.$router.goBack();
    },
    onChange() {
      // 搜索框内容不为空时，显示搜索按钮，为空时隐藏
      this.buttonShow = this.searchContext ? true : false;
      this.noResultShow = false;
      this.hasResultShow = false;
    },
    doSearch() {
      this.onSearch(this.searchContext);
    },
    doBind() {
      this.bindAjax();
    },
    searchAjax(id) {
      this.axios(
        this.axiosConfig("get", "/family/getinfo", {
          familyid: id
        })
      )
        .then(response => {
          // console.log(response);
          if (response.data && response.data.familyName) {
            this.familyName = response.data.familyName;
            this.familyID = response.data.familyID;
            this.$toast.clear();
            this.hasResultShow = true;
          } else {
            return Promise.reject(new Error("no result"));
          }
        })
        .catch(err => {
          console.log(err);
          this.$toast.clear();
          this.noResultShow = true;
        });
    },
    bindAjax() {
      this.axios(
        this.axiosConfig("post", "/family/bind", {
          uname: this.$store.state.uname,
          familyid: this.familyID
        })
      )
        .then(response => {
          console.log(response);
          if (response.data) {
            this.$toast.success("绑定成功");
            localStorage.setItem("familyID", this.familyID);
            this.$store.commit("change");
            this.$store.commit("Fchange");
            this.$router.goBack();
          } else {
            return Promise.reject(new Error("res send a false"));
          }
        })
        .catch(err => {
          console.log(err);
          this.$toast.fail("绑定失败");
          // this.$router.goBack();
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "@/assets/style/mixins.less";

.bind {
  .lightGreyBg();

  .hasResult {
    display: flex;
    width: 100%;
    height: 60px;
    background-color: #ffffff;
    align-items: center;

    .home-icon {
      flex: none;
      margin-left: 15px;
    }

    .homeName {
      flex: auto;
      margin-left: 10px;
    }

    .bind-button {
      flex: none;
      margin-right: 15px;
    }
  }

  .noResult {
    width: 100%;
    height: 60px;
    background-color: #ffffff;

    .noResultText {
      text-align: center;
      height: 60px;
      line-height: 60px;
      font-size: 12px;
      color: rgba(7, 17, 27, 0.5);
    }
  }
}
</style>