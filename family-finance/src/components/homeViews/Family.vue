<template>
  <div class="family">
    <my-header :title="headerTitle"></my-header>
    <div class="hasFamily" v-if="familyID">
      <van-button
        v-to="{ path:'/familybill' }"
        block
        color="linear-gradient(to right, #644edd, #5fb7df)"
        class="hasFaButton"
      >家庭账单</van-button>
      <van-button
        v-to="{ path:'/familymembers' }"
        block
        color="linear-gradient(to right, #e92758, #ff9569)"
        class="hasFaButton"
      >家庭成员</van-button>
      <van-button
        v-to="{ path:'/familymanage' }"
        block
        color="linear-gradient(to right, #e65c00, #F9D423)"
        class="hasFaButton"
      >家庭管理</van-button>
    </div>
    <!-- ============== -->
    <div class="noFamily" v-else>
      <van-button
        v-to="{ path:'/createfamily' }"
        block
        color="linear-gradient(to right, #644edd, #5fb7df)"
        class="noFaButton"
      >创建家庭</van-button>
      <van-button
        v-to="{ path:'/bindfamily' }"
        block
        color="linear-gradient(to right, #e92758, #ff9569)"
        class="noFaButton"
      >绑定家庭</van-button>
    </div>
  </div>
</template>

<script>
import Header from "@/components/homeViews/comp/Header.vue";

export default {
  name: "Family",
  data() {
    return {
      // FamilyData: {}
    };
  },
  computed: {
    familyID() {
      return localStorage.getItem("familyID");
      // return false;
    },
    headerTitle() {
      if (this.familyID) {
        return this.$store.state.familyName;
        // return "小五的家";
      } else {
        return "家庭";
      }
    }
  },
  components: {
    myHeader: Header
  },
  methods: {
    getFamilyData() {
      this.axios({
        method: "get",
        url: "family"
      })
        .then(response => {
          console.log(response);
          // this.FamilyData = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    // this.getFamilyData();
  },

  // 自定义指令
  directives: {
    to: {
      // 指令的定义
      inserted: function(el, binding, vnode) {
        el.onclick = function() {
          vnode.fnContext.$router.push(binding.value.path);
        };
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "@/assets/style/mixins.less";

.family {
  .lightGreyBg();
  background-color: #ffffff;

  .hasFamily {
    .noFamily();

    .hasFaButton {
      .noFaButton();
    }
  }

  .noFamily {
    display: flex;
    width: 100%;
    height: calc(100% - 150px);
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .noFaButton {
      width: 70%;
      height: 80px;
      margin: 20px 0;
      border-radius: 20px;
      font-size: 16px;
    }
  }
}
</style>