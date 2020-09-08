<template>
  <div class="create">
    <my-nav-bar-with-right-button title="创建家庭" button-context="创建" @XClick="onCreate"></my-nav-bar-with-right-button>
    <!-- =====form===== -->
    <van-form class="margin-top-10px" ref="CreateFamilyForm" @submit="onSbumit">
      <!-- ===================== -->
      <van-field
        v-model="familyName"
        name="家庭名称"
        label="家庭名称"
        placeholder="填写家庭名称"
        :rules="[
            { 
              required: true,
              message: '请填写家庭名称' 
            },
            {
              validator: validateFamilyName,
              message: '家庭名称不能超过8个字符'
            }]"
      />
    </van-form>
  </div>
</template>

<script>
import MyNavBarWithRightButton from "@/components/MyNavBarWithRightButton.vue";

export default {
  name: "CreateFamily",
  components: {
    MyNavBarWithRightButton
  },
  data() {
    return {
      familyName: ""
    };
  },
  methods: {
    onCreate() {
      console.log("create");
      this.$refs.CreateFamilyForm.submit();
    },
    validateFamilyName(val) {
      return val.length <= 8;
    },
    onSbumit() {
      this.axios(
        this.axiosConfig("post", "family/create", {
          creator: this.$store.state.uname,
          familyname: this.familyName
        })
      )
        .then(response => {
          console.log(response);

          if (response.data.familyID && !response.data.err) {
            this.$toast.success("创建成功");
            // 获取到familyID
            localStorage.setItem("familyID", response.data.familyID);
            this.$store.commit("change");
            this.$store.commit("Fchange");
            this.$router.push("/home/family");
          } else {
            this.$toast.fail("创建失败");
          }
        })
        .catch(err => {
          console.log(err);
          this.$toast.fail("系统错误");
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "@/assets/style/mixins.less";

.create {
  .lightGreyBg();
}
</style>
