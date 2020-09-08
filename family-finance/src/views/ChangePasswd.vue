<template>
  <div class="ChangePasswd">
    <van-nav-bar title="修改密码" left-text="返回" left-arrow @click-left="onClickBack">
      <template #right>
        <van-button type="primary" size="mini" color="#644edd" @click="onComplete">完成</van-button>
      </template>
    </van-nav-bar>
    <!-- ======form====== -->
    <van-form @submit="onSubmit" ref="chPwdForm" class="chPwdForm">
      <van-field name="用户名" label="用户名" :placeholder="uname" disabled />
      <van-field
        v-model="oldPasswd"
        type="password"
        name="原密码"
        label="原密码"
        placeholder="填写原密码"
        :rules="[{ required: true, message: '请填写原密码' }]"
      />
      <!-- ======================= -->
      <van-field
        v-model="passwd"
        type="password"
        name="新密码"
        label="新密码"
        placeholder="填写新密码"
        :rules="[{ required: true, message: '请填写新密码' }
          ,{ validator: validatePasswd, message: '密码须为由字母和数字组成的6-15位字符' }]"
      />
      <!-- ======================== -->
      <van-field
        v-model="reTypePasswd"
        type="password"
        name="确认密码"
        label="确认密码"
        placeholder="再次填写确认"
        :rules="[{ required: true, message: '请再次填写确认' },
          { validator: validateRePasswd, message: '两次输入的密码不一致' }]"
      />
    </van-form>
  </div>
</template>

<script>
export default {
  name: "ChangePasswd",
  data() {
    return {
      oldPasswd: "",
      passwd: "",
      reTypePasswd: "",
      checkResult: false
    };
  },
  computed: {
    uname() {
      return this.$store.state.uname;
    }
  },
  methods: {
    onClickBack() {
      this.$router.goBack();
    },
    async onSubmit() {
      // 检查原密码是否正确
      await this.checkOldPasswd();
      if (this.checkResult === true) {
        // post请求修改密码
        this.uploadChange();
      } else if (this.checkResult === "error") {
        this.$toast({
          type: "fail",
          message: "系统错误"
        });
      } else {
        this.$dialog.alert({
          message: "原密码不正确"
        });
      }
    },
    onComplete() {
      this.$refs.chPwdForm.submit();
    },
    // 检查原密码是否正确
    async checkOldPasswd() {
      await this.axios(
        this.axiosConfig("get", "user/check_old_passwd", {
          uname: this.uname,
          oldpasswd: this.oldPasswd
        })
      )
        .then(response => {
          console.log(response);
          // 返回校验结果,true为成功，false为失败
          this.checkResult = response.data;
        })
        .catch(error => {
          console.log(error);
          this.checkResult = "error";
        });
    },
    // post请求修改密码
    uploadChange() {
      this.axios(
        this.axiosConfig("post", "user/update_passwd", {
          uname: this.uname,
          passwd: this.passwd
        })
      )
        .then(response => {
          console.log(response);
          // 返回修改结果,true为成功，false为失败
          let changeResult = response.data;
          if (changeResult) {
            this.$dialog
              .alert({
                message: "密码修改成功，请重新登录"
              })
              .then(() => {
                // 清除原来的登录信息
                localStorage.removeItem("uname");
                this.$router.push("/");
              });
          }
        })
        .catch(error => {
          console.log(error);
          this.$toast({
            type: "fail",
            message: "系统错误"
          });
        });
    },

    // 表单校验
    validatePasswd(val) {
      return /^[a-zA-Z0-9]{6,15}$/.test(val);
    },
    validateRePasswd(val) {
      return val === this.passwd;
    }
  }
};
</script>

<style lang="less" scoped>
@import "@/assets/style/mixins.less";

.ChangePasswd {
  .lightGreyBg();

  .chPwdForm {
    margin-top: 10px;
  }
}

.van-button--mini {
  font-size: 12px;
  font-weight: 700;
  min-width: 40px;
}
</style>