require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([5],{

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(15);



// add this to handle exception
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.config.errorHandler = function (err) {
  if (console && console.error) {
    console.error(err);
  }
};

const app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_0c52e028_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(24);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(16)
}
var normalizeComponent = __webpack_require__(0)
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

/***/ 16:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__request_apiPath_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__request_apiPath_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__request_apiPath_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_index__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_card_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_scroll_vue__ = __webpack_require__(5);
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
  data() {
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
    card: __WEBPACK_IMPORTED_MODULE_2__components_card_vue__["a" /* default */],
    scroll: __WEBPACK_IMPORTED_MODULE_3__components_scroll_vue__["a" /* default */]
  },

  methods: {
    getAdPosition() {
      this.$http.get(__WEBPACK_IMPORTED_MODULE_0__request_apiPath_js___default.a.getAdPosition).then(res => {
        this.bannerImage = res["S000007"]["resource"];
        wx.setStorageSync("adPosition", JSON.stringify(this.bannerImage));
      });
    },
    getOrderList() {
      this.$http.get(__WEBPACK_IMPORTED_MODULE_0__request_apiPath_js___default.a.getOrderList, {
        lastId: this.lastId,
        pageNumber: this.pageNumber
      }).then(res => {
        this.orderList = [...this.orderList, ...res.data];
        this.lastId = res.lastId;
        this.isLast = res.isLast;
      });
    },
    goOrderContent(id) {
      wx.navigateTo({
        url: "/pages/orderContent/main?id=" + id
      });
    },
    loadingMore() {
      if (!this.isLast) {
        this.getOrderList();
      } else {
        wx.showToast({
          title: "没有更多",
          icon: "none",
          duration: 800,
          mask: true
        });
      }
    }
  },
  mounted() {
    if (wx.getStorageSync("adPosition")) {
      this.bannerImage = JSON.parse(wx.getStorageSync("adPosition"));
    } else {
      this.getAdPosition();
    }
    this.getOrderList();
  }
});

/***/ }),

/***/ 24:
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
        "mpcomid": '0_' + index
      }
    })], 1)
  }))]), _vm._v(" "), _c('div', {
    staticClass: "orderList"
  }, [_c('scroll', {
    attrs: {
      "eventid": '1',
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
        "eventid": '0_' + index
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
    }), _vm._v(_vm._s(item.service_duration || "面议") + "\n          ")], 1), _vm._v(" "), _c('div', {
      staticClass: "text"
    }, [_c('van-icon', {
      staticClass: "pub-icon icon",
      attrs: {
        "name": "location-o",
        "mpcomid": '3_' + index
      }
    }), _vm._v(_vm._s(item.service_address || "面议") + "\n          ")], 1), _vm._v(" "), _c('div', {
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

},[14]);