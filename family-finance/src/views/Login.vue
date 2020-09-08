<template>
  <div class="login">
    <logo></logo>
    <div class="container">
      <!-- <input type="text" />
      <input type="text" />
      <button>登录</button>-->
      <van-field
        v-model="uname"
        clearable
        label=" "
        :error="unameRequire"
        :required="unameRequire"
        left-icon="manager"
        placeholder="请输入用户名"
        label-width="20px"
        class="nameInput"
        @blur="onUnameBlur"
        @input="onUnameInput"
      />
      <van-field
        v-model="passwd"
        clearable
        label=" "
        :error="passwdRequire"
        :required="passwdRequire"
        left-icon="lock"
        type="password"
        placeholder="请输入密码"
        label-width="20px"
        class="pwdInput"
        @blur="onPasswdBlur"
        @input="onPasswdInput"
      />
      <van-button
        class="btn"
        color="linear-gradient(to right, #644edd, #5fb7df)"
        @click="onLogin"
      >登录</van-button>
      <van-button plain type="info" class="btn" @click="routeToRegister">注册</van-button>
    </div>
  </div>
</template>

<script>
import Logo from "@/components/Logo.vue";
// import qs from "qs";

export default {
  name: "Login",
  components: {
    logo: Logo
  },
  data() {
    return {
      uname: "",
      passwd: "",
      unameRequire: false,
      passwdRequire: false,
      checkLogin: false //通过请求api获取，true为账号密码正确，false为不正确
    };
  },
  methods: {
    onUnameBlur() {
      if (!this.uname) {
        this.unameRequire = true;
      }
    },
    onUnameInput() {
      if (this.uname) {
        this.unameRequire = false;
      }
    },
    onPasswdBlur() {
      if (!this.passwd) {
        this.passwdRequire = true;
      }
    },
    onPasswdInput() {
      if (this.passwd) {
        this.passwdRequire = false;
      }
    },
    routeToHome() {
      if (!this.unameRequire && !this.passwdRequire) {
        if (this.checkLogin) {
          this.$router.push("/home");
        }
      }
    },
    routeToRegister() {
      this.$router.push("/register");
    },
    onLogin() {
      this.onUnameBlur();
      this.onPasswdBlur();

      if (!this.uname || !this.passwd) {
        return;
      }
      // 以下编写登录逻辑代码

      // 先弹出转圈的toast
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: "登录中...",
        forbidClick: true,
        onClose: this.routeToHome
      });

      this.axios(
        this.axiosConfig("post", "user/login", {
          uname: this.uname,
          passwd: this.passwd
        })
      )
        .then(response => {
          console.log(response.config.url);
          this.checkLogin = true;
          // 将登录后返回的uname存储在localStorage
          localStorage.setItem("uname", response.data.uname);
          // 如果有familyID，储存
          if (response.data.familyID) {
            localStorage.setItem("familyID", response.data.familyID);
          }
          // 关闭toast，并触发跳转
          this.$toast.clear();
        })
        .catch(error => {
          console.log(error);
          this.$toast.clear();
          this.$notify("账号或密码错误！");
        });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: aliceblue;
}
.nameInput {
  margin-top: 30px !important;
  margin-left: 10%;
  border-radius: 7px;
  width: 80%;
  border: 1px solid rgba(7, 17, 27, 0.2);
  margin-top: 50px;
  color: rgba(7, 17, 27, 0.7);
}
.pwdInput {
  .nameInput();
  margin-top: 20px !important;
  margin-bottom: 15px !important;
}
.btn {
  width: 80%;
  margin-left: 10%;
  border-radius: 10px;
  margin-top: 20px;
}
.van-button--primary {
  border: none;
}
</style>
