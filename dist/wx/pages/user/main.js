require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([3],{

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(132);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_20c0a6c7_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(135);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(133)
}
var normalizeComponent = __webpack_require__(3)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-20c0a6c7"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_20c0a6c7_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/user/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-20c0a6c7", Component.options)
  } else {
    hotAPI.reload("data-v-20c0a6c7", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 133:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 134:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__request__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(65);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      menuList: [
      //   {
      //   id: 1,
      //   iconClass: 'icon-order',
      //   title: '求职意向',
      //   router: '/pages/intention/intention'
      // },
      {
        id: 2,
        iconClass: "description",
        title: "我的简历",
        router: "/pages/resume/main"
      }, {
        id: 3,
        iconClass: "notes-o",
        title: "阿姨手册",
        router: ""
      }, {
        id: 4,
        iconClass: "info-o",
        title: "帮助中心",
        router: ""
      }, {
        id: 5,
        iconClass: "service-o",
        title: "意见反馈",
        router: ""
      }]
    };
  },

  computed: Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["b" /* mapState */])({
    userInfo: function userInfo(state) {
      return state.userInfo;
    },
    isLogin: function isLogin(state) {
      return state.isLogin;
    }
  }),
  methods: {
    getUserInfo: function getUserInfo(e) {
      var _mpData = e.mp.detail;
      if (_mpData.encryptedData) {
        __WEBPACK_IMPORTED_MODULE_1__request__["a" /* loginService */].getUserInfo(_mpData);
        wx.navigateTo({
          url: "/pages/login/main"
        });
      } else {
        this.$utils.showToast("已拒绝");
      }
    },
    logout: function logout() {
      wx.showLoading();
      setTimeout(function () {
        __WEBPACK_IMPORTED_MODULE_1__request__["a" /* loginService */].logout();
        wx.hideLoading();
      }, 800);
    },
    goItem: function goItem(item) {
      if (item.id == 2) {
        if (this.isLogin) {
          wx.navigateTo({
            url: item.router
          });
        } else {
          this.$utils.showToast("请先登录");
        }
      } else if (item.id == 5) {
        __WEBPACK_IMPORTED_MODULE_1__request__["b" /* otherService */].makePhoneCall("");
      } else {
        this.$utils.showToast("敬请期待");
      }
    }
  },
  mounted: function mounted() {}
});

/***/ }),

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "userPage"
  }, [_c('div', {
    staticClass: "topContainer"
  }, [_c('div', {
    staticClass: "image"
  }, [_c('van-image', {
    attrs: {
      "width": "100%",
      "height": "100%",
      "fit": "cover",
      "lazy-load": "",
      "src": _vm.userInfo.icon ? _vm.userInfo.icon : '/static/images/avatar.png',
      "mpcomid": '0'
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "name"
  }, [(!_vm.userInfo.phone) ? _c('button', {
    attrs: {
      "open-type": "getUserInfo",
      "eventid": '0'
    },
    on: {
      "getuserinfo": _vm.getUserInfo
    }
  }, [_vm._v("请点击登录")]) : _c('div', [_vm._v(_vm._s(_vm.userInfo.name || _vm.userInfo.phone))])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "bottomContainer"
  }, _vm._l((_vm.menuList), function(item, index) {
    return _c('div', {
      key: item.id,
      staticClass: "item",
      attrs: {
        "eventid": '1_' + index
      },
      on: {
        "click": function($event) {
          _vm.goItem(item)
        }
      }
    }, [_c('van-icon', {
      staticClass: "pub-icon item-icon",
      attrs: {
        "name": item.iconClass,
        "mpcomid": '1_' + index
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "item-title"
    }, [_vm._v(_vm._s(item.title))]), _vm._v(" "), _c('van-icon', {
      staticClass: "pub-icon item-right",
      attrs: {
        "name": "arrow",
        "mpcomid": '2_' + index
      }
    })], 1)
  })), _vm._v(" "), (_vm.userInfo.phone) ? _c('div', {
    staticClass: "logout"
  }, [_c('van-button', {
    attrs: {
      "plain": "",
      "type": "primary",
      "size": "large",
      "color": "#ccc",
      "eventid": '2',
      "mpcomid": '3'
    },
    on: {
      "click": _vm.logout
    }
  }, [_vm._v("退出登录")])], 1) : _vm._e()])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-20c0a6c7", esExports)
  }
}

/***/ })

},[131]);