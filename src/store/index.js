import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const types = {
  SET_USER_INFO: 'userInfo/SET_USER_INFO',
  SET_LOGIN_INFO: 'userInfo/SET_LOGIN_INFO',
  SET_IS_LOGIN: 'userInfo/SET_IS_LOGIN',
  SET_AD: 'ad/SET_AD'
}
const store = new Vuex.Store({
  state: {
    userInfo: {},
    loginInfo: {},
    isLogin: false,
    ad: []
  },
  mutations: {
    [types.SET_USER_INFO]: (state, data) => {
      state.userInfo = data
    },
    [types.SET_LOGIN_INFO]: (state, data) => {
      state.loginInfo = data
    },
    [types.SET_IS_LOGIN]: (state, data) => {
      state.isLogin = data
    },
    [types.SET_AD]: (state, data) => {
      state.ad = data
    }
  },
  plugins: [persistedState({
    storage: {
      getItem: key => wx.getStorageSync(key),
      setItem: (key, val) => wx.setStorageSync(key, val),
      removeItem: () => {}
    }
  })]
})

export {
  store,
  types
}