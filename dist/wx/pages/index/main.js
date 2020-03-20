require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([7],{

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(117);



// add this to handle exception
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.config.errorHandler = function (err) {
  if (console && console.error) {
    console.error(err);
  }
};

var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_0c52e028_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(120);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(118)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-0c52e028"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_0c52e028_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/index/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0c52e028", Component.options)
  } else {
    hotAPI.reload("data-v-0c52e028", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 118:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_card_vue__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_scroll_vue__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__request__ = __webpack_require__(5);



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
      bannerImage: [],
      orderList: [],
      lastId: 0,
      pageNumber: 6,
      isLast: false,
      options: {
        //轮播点
        indicatorDots: true,
        autoplay: true,
        //时间间隔
        interval: 3000,
        //滑动时长
        duration: 400
      }
    };
  },


  components: {
    card: __WEBPACK_IMPORTED_MODULE_3__components_card_vue__["a" /* default */],
    scroll: __WEBPACK_IMPORTED_MODULE_4__components_scroll_vue__["a" /* default */]
  },

  methods: {
    getAdPosition: function getAdPosition() {
      var _this = this;

      return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee() {
        var _data;

        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return __WEBPACK_IMPORTED_MODULE_5__request__["b" /* otherService */].getAdPosition();

              case 2:
                _data = _context.sent;

                _this.bannerImage = _data["S000007"]["resource"];

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },
    getOrderList: function getOrderList() {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee2() {
        var _data;

        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return __WEBPACK_IMPORTED_MODULE_5__request__["b" /* otherService */].getOrderList(_this2.lastId, _this2.pageNumber);

              case 2:
                _data = _context2.sent;

                _this2.orderList = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(_this2.orderList), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(_data.data));
                _this2.lastId = _data.lastId;
                _this2.isLast = _data.isLast;

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    },
    goOrderContent: function goOrderContent(id) {
      wx.navigateTo({
        url: "/pages/orderContent/main?id=" + id
      });
    },
    loadingMore: function loadingMore() {
      if (!this.isLast) {
        this.getOrderList();
      } else {
        this.$utils.showToast("没有更多");
      }
    },
    goActive: function goActive(item) {
      if (item.jump_type == 1) {
        wx.navigateTo({
          url: "/pages/activity/main?url=" + item.activity_url
        });
      } else {
        this.$utils.showToast("敬请期待");
      }
    }
  },
  mounted: function mounted() {
    this.getAdPosition();
    this.getOrderList();
  }
});

/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('swiper', {
    attrs: {
      "indicator-dots": _vm.options.indicatorDots,
      "autoplay": _vm.options.autoplay,
      "interval": _vm.options.interval,
      "duration": _vm.options.duration
    }
  }, [_c('div', {
    staticClass: "banner"
  }, _vm._l((_vm.bannerImage), function(item, index) {
    return _c('swiper-item', {
      key: item.id,
      attrs: {
        "mpcomid": '1_' + index
      }
    }, [_c('van-image', {
      attrs: {
        "width": "100%",
        "height": "100%",
        "fit": "cover",
        "lazy-load": "",
        "src": item.url,
        "eventid": '0_' + index,
        "mpcomid": '0_' + index
      },
      on: {
        "click": function($event) {
          _vm.goActive(item)
        }
      }
    })], 1)
  }))]), _vm._v(" "), _c('div', {
    staticClass: "orderList"
  }, [_c('scroll', {
    attrs: {
      "eventid": '2',
      "mpcomid": '4'
    },
    on: {
      "loadingMore": _vm.loadingMore
    }
  }, _vm._l((_vm.orderList), function(item, index) {
    return _c('div', {
      key: item.id,
      staticClass: "pub_card",
      attrs: {
        "eventid": '1_' + index
      },
      on: {
        "click": function($event) {
          _vm.goOrderContent(item.id)
        }
      }
    }, [_c('div', {
      staticClass: "pub_card_item"
    }, [_c('div', {
      staticClass: "oneline"
    }, [_c('div', {
      staticClass: "title"
    }, [_vm._v(_vm._s(item.work_type || "面议"))]), _vm._v(" "), _c('div', {
      staticClass: "price"
    }, [_vm._v(_vm._s(item.wage || "面议"))])]), _vm._v(" "), _c('div', {
      staticClass: "text"
    }, [_c('van-icon', {
      staticClass: "pub-icon icon",
      attrs: {
        "name": "clock-o",
        "mpcomid": '2_' + index
      }
    }), _vm._v("\n            " + _vm._s(item.service_duration || "面议") + "\n          ")], 1), _vm._v(" "), _c('div', {
      staticClass: "text"
    }, [_c('van-icon', {
      staticClass: "pub-icon icon",
      attrs: {
        "name": "location-o",
        "mpcomid": '3_' + index
      }
    }), _vm._v("\n            " + _vm._s(item.service_address || "面议") + "\n          ")], 1), _vm._v(" "), _c('div', {
      staticClass: "time"
    }, [_vm._v(_vm._s(item.created_at))])])])
  }))], 1)], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0c52e028", esExports)
  }
}

/***/ })

},[116]);