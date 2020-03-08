// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {},
    loginInfo: {}
  },
  mutations: {
    setUserInfo: (state, data) => {
      state.userInfo = data
    },
    setLoginInfo: (state, data) => {
      state.loginInfo = data
    }
  },
  plugins: [persistedState({
    storage: {
      getItem: key => wx.getStorageSync(key),
      setItem: (key, val) => wx.setStorageSync(key, val),
      removeItem: key => wx.clearStorage()
    }
  })]
})

export default store