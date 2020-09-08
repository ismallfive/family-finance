<template>
  <transition name="van-slide-right">
    <div class="Register">
      <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="onClickBack" />
      <!-- =====form===== -->
      <van-form @submit="onSubmit" class="regForm">
        <van-field
          v-model="uname"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[
            { 
              required: true,
              message: '请填写用户名' 
            },
            {
              validator: validateUname,
              message: '用户名须为以字母开头由字母和数字组成的6-8位字符'
            },
            {
              validator: asyncValidateUnameExist,
              message: '该用户名已被使用'
            },
            
          ]"
        />
        <!-- ===================== -->
        <van-field
          v-model="nickname"
          name="昵称"
          label="昵称"
          placeholder="昵称"
          :rules="[
            { 
              required: true,
              message: '请填写昵称' 
            },
            {
              validator: validateNickname,
              message: '昵称不能超过10个字符'
            }]"
        />
        <van-field name="uploader" label="头像">
          <template #input>
            <van-uploader
              v-model="fileList"
              multiple
              :max-count="1"
              :before-read="beforeRead"
              :after-read="afterRead"
            />
          </template>
        </van-field>
        <!-- ======================= -->
        <van-field
          v-model="passwd"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请输入密码' }
          ,{ validator: validatePasswd, message: '密码须为由字母和数字组成的6-15位字符' }]"
        />
        <!-- ======================== -->
        <van-field
          v-model="reTypePasswd"
          type="password"
          name="确认密码"
          label="确认密码"
          placeholder="确认密码"
          :rules="[{ required: true, message: '请再次输入密码' },
          { validator: validateRePasswd, message: '两次输入的密码不一致' }]"
        />
        <!-- ======button===== -->
        <div style="margin: 16px 32px;">
          <van-button round block type="info" native-type="submit">立即注册</van-button>
        </div>
      </van-form>
    </div>
  </transition>
</template>

<script>
import upLoaderImg from "@/api/upLoaderImg";

export default {
  name: "Register",
  components: {},
  data() {
    return {
      uname: "",
      nickname: "",
      passwd: "",
      reTypePasswd: "",
      avatar: "",
      fileList: [],
      imgFile: null
    };
  },
  methods: {
    onClickBack() {
      this.$router.goBack();
    },
    async onSubmit() {
      // 先弹出转圈的toast
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: "请稍后...",
        forbidClick: true
      });

      // 提交到后台
      // 如果有图片，先上传图片
      if (this.imgFile) {
        await upLoaderImg(this.imgFile).then(data => {
          this.avatar = data.url;
        });
      }
      //上传图片后，要拿到图片的url
      this.requestReg()
        .then(() => {
          // 关闭转圈圈
          this.$toast.clear();
          // 注册成功的提示
          this.$dialog
            .alert({
              message: "注册成功，请返回进行登录",
              confirmButtonText: "返回登录"
            })
            .then(() => {
              this.$router.goBack();
            });
        })
        .catch(error => {
          console.log(error);
        });
    },
    beforeRead(file) {
      //上传之前校验
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        this.$toast("只允许上传jpg/png格式的图片！");
        return false;
      }
      return true;
    },
    afterRead(file) {
      this.imgFile = file.file;
    },
    requestReg() {
      return this.axios(
        this.axiosConfig("post", "user/reg", {
          uname: this.uname,
          passwd: this.passwd,
          nickname: this.nickname,
          avatar: this.avatar
        })
      );
    },

    // 表单校验
    asyncValidateUnameExist(val) {
      return new Promise(resolve => {
        this.axios(
          this.axiosConfig("get", "user/check_uname_exist", {
            uname: val
          })
        )
          .then(res => {
            resolve(!res.data);
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    validateUname(val) {
      return /^[a-zA-Z][a-zA-Z0-9]{5,11}$/.test(val);
    },
    validatePasswd(val) {
      return /^[a-zA-Z0-9]{6,15}$/.test(val);
    },
    validateRePasswd(val) {
      return val === this.passwd;
    },
    validateNickname(val) {
      return val.length <= 10;
    }
  }
};
</script>

<style lang="less" scoped>
.Register {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #f2f2f2;
}

.regForm {
  margin-top: 12px;
}
</style>
