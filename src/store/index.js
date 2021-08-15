import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    formDatas: null,
    token: '0',
    imgUrl: '',
  },
  getters: {
    isLogin: state => state.isLogin,
    imgUrl: state => state.imgUrl
  },
  mutations: {
    //保存登录状态
    userStatus(state, flag) {
      state.isLogin = flag
    },
    getFormData(state, data) {
      state.formDatas = data;
    },
    saveToken(state, data) {
      state.token = data;
      window.localStorage.setItem("Token", data);//就是这里，保存到了 localStorage 中
    },
    setUrl(state, data) {
      state.imgUrl = data
    },
  },
  actions: {
    //获取登录状态
    userLogin({commit}, flag) {
      commit("userStatus", flag)
    }
  },
  modules: {
  }
})
