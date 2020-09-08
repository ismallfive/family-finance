<template>
  <div class="accounting-comp">
    <van-form @submit="onSubmit" ref="AForm">
      <van-field
        label="金额"
        label-width="70"
        readonly
        clickable
        @touchstart.native.stop="show = true"
      >
        <template #input>
          <span class="input-span" v-if="amounting">￥{{ amounting }}</span>
          <span class="input-placeholder" v-else>输入金额</span>
        </template>
        <template #left-icon>
          <van-icon name="gold-coin" size="24px" color="#4a79e5" class="right-5px"></van-icon>
        </template>
      </van-field>
      <van-field
        v-model="beizhu"
        label="备注"
        placeholder="填写备注"
        label-width="70"
        input-align="right"
        error-message-align="right"
        @focus="show = false"
        :rules="[
            { 
              required: true,
              message: '请填写备注' 
            },
            {
              validator: validateBeizhu,
              message: '备注不能超过15个字符'
            }]"
      >
        <template #left-icon>
          <van-icon name="label" size="24px" color="#ed9142" class="right-5px"></van-icon>
        </template>
      </van-field>
      <van-field
        :value="date"
        label="日期"
        label-width="70"
        input-align="right"
        error-message-align="right"
        placeholder="选择日期"
        readonly
        clickable
        @touchstart.native.stop="clickDate"
        :rules="[
            { 
              required: true,
              message: '请选择日期' 
            }]"
      >
        <template #left-icon>
          <van-icon name="clock" size="24px" color="#ff9198" class="right-5px"></van-icon>
        </template>
      </van-field>
      <van-field :value="bill" label="账单" label-width="70" input-align="right" readonly>
        <template #left-icon>
          <van-icon name="bill" size="24px" color="#d0b862" class="right-5px"></van-icon>
        </template>
      </van-field>
      <!-- form-end -->
    </van-form>
    <!-- ========= -->
    <van-number-keyboard
      v-model="amounting"
      :show="show"
      theme="custom"
      extra-key="."
      close-button-text="提交"
      @blur="show = false"
      @delete="onDelete"
      @close="onConfirm"
    />
    <van-calendar
      v-model="dateShow"
      close-on-popstate
      :close-on-click-overlay="false"
      color="#0e84f8"
      :max-date="maxDate"
      :min-date="minDate"
      @confirm="onDateSelected"
    />
  </div>
</template>

<script>
export default {
  name: "AccountingComp",
  props: ["toWhere", "type"],
  data() {
    return {
      show: true,
      dateShow: false,
      amounting: "",
      beizhu: "",
      date: "",
      maxDate: new Date()
    };
  },
  computed: {
    minDate() {
      let date = new Date();
      date.setFullYear(date.getFullYear() - 1);
      return date;
    },
    bill() {
      return this.toWhere === "personal" ? "个人账单" : "家庭账单";
    }
  },
  methods: {
    onSubmit() {
      var apiUrl =
        this.toWhere === "personal" ? "uassets/addbill" : "fassets/addbill";
      this.axios(
        this.axiosConfig("post", apiUrl, {
          // uname,type,spending,beizhu,date
          familyid: this.$store.state.familyID,
          uname: this.$store.state.uname,
          type: this.type,
          spending: this.amounting,
          beizhu: this.beizhu,
          date: this.date
        })
      ).then(res => {
        if (res.data === "ok") {
          this.$toast.success("提交成功");
          this.$router.goBack();
        } else {
          this.$toast.fail(res.data);
        }
      });
    },
    onDelete() {
      // this.$toast("删除");
    },
    onConfirm() {
      if (this.amounting === "") {
        this.$toast({
          message: "金额不能为空",
          position: "bottom"
        });
        setTimeout(() => {
          this.show = true;
        }, 100);
        return;
      }
      this.$refs.AForm.submit();
    },
    clickDate() {
      this.show = false;
      this.dateShow = true;
    },
    onDateSelected(date) {
      this.dateShow = false;
      this.date = this.formatDate(date);
      this.show = true;
    },
    formatDate(date) {
      return `${date.getFullYear()}年${this.padLeftZero(
        date.getMonth() + 1
      )}月${this.padLeftZero(date.getDate())}日`;
    },
    validateBeizhu(val) {
      return val.length <= 15;
    },
    padLeftZero(date) {
      var str = date.toString();
      return ("00" + str).substr(str.length);
    }
  }
  // mounted() {
  //   console.log(this.toWhere, this.type);
  // }
};
</script>

<style lang="less" scoped>
.accounting-comp {
  width: 100%;
}

.input-span {
  position: absolute;
  right: 0;
  font-size: 18px;
  font-weight: bold;
  color: rgba(7, 17, 27, 0.7);
}

.input-placeholder {
  position: absolute;
  right: 0;
  color: rgb(195, 195, 195);
}

.right-5px {
  margin-right: 5px;
}
</style>