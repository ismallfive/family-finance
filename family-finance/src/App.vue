<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>-->
    <transition :name="transitionName">
      <router-view class="Router" />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      transitionName: "slide-right", // 默认动态路由变化为slide-right,
      gengxin: 0
    };
  },
  watch: {
    $route() {
      let isBack = this.$router.isBack; //  监听路由变化时的状态为前进还是后退
      if (isBack) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-left";
      }
      this.$router.isBack = false;
    },
    path(newVal, oldVal) {
      if (newVal === "/home/assets" && oldVal === "/") {
        this.gengxin++;
        this.getServerData();
      }
    },
    change() {
      // 当个人信息发生变化时，重新请求数据
      this.getServerData();
    },
    Fchange() {
      this.getFamilyName(this.familyID);
    }
  },
  computed: {
    path() {
      return this.$route.path;
    },
    uname() {
      this.gengxin;
      return localStorage.getItem("uname");
    },
    familyID() {
      this.gengxin;
      return localStorage.getItem("familyID");
    },
    change() {
      return this.$store.state.change;
    },
    Fchange() {
      return this.$store.state.Fchange;
    }
  },
  methods: {
    getServerData() {
      // 请求个人信息数据
      this.axios(
        this.axiosConfig("get", "user/userinfo", {
          uname: this.uname
        })
      )
        .then(response => {
          console.log(response.config.url);

          this.$store.commit("setServerData", {
            uname: this.uname,
            nickname: response.data.nickname,
            avatar: response.data.avatar,
            familyID: response.data.familyID
          });
          this.getFamilyName(response.data.familyID);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getFamilyName(familyID) {
      // 请求家庭名称
      this.axios(
        this.axiosConfig("get", "family/getinfo", {
          familyid: familyID
        })
      )
        .then(res => {
          // console.log(res);

          this.$store.commit("setFamilyName", res.data.familyName);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    if (this.uname) {
      this.getServerData();
    }
  }
};
</script>

<style>
</style>
