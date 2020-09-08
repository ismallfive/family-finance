<template>
  <div class="manage">
    <my-nav-bar title="家庭管理"></my-nav-bar>
    <van-cell-group class="margin-top-10px">
      <van-cell title="家庭名称" :value="familyName" is-link @click="openNameDialog" />
      <van-cell title="家庭编号" :value="familyID" is-link @click="openIdDialog" />
      <van-cell title="取消绑定家庭" is-link @click="openUnBindDialog" />
    </van-cell-group>
    <!-- =========== -->
    <van-dialog
      v-model="NameDialogShow"
      title="修改家庭名称"
      show-cancel-button
      close-on-popstate
      :before-close="beforeNameClose"
    >
      <van-form
        class="FamilyNameForm"
        ref="NameForm"
        @submit="FamilyNameSubmit"
        @failed="onNameSubmitFailed"
      >
        <van-field
          class="FamilyNameField"
          v-model="familyName"
          name="家庭名称"
          placeholder="填写家庭名称"
          clearable
          :rules="[
            { 
              required: true,
              message: '请填写家庭名称' 
            },
            {
              validator: validateFamilyname,
              message: '家庭名称不能超过8个字符'
            }]"
        />
      </van-form>
    </van-dialog>
    <!-- ========== -->
    <van-dialog
      v-model="unBindDialogShow"
      title="提示"
      close-on-popstate
      show-cancel-button
      @confirm="onUnBindConfirm"
    >
      <div class="unBindDialogContainer">
        <span>是否取消与</span>
        <span class="fnameText">{{ familyName }}</span>
        <span>的绑定</span>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import MyNavBar from "@/components/MyNavBar.vue";
export default {
  name: "FamilyManage",
  components: {
    MyNavBar
  },
  data() {
    return {
      familyName: "",
      familyID: "",
      NameDialogShow: false,
      unBindDialogShow: false,
      isFamilyNameChanged: false,
      done: function() {}
    };
  },
  methods: {
    openNameDialog() {
      this.NameDialogShow = true;
    },
    openIdDialog() {
      this.$dialog
        .alert({
          title: "家庭编号",
          message: this.familyID,
          confirmButtonText: "复制家庭编号"
        })
        .then(() => {
          this.copy(this.familyID);
        });
    },
    openUnBindDialog() {
      this.unBindDialogShow = true;
    },
    // 复制到剪切板
    copy(str) {
      var save = function(e) {
        e.clipboardData.setData("text/plain", str); //clipboardData对象
        e.preventDefault(); //阻止默认行为
      };
      document.addEventListener("copy", save);
      return document.execCommand("copy"); //使文档处于可编辑状态，否则无效
    },
    validateFamilyname(val) {
      return val.length <= 8;
    },
    // 表单提交的函数
    FamilyNameSubmit() {
      this.axios(
        this.axiosConfig("post", "family/update_name", {
          familyid: this.familyID,
          familyname: this.familyName
        })
      )
        .then(response => {
          console.log(response);
          if (!response.data) {
            return new Promise(new Error("res send a false"));
          }
          this.$toast({
            message: "修改成功",
            position: "bottom"
          });
          // 提交成功
          this.$refs.NameForm.resetValidation();
          this.$store.commit("change");
          this.$store.commit("Fchange");
          this.done();
        })
        .catch(err => {
          console.log(err);

          // 提交失败;
          this.$toast({
            message: "系统错误",
            position: "bottom"
          });
          this.done(false);
        });
    },
    // 表单校验失败时调用的函数
    onNameSubmitFailed() {
      this.done(false);
    },
    // 弹窗关闭前的函数
    beforeNameClose(action, done) {
      // 将关闭弹窗的函数保存到全局
      this.done = done;
      // console.log("beforeclose");
      // 点击关闭按钮直接关闭
      if (action === "cancel") {
        this.$refs.NameForm.resetValidation();
        done();
        return;
      }
      // 点击确认按钮执行的功能
      if (this.isFamilyNameChanged) {
        // 如果名称发生改变，则执行提交
        this.$refs.NameForm.submit();
      } else {
        // 若名称未发生改变，则不执行提交
        done(false);
      }
    },
    onUnBindConfirm() {
      this.axios(
        this.axiosConfig("post", "/family/unbind", {
          uname: this.$store.state.uname,
          familyid: this.familyID
        })
      )
        .then(response => {
          console.log(response);
          if (response.data) {
            this.$toast({
              message: "取消绑定成功",
              position: "bottom"
            });
            localStorage.removeItem("familyID");
            this.$router.push("/home/family");
          } else {
            return Promise.reject(new Error("some errors"));
          }
        })
        .catch(err => {
          console.log(err);
          this.$toast({
            message: "系统错误",
            position: "bottom"
          });
        });
    }
  },
  watch: {
    familyName() {
      this.isFamilyNameChanged = true;
    }
  },
  created() {
    this.familyName = this.$store.state.familyName;
    this.familyID = this.$store.state.familyID;
  }
};
</script>

<style lang="less" scoped>
@import "@/assets/style/mixins.less";

.manage {
  .lightGreyBg();
}

.FamilyNameForm {
  margin: 10px;
  .FamilyNameField {
    background-color: rgba(7, 17, 27, 0.1);
    border-radius: 10px;
  }
}

.unBindDialogContainer {
  margin: 20px;
  color: rgba(7, 17, 27, 0.8);

  .fnameText {
    display: inline-block;
    margin: 0 10px;
    color: #000;
    font-weight: bold;
  }
}
</style>