import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    uname: "",
    nickname: "",
    avatar: "",
    familyID: "",
    familyName: "",
    // 个人信息发生变化
    change: 0,
    // 家庭名称发生变化
    Fchange: 0
  },
  mutations: {
    setServerData(state, options) {
      state.uname = options.uname;
      state.nickname = options.nickname;
      state.avatar = options.avatar;
      state.familyID = options.familyID;
    },
    setFamilyName(state, familyName) {
      state.familyName = familyName;
    },
    change(state) {
      state.change++;
    },
    Fchange(state) {
      state.Fchange++;
    }
  },
  actions: {
  },
  modules: {
  }
});
