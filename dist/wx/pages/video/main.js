require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([3],{

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(44);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_36c88756_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(47);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(45)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-36c88756"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_36c88756_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/video/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-36c88756", Component.options)
  } else {
    hotAPI.reload("data-v-36c88756", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 45:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_card_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_scroll_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__request_apiPath_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__request_apiPath_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__request_apiPath_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_index__ = __webpack_require__(5);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
      videoList: [],
      lastId: 0,
      pageNumber: 6,
      isLast: false
    };
  },

  components: {
    card: __WEBPACK_IMPORTED_MODULE_0__components_card_vue__["a" /* default */],
    scroll: __WEBPACK_IMPORTED_MODULE_1__components_scroll_vue__["a" /* default */]
  },
  filters: {},
  computed: {},
  methods: {
    goVideoContent: function goVideoContent(id) {
      wx.navigateTo({
        url: "/pages/videoContent/main?id=" + id
      });
    },
    getVideoList: function getVideoList() {
      var _this = this;

      this.$http.get(__WEBPACK_IMPORTED_MODULE_2__request_apiPath_js___default.a.getVideoList, {
        lastId: this.lastId,
        pageNumber: this.pageNumber
      }).then(function (res) {
        _this.videoList = [].concat(_toConsumableArray(_this.videoList), _toConsumableArray(res.data));
        _this.lastId = res.lastId;
        _this.isLast = res.isLast;
      });
    },
    loadingMore: function loadingMore() {
      if (!this.isLast) {
        this.getVideoList();
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
  mounted: function mounted() {
    this.getVideoList();
  }
});

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "videolist"
  }, [_c('scroll', {
    attrs: {
      "eventid": '1',
      "mpcomid": '1'
    },
    on: {
      "loadingMore": _vm.loadingMore
    }
  }, _vm._l((_vm.videoList), function(item, index) {
    return _c('div', {
      key: item.id,
      staticClass: "pub_card",
      attrs: {
        "eventid": '0_' + index
      },
      on: {
        "click": function($event) {
          _vm.goVideoContent(_vm.id)
        }
      }
    }, [_c('div', {
      staticClass: "pub_card_item"
    }, [_c('div', {
      staticClass: "leftImage"
    }, [_c('van-image', {
      attrs: {
        "width": "100%",
        "height": "100%",
        "fit": "cover",
        "lazy-load": "",
        "src": item.picture_url,
        "mpcomid": '0_' + index
      }
    })], 1), _vm._v(" "), _c('div', {
      staticClass: "rightContent"
    }, [_c('div', {
      staticClass: "title"
    }, [_vm._v(_vm._s(item.name))]), _vm._v(" "), _c('div', [_vm._v(_vm._s(item.teacher))])])])])
  }))], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-36c88756", esExports)
  }
}

/***/ })

},[43]);