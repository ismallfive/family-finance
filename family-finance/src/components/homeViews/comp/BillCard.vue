<template>
  <div class="bill-card margin-top-10px">
    <span class="date">{{ FData.date || PData.date }}</span>
    <!-- index < FData.item.length - 1 控制是否显示下边框-->
    <!-- 对family-card进行v-for -->
    <div
      class="family-card"
      :class="{  'van-hairline--bottom': index < FData.item.length - 1 }"
      v-for="(item, index) in FData.item"
      :key="index"
    >
      <van-image class="avatar" width="35px" height="35px" round fit="cover" :src="item.avatar"></van-image>
      <div class="info">
        <!-- <span class="name">{{ item.name }}</span> -->
        <span class="name">{{ item.nickname }}</span>
        <span class="beizhu van-ellipsis">{{ item.beizhu }}</span>
      </div>
      <span class="spending">￥{{ item.spending }}</span>
    </div>
    <!-- =========== -->
    <div
      class="personal-card"
      :class="{  'van-hairline--bottom': index < PData.item.length - 1 }"
      v-for="(item, index) in PData.item"
      :key="index"
    >
      <span class="beizhu van-ellipsis">{{ item.beizhu }}</span>
      <span class="spending">￥{{ item.spending }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BillCard",
  props: {
    FData: {
      type: Object,
      default: () => {
        return {
          item: []
        };
      }
    },
    PData: {
      type: Object,
      default: () => {
        return {
          item: []
        };
      }
    }
  }
};
</script>

<style lang="less" scoped>
.bill-card {
  position: relative;
  width: 100%;
  padding: 10px;
  background-color: #ffffff;
  box-sizing: border-box;

  .date {
    font-size: 15px;
    color: rgba(7, 17, 27, 0.8);
  }

  .family-card {
    display: flex;
    width: 100%;
    align-items: center;
    margin-top: 10px;
    padding-bottom: 5px;

    .avatar {
      flex: none;
    }

    .info {
      flex: auto;
      margin-left: 10px;

      .name {
        font-size: 15px;

        &::after {
          height: 100%;
          margin: 0 5px;
          border-left: 1px solid rgba(7, 17, 27, 0.2);
          content: " ";
        }
      }

      .beizhu {
        display: inline-block;
        width: 50vw;
        font-size: 12px;
      }
    }
  }

  .personal-card {
    display: flex;
    width: 100%;
    height: 30px;
    align-items: center;
    margin-top: 10px;
    padding-bottom: 5px;

    .beizhu {
      flex: auto;
      font-size: 14px;
    }
  }
}
</style>