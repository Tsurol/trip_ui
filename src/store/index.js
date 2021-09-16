import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {

    },
    profile: {

    }
  },
  mutations: {
    // 设置用户信息
    updateUserinfo (state, { user, profile}){
      state.user = {
        ...state.user,
        ...user
      },
      state.profile = {
        ...state.profile,
        ...profile
      };
    },
    deleteUserInfo (state){
      state.user = {};
      state.profile = {};
    }
  },
  actions: {},
  modules: {}
});
