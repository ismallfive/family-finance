<template>
  <div class="members">
    <my-nav-bar title="家庭成员" :fixed="true" buttonContext="邀请" @XClick="onClickBtn"></my-nav-bar>
    <!-- ========= -->
    <van-list class="memberList" v-model="loading" :finished="finished">
      <van-swipe-cell class="memberCell van-hairline--bottom" disabled>
        <div class="memberInfo">
          <van-image
            class="memberAvatar"
            round
            width="35"
            height="35"
            fit="cover"
            :src="meData.avatar"
          />
          <span class="memberName">{{ meData.nickname }}</span>
          <span class="me">创建者</span>
        </div>
      </van-swipe-cell>
      <!-- ====== -->
      <van-swipe-cell
        class="memberCell van-hairline--bottom"
        v-for="(item,index) in memberList"
        :key="index"
        :index="index"
        :uname="item.uname"
        :disabled="!canRemove"
        :before-close="beforeClose"
      >
        <div class="memberInfo">
          <van-image
            class="memberAvatar"
            round
            width="35"
            height="35"
            fit="cover"
            :src="item.avatar"
          />
          <span class="memberName">{{ item.nickname }}</span>
        </div>
        <template #right>
          <van-button square type="danger" text="移除" class="delete-button" />
        </template>
      </van-swipe-cell>
    </van-list>
  </div>
</template>

<script>
import MyNavBar from "@/components/MyNavBarWithRightButton.vue";
export default {
  name: "FamilyMembers",
  components: {
    MyNavBar
  },
  data() {
    return {
      memberList: [],
      loading: true,
      finished: false,
      meData: {
        uname: "",
        avatar: "",
        name: ""
      }
    };
  },
  computed: {
    canRemove() {
      if (this.meData.uname !== this.$store.state.uname) {
        return false;
      }
      return true;
    }
  },
  methods: {
    LoadData() {
      this.axios(
        this.axiosConfig("get", "family/getmembers", {
          familyid: this.$store.state.familyID
        })
      )
        .then(response => {
          console.log(response);
          this.memberList = response.data;
          this.meData = this.memberList.splice(0, 1)[0];

          this.loading = false;
          this.finished = true;
        })
        .catch(err => {
          console.log(err);
        });
      this.loading = false;
      this.finished = true;
    },
    // position 为关闭时点击的位置
    // instance 为对应的 SwipeCell 实例
    beforeClose({ position, instance }) {
      // 被删实例的索引
      let index = instance.$el.attributes[2].value;
      // 被删实例的uname
      let uname = instance.$el.attributes[3].value;

      switch (position) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          this.$dialog
            .confirm({
              message: "确定移除该成员吗？"
            })
            .then(() => {
              instance.close();
              this.removeMember(index, uname);
            })
            .catch(() => {});
          break;
      }
    },
    removeMember(index, uname) {
      // 先从视觉上移除
      this.memberList.splice(index, 1);
      // 再从服务器上移除
      console.log(uname);
      this.axios({
        method: "post",
        url: "family/unbind",
        data: {
          uname: uname,
          familyid: this.$store.state.familyID
        }
      })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    },
    onClickBtn() {
      // let familyID = localStorage.getItem("familyID");
      let familyID = this.$store.state.familyID;
      this.$dialog
        .alert({
          title: "通过家庭编号邀请",
          message: familyID,
          confirmButtonText: "复制家庭编号"
        })
        .then(() => {
          this.copy(familyID);
        });
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
    }
  },
  created() {
    this.LoadData();
  }
};
</script>

<style lang="less" scoped>
@import "@/assets/style/mixins.less";

.members {
  .lightGreyBg();

  .memberList {
    margin-top: 56px;
    .memberCell {
      padding-bottom: 5px;
      background-color: #ffffff;
      .memberInfo {
        display: flex;
        width: 100%;
        height: 45px;
        align-items: center;

        .memberAvatar {
          flex: none;
          margin-left: 10px;
        }

        .memberName {
          flex: auto;
          margin-left: 15px;
          font-size: 15px;
          font-weight: bold;
          color: rgba(7, 17, 27, 0.7);
        }

        .me {
          flex: none;
          margin-right: 20px;
          font-size: 14px;
          color: rgba(7, 17, 27, 0.5);
        }
      }
    }

    .delete-button {
      height: 50px;
    }
  }
}
</style>