require("./common/manifest.js")
require("./common/vendor.js")
global.webpackJsonpMpvue([7],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__request_request__ = __webpack_require__(13);



__WEBPACK_IMPORTED_MODULE_0_vue___default.a.config.productionTip = false;
__WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */].mpType = 'app';


__WEBPACK_IMPORTED_MODULE_0_vue___default.a.prototype.$http = __WEBPACK_IMPORTED_MODULE_2__request_request__["a" /* default */];

var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */]);
app.$mount();

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(12);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(11)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-14f95063", Component.options)
  } else {
    hotAPI.reload("data-v-14f95063", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 11 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      userInfo: {}
    };
  },
  created: function created() {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    var logs = void 0;
    if (global.mpvuePlatform === "my") {
      logs = global.mpvue.getStorageSync({ key: "logs" }).data || [];
      logs.unshift(Date.now());
      global.mpvue.setStorageSync({
        key: "logs",
        data: logs
      });
    } else {
      logs = global.mpvue.getStorageSync("logs") || [];
      logs.unshift(Date.now());
      global.mpvue.setStorageSync("logs", logs);
    }
    __WEBPACK_IMPORTED_MODULE_0_vue___default.a.prototype.$utils = {
      showToast: this.showToast,
      login: this.login,
      getUserInfo: this.getUserInfo
    };
  },
  log: function log() {
    console.log("log at:" + Date.now());
  },

  methods: {
    showToast: function showToast(msg) {
      wx.showToast({
        title: msg,
        icon: "none",
        duration: 800,
        mask: true
      });
    },

    //获取用户信息
    getUserInfo: function getUserInfo() {
      wx.getSetting({
        success: function success(res) {
          if (res.authSetting["scope.userInfo"]) {
            wx.getUserInfo({
              success: function success(val) {
                console.log(val);
              }
            });
          } else {
            console.log(2);
          }
        }
      });
    },

    //检查是否登录 登录返回ture 未登录返回false
    checkLogin: function checkLogin() {
      var _this = this;

      if (wx.getStorageSync("accessToken")) {
        // 检查 session_key 是否过期
        wx.checkSession({
          // session_key 未过期
          success: function success() {
            // 直接从Storage中获取用户信息
            if (wx.getStorageSync("userInfo")) {
              _this.userInfo = JSON.parse(wx.getStorageSync("userInfo"));
              wx.setStorageSync("isLogin", true);
            } else {
              _this.showToast("缓存信息缺失");
              wx.setStorageSync("isLogin", false);
            }
          },
          // session_key 过期
          fail: function fail() {
            _this.showToast("缓存信息缺失");
            wx.setStorageSync("isLogin", false);
          }
        });
      } else {
        wx.setStorageSync("isLogin", false);
      }
    },
    login: function login(phone, captcha, callback) {
      var _this2 = this;

      wx.login({
        success: function success(loginRes) {
          if (loginRes.code) {
            /**
             * 服务器登录接口
             * phone 手机号
             * captcha 验证码
             * code 临时登录凭证
             * rawData 用户非敏感信息
             * signature 签名
             * encryptedData 用户敏感信息
             * iv 解密算法的向量
             */
            _this2.$http.post(apiPath.login, {
              phone: phone,
              captcha: captcha,
              code: loginRes.code,
              rawData: _this2.detail.rawData,
              signature: _this2.detail.signature,
              encryptedData: _this2.detail.encryptedData,
              iv: _this2.detail.iv
            }).then(function (res) {
              if (res.code == 0) {
                var _userInfo = {
                  id: res.data.id,
                  name: res.data.name,
                  icon: res.data.icon,
                  phone: res.data.phone
                };
                wx.setStorageSync("userInfo", JSON.stringify(_userInfo));
                wx.setStorageSync("accessToken", res.data.access_token);
                wx.setStorageSync("isLogin", true);
                callback();
              }
            });
          } else {
            _this2.showToast("登录失败");
          }
        },
        fail: function fail() {
          _this2.showToast("登录失败");
        }
      });
    }
  }
});

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Fly = __webpack_require__(14);
var fly = new Fly();
//添加请求拦截器
fly.interceptors.request.use(function (request) {
    wx.showLoading({
        title: "加载中",
        mask: true
    });
    //给所有请求添加自定义header
    request.headers = {
        "X-Tag": "flyio",
        'Content-Type': 'application/json'

        //终止请求
        //var err=new Error("xxx")
        //err.request=request
        //return Promise.reject(new Error(""))

        //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
    };return request;
});

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(function (response) {
    if (response.data.code == 1) {
        wx.showToast({
            title: response.data.message,
            icon: "none",
            duration: 800,
            mask: true
        });
        wx.hideLoading();
    } else {
        wx.hideLoading();

        //只将请求结果的data字段返回
        return response.data.data;
    }
}, function (err) {
    wx.hideLoading();
    //发生网络错误后会走到这里
    return Promise.resolve(err);
});

/* harmony default export */ __webpack_exports__["a"] = (fly);

/***/ })
],[9]);