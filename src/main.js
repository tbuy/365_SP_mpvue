import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

import fly from './request/request'
Vue.prototype.$http = fly

const app = new Vue(App)
app.$mount()