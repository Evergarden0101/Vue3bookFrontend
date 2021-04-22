import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state() {
    return {
      // userInfo: null, //用户状态集合
      userInfo:{token:'1',usertype:"student"},
      isLogin: false, //用户是否登录
      messageNum: 0,
    };
  },
  mutations: {
    setUserInfo(state, userInfo) {
      (state.userInfo = userInfo), (state.isLogin = true);
    },
    setMessageNum(state, num) {
      state.messageNum = num;
    },
  },
  actions: {},
  modules: {},
  // plugins: [createPersistedState({ storage: window.sessionStorage })],
});
