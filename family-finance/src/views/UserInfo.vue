<template>
  <div class="userInfo">
    <van-nav-bar title="修改个人信息" left-text="返回" left-arrow @click-left="onClickBack" />
    <van-form @submit="onSubmit" class="margin-top-10px">
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
              message: '昵称不能超过8个字符'
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
      <!-- ======button===== -->
      <div style="margin: 16px 32px;">
        <van-button round block type="info" native-type="submit">保存修改</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import upLoaderImg from "@/api/upLoaderImg";

export default {
  name: "UserInfo",
  data() {
    return {
      fileList: this.avatarUrl(),
      imgFile: {},
      isChangeImg: false,
      isChangeNickname: false,
      newAvatar: "",
      nickname: ""
    };
  },
  methods: {
    onClickBack() {
      this.$router.goBack();
    },
    avatarUrl() {
      return [
        {
          url: this.$store.state.avatar,
          isImage: true
        }
      ];
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
      this.isChangeImg = true;
    },
    async onSubmit() {
      // 提交到后台
      // 昵称没改，头像也没改，就不提交
      if (!this.isChangeNickname && !this.isChangeImg) {
        return;
      }

      // 如果有图片，先上传图片
      if (this.imgFile && this.isChangeImg) {
        await upLoaderImg(this.imgFile)
          .then(data => {
            this.newAvatar = data.url;
          })
          .catch(err => {
            console.log(err);
          });
      }
      //上传图片后，要拿到图片的url
      this.requestChange()
        .then(response => {
          console.log(response);
          if (response.data) {
            // 注册成功的提示
            this.$dialog
              .alert({
                message: "修改成功",
                confirmButtonText: "确定"
              })
              .then(() => {
                this.$store.commit("change");
              });
          } else {
            this.$toast.fail(response.data.msg || "系统错误");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    requestChange() {
      return this.axios(
        this.axiosConfig("post", "user/update_info", {
          uname: this.$store.state.uname,
          nickname: this.nickname,
          avatar: this.newAvatar
        })
      );
    },
    validateNickname(val) {
      return val.length <= 8;
    }
  },
  watch: {
    nickname: function() {
      this.isChangeNickname = true;
    }
  },
  created() {
    this.nickname = this.$store.state.nickname;
  }
};
</script>

<style lang="less" scoped>
@import "@/assets/style/mixins.less";

.userInfo {
  .lightGreyBg();
}
</style>