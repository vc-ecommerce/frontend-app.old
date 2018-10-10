webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(29)
/* template */
var __vue_template__ = __webpack_require__(30)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shareds/header/menu/MenuUser.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d40eeb20", Component.options)
  } else {
    hotAPI.reload("data-v-d40eeb20", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shareds_header_SiteHeader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shareds_header_SiteHeader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__shareds_header_SiteHeader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shareds_sidebar_SideMenuDefault__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shareds_sidebar_SideMenuDefault___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__shareds_sidebar_SideMenuDefault__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shareds_sidebar_SideMenuPanelContainer__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shareds_sidebar_SideMenuPanelContainer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__shareds_sidebar_SideMenuPanelContainer__);
window.Vue = __webpack_require__(4);





new Vue({
    el: '#site-header',
    components: {
        'site-header': __WEBPACK_IMPORTED_MODULE_0__shareds_header_SiteHeader___default.a
    }
});

new Vue({
    el: '#side-menu-default',
    components: {
        'side-menu-default': __WEBPACK_IMPORTED_MODULE_1__shareds_sidebar_SideMenuDefault___default.a
    }
});

new Vue({
    el: '#side-menu-panel-container',
    components: {
        'side-menu-panel-container': __WEBPACK_IMPORTED_MODULE_2__shareds_sidebar_SideMenuPanelContainer___default.a
    }
});

/***/ }),
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(14)
/* template */
var __vue_template__ = __webpack_require__(59)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shareds/header/SiteHeader.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-afc68424", Component.options)
  } else {
    hotAPI.reload("data-v-afc68424", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__notification_Notification__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__notification_Notification___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__notification_Notification__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__menu_Menu__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__menu_Menu___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__menu_Menu__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu_MenuUser__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu_MenuUser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__menu_MenuUser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logo_Logo__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logo_Logo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__logo_Logo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__form_FormSearch__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__form_FormSearch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__form_FormSearch__);
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







/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            profile: 'Meu Perfil'
        };
    },
    components: {
        'notification-header': __WEBPACK_IMPORTED_MODULE_0__notification_Notification___default.a,
        'menu-header': __WEBPACK_IMPORTED_MODULE_1__menu_Menu___default.a,
        'logo-header': __WEBPACK_IMPORTED_MODULE_3__logo_Logo___default.a,
        'form-search': __WEBPACK_IMPORTED_MODULE_4__form_FormSearch___default.a,
        'menu-user': __WEBPACK_IMPORTED_MODULE_2__menu_MenuUser___default.a
    }
});

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(16)
/* template */
var __vue_template__ = __webpack_require__(23)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shareds/header/notification/Notification.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-45c32e05", Component.options)
  } else {
    hotAPI.reload("data-v-45c32e05", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NotificationsNotif__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NotificationsNotif___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__NotificationsNotif__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__NotificationsMessages__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__NotificationsMessages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__NotificationsMessages__);
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        'notification-notif': __WEBPACK_IMPORTED_MODULE_0__NotificationsNotif___default.a,
        'notification-messages': __WEBPACK_IMPORTED_MODULE_1__NotificationsMessages___default.a
    }
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(18)
/* template */
var __vue_template__ = __webpack_require__(19)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shareds/header/notification/NotificationsNotif.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1ed95042", Component.options)
  } else {
    hotAPI.reload("data-v-1ed95042", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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
//

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            total: 0
        };
    },
    methods: {
        // sempre que a pergunta mudar, essa função será executada

        time: function time() {
            var _this = this;

            setTimeout(function () {
                _this.total += 1;
            }, 10000);
        }
    }

});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "dropdown dropdown-notification notif" }, [
    _c(
      "a",
      {
        staticClass: "header-alarm dropdown-toggle active",
        attrs: {
          href: "#",
          id: "dd-notification",
          "data-toggle": "dropdown",
          "aria-haspopup": "true",
          "aria-expanded": "false"
        },
        on: { click: _vm.time }
      },
      [_c("i", { staticClass: "font-icon-alarm" })]
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "dropdown-menu dropdown-menu-right dropdown-menu-notif",
        attrs: { "aria-labelledby": "dd-notification" }
      },
      [
        _c("div", { staticClass: "dropdown-menu-notif-header" }, [
          _vm._v("\n            Notifications\n            "),
          _c("span", { staticClass: "label label-pill label-danger" }, [
            _vm._v(_vm._s(_vm.total))
          ])
        ]),
        _vm._v(" "),
        _vm._m(0),
        _vm._v(" "),
        _vm._m(1)
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "dropdown-menu-notif-list" }, [
      _c("div", { staticClass: "dropdown-menu-notif-item" }, [
        _c("div", { staticClass: "photo" }, [
          _c("img", { attrs: { src: "/img/photo-64-1.jpg", alt: "" } })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "dot" }),
        _vm._v(" "),
        _c("a", { attrs: { href: "#" } }, [_vm._v("Morgan")]),
        _vm._v(" was bothering about something\n                "),
        _c("div", { staticClass: "color-blue-grey-lighter" }, [
          _vm._v("7 hours ago")
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "dropdown-menu-notif-item" }, [
        _c("div", { staticClass: "photo" }, [
          _c("img", { attrs: { src: "/img/photo-64-2.jpg", alt: "" } })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "dot" }),
        _vm._v(" "),
        _c("a", { attrs: { href: "#" } }, [_vm._v("Lioneli")]),
        _vm._v(" had commented on this "),
        _c("a", { attrs: { href: "#" } }, [_vm._v("Super Important Thing")]),
        _vm._v(" "),
        _c("div", { staticClass: "color-blue-grey-lighter" }, [
          _vm._v("7 hours ago")
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "dropdown-menu-notif-item" }, [
        _c("div", { staticClass: "photo" }, [
          _c("img", { attrs: { src: "/img/photo-64-3.jpg", alt: "" } })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "dot" }),
        _vm._v(" "),
        _c("a", { attrs: { href: "#" } }, [_vm._v("Xavier")]),
        _vm._v(" had commented on the "),
        _c("a", { attrs: { href: "#" } }, [_vm._v("Movie title")]),
        _vm._v(" "),
        _c("div", { staticClass: "color-blue-grey-lighter" }, [
          _vm._v("7 hours ago")
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "dropdown-menu-notif-item" }, [
        _c("div", { staticClass: "photo" }, [
          _c("img", { attrs: { src: "/img/photo-64-4.jpg", alt: "" } })
        ]),
        _vm._v(" "),
        _c("a", { attrs: { href: "#" } }, [_vm._v("Lionely")]),
        _vm._v(" wants to go to "),
        _c("a", { attrs: { href: "#" } }, [_vm._v("Cinema")]),
        _vm._v(" with you to see "),
        _c("a", { attrs: { href: "#" } }, [
          _vm._v("This\n                Movie")
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "color-blue-grey-lighter" }, [
          _vm._v("7 hours ago")
        ])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "dropdown-menu-notif-more" }, [
      _c("a", { attrs: { href: "#" } }, [_vm._v("See more")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1ed95042", module.exports)
  }
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(21)
/* template */
var __vue_template__ = __webpack_require__(22)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shareds/header/notification/NotificationsMessages.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e92705ac", Component.options)
  } else {
    hotAPI.reload("data-v-e92705ac", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "dropdown dropdown-notification messages" },
      [
        _c(
          "a",
          {
            staticClass: "header-alarm dropdown-toggle active",
            attrs: {
              href: "#",
              id: "dd-messages",
              "data-toggle": "dropdown",
              "aria-haspopup": "true",
              "aria-expanded": "false"
            }
          },
          [_c("i", { staticClass: "font-icon-mail" })]
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass:
              "dropdown-menu dropdown-menu-right dropdown-menu-messages",
            attrs: { "aria-labelledby": "dd-messages" }
          },
          [
            _c("div", { staticClass: "dropdown-menu-messages-header" }, [
              _c("ul", { staticClass: "nav", attrs: { role: "tablist" } }, [
                _c("li", { staticClass: "nav-item" }, [
                  _c(
                    "a",
                    {
                      staticClass: "nav-link active",
                      attrs: {
                        "data-toggle": "tab",
                        href: "#tab-incoming",
                        role: "tab"
                      }
                    },
                    [
                      _vm._v(
                        "\n                        Inbox\n                        "
                      ),
                      _c(
                        "span",
                        { staticClass: "label label-pill label-danger" },
                        [_vm._v("8")]
                      )
                    ]
                  )
                ]),
                _vm._v(" "),
                _c("li", { staticClass: "nav-item" }, [
                  _c(
                    "a",
                    {
                      staticClass: "nav-link",
                      attrs: {
                        "data-toggle": "tab",
                        href: "#tab-outgoing",
                        role: "tab"
                      }
                    },
                    [_vm._v("Outbox")]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "tab-content" }, [
              _c(
                "div",
                {
                  staticClass: "tab-pane active",
                  attrs: { id: "tab-incoming", role: "tabpanel" }
                },
                [
                  _c("div", { staticClass: "dropdown-menu-messages-list" }, [
                    _c(
                      "a",
                      { staticClass: "mess-item", attrs: { href: "#" } },
                      [
                        _c(
                          "span",
                          { staticClass: "avatar-preview avatar-preview-32" },
                          [
                            _c("img", {
                              attrs: { src: "/img/photo-64-2.jpg", alt: "" }
                            })
                          ]
                        ),
                        _vm._v(" "),
                        _c("span", { staticClass: "mess-item-name" }, [
                          _vm._v("Tim Collins")
                        ]),
                        _vm._v(" "),
                        _c("span", { staticClass: "mess-item-txt" }, [
                          _vm._v("Morgan was bothering about something!")
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "a",
                      { staticClass: "mess-item", attrs: { href: "#" } },
                      [
                        _c(
                          "span",
                          { staticClass: "avatar-preview avatar-preview-32" },
                          [
                            _c("img", {
                              attrs: { src: "/img/avatar-2-64.png", alt: "" }
                            })
                          ]
                        ),
                        _vm._v(" "),
                        _c("span", { staticClass: "mess-item-name" }, [
                          _vm._v("Christian Burton")
                        ]),
                        _vm._v(" "),
                        _c("span", { staticClass: "mess-item-txt" }, [
                          _vm._v(
                            "Morgan was bothering about something! Morgan was bothering about something."
                          )
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "a",
                      { staticClass: "mess-item", attrs: { href: "#" } },
                      [
                        _c(
                          "span",
                          { staticClass: "avatar-preview avatar-preview-32" },
                          [
                            _c("img", {
                              attrs: { src: "/img/photo-64-2.jpg", alt: "" }
                            })
                          ]
                        ),
                        _vm._v(" "),
                        _c("span", { staticClass: "mess-item-name" }, [
                          _vm._v("Tim Collins")
                        ]),
                        _vm._v(" "),
                        _c("span", { staticClass: "mess-item-txt" }, [
                          _vm._v("Morgan was bothering about something!")
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "a",
                      { staticClass: "mess-item", attrs: { href: "#" } },
                      [
                        _c(
                          "span",
                          { staticClass: "avatar-preview avatar-preview-32" },
                          [
                            _c("img", {
                              attrs: { src: "/img/avatar-2-64.png", alt: "" }
                            })
                          ]
                        ),
                        _vm._v(" "),
                        _c("span", { staticClass: "mess-item-name" }, [
                          _vm._v("Christian Burton")
                        ]),
                        _vm._v(" "),
                        _c("span", { staticClass: "mess-item-txt" }, [
                          _vm._v("Morgan was bothering about something...")
                        ])
                      ]
                    )
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "tab-pane",
                  attrs: { id: "tab-outgoing", role: "tabpanel" }
                },
                [
                  _c("div", { staticClass: "dropdown-menu-messages-list" }, [
                    _c(
                      "a",
                      { staticClass: "mess-item", attrs: { href: "#" } },
                      [
                        _c(
                          "span",
                          { staticClass: "avatar-preview avatar-preview-32" },
                          [
                            _c("img", {
                              attrs: { src: "/img/avatar-2-64.png", alt: "" }
                            })
                          ]
                        ),
                        _vm._v(" "),
                        _c("span", { staticClass: "mess-item-name" }, [
                          _vm._v("Christian Burton")
                        ]),
                        _vm._v(" "),
                        _c("span", { staticClass: "mess-item-txt" }, [
                          _vm._v(
                            "Morgan was bothering about something! Morgan was bothering about something..."
                          )
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "a",
                      { staticClass: "mess-item", attrs: { href: "#" } },
                      [
                        _c(
                          "span",
                          { staticClass: "avatar-preview avatar-preview-32" },
                          [
                            _c("img", {
                              attrs: { src: "/img/photo-64-2.jpg", alt: "" }
                            })
                          ]
                        ),
                        _vm._v(" "),
                        _c("span", { staticClass: "mess-item-name" }, [
                          _vm._v("Tim Collins")
                        ]),
                        _vm._v(" "),
                        _c("span", { staticClass: "mess-item-txt" }, [
                          _vm._v(
                            "Morgan was bothering about something! Morgan was bothering about something."
                          )
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "a",
                      { staticClass: "mess-item", attrs: { href: "#" } },
                      [
                        _c(
                          "span",
                          { staticClass: "avatar-preview avatar-preview-32" },
                          [
                            _c("img", {
                              attrs: { src: "/img/avatar-2-64.png", alt: "" }
                            })
                          ]
                        ),
                        _vm._v(" "),
                        _c("span", { staticClass: "mess-item-name" }, [
                          _vm._v("Christian Burtons")
                        ]),
                        _vm._v(" "),
                        _c("span", { staticClass: "mess-item-txt" }, [
                          _vm._v("Morgan was bothering about something!")
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "a",
                      { staticClass: "mess-item", attrs: { href: "#" } },
                      [
                        _c(
                          "span",
                          { staticClass: "avatar-preview avatar-preview-32" },
                          [
                            _c("img", {
                              attrs: { src: "/img/photo-64-2.jpg", alt: "" }
                            })
                          ]
                        ),
                        _vm._v(" "),
                        _c("span", { staticClass: "mess-item-name" }, [
                          _vm._v("Tim Collins")
                        ]),
                        _vm._v(" "),
                        _c("span", { staticClass: "mess-item-txt" }, [
                          _vm._v("Morgan was bothering about something!")
                        ])
                      ]
                    )
                  ])
                ]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "dropdown-menu-notif-more" }, [
              _c("a", { attrs: { href: "#" } }, [_vm._v("See more")])
            ])
          ]
        )
      ]
    )
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-e92705ac", module.exports)
  }
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "span",
    [_c("notification-notif"), _vm._v(" "), _c("notification-messages")],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-45c32e05", module.exports)
  }
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(25)
/* template */
var __vue_template__ = __webpack_require__(52)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shareds/header/menu/Menu.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-313452f6", Component.options)
  } else {
    hotAPI.reload("data-v-313452f6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MenuSales__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MenuSales___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__MenuSales__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MenuUser__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MenuUser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__MenuUser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__MenuHelp__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__MenuHelp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__MenuHelp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__MenuAdd__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__MenuAdd___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__MenuAdd__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__MenuProject__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__MenuProject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__MenuProject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__MenuFormBuilder__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__MenuFormBuilder___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__MenuFormBuilder__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__MenuSocialMedia__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__MenuSocialMedia___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__MenuSocialMedia__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__MenuConfig__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__MenuConfig___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__MenuConfig__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__MenuUpPlan__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__MenuUpPlan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__MenuUpPlan__);
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











/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        'menu-sales': __WEBPACK_IMPORTED_MODULE_0__MenuSales___default.a,
        'menu-user': __WEBPACK_IMPORTED_MODULE_1__MenuUser___default.a,
        'menu-add': __WEBPACK_IMPORTED_MODULE_3__MenuAdd___default.a,
        'menu-help': __WEBPACK_IMPORTED_MODULE_2__MenuHelp___default.a,
        'menu-project': __WEBPACK_IMPORTED_MODULE_4__MenuProject___default.a,
        'menu-form-builder': __WEBPACK_IMPORTED_MODULE_5__MenuFormBuilder___default.a,
        'menu-social-media': __WEBPACK_IMPORTED_MODULE_6__MenuSocialMedia___default.a,
        'menu-config': __WEBPACK_IMPORTED_MODULE_7__MenuConfig___default.a,
        'menu-up-plan': __WEBPACK_IMPORTED_MODULE_8__MenuUpPlan___default.a
    }
});

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(27)
/* template */
var __vue_template__ = __webpack_require__(28)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shareds/header/menu/MenuSales.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1282fdb7", Component.options)
  } else {
    hotAPI.reload("data-v-1282fdb7", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "dropdown dropdown-typical" }, [
      _c(
        "a",
        {
          staticClass: "dropdown-toggle",
          attrs: {
            id: "dd-header-sales",
            "data-target": "#",
            href: "http://example.com",
            "data-toggle": "dropdown",
            "aria-haspopup": "true",
            "aria-expanded": "false"
          }
        },
        [
          _c("span", { staticClass: "font-icon font-icon-wallet" }),
          _vm._v(" "),
          _c("span", { staticClass: "lbl" }, [_vm._v("Sales")])
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "dropdown-menu",
          attrs: { "aria-labelledby": "dd-header-sales" }
        },
        [
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _c("span", { staticClass: "font-icon font-icon-home" }),
            _vm._v("Quant and Verbal")
          ]),
          _vm._v(" "),
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _c("span", { staticClass: "font-icon font-icon-cart" }),
            _vm._v("Real Gmat Test")
          ]),
          _vm._v(" "),
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _c("span", { staticClass: "font-icon font-icon-speed" }),
            _vm._v("Prep Official App")
          ]),
          _vm._v(" "),
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _c("span", { staticClass: "font-icon font-icon-users" }),
            _vm._v("CATprer Test")
          ]),
          _vm._v(" "),
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _c("span", { staticClass: "font-icon font-icon-comments" }),
            _vm._v("Third Party Test")
          ])
        ]
      )
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1282fdb7", module.exports)
  }
}

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        profile: {
            type: String,
            default: 'Perfil'
        }
    },
    methods: {
        switchProfile: function switchProfile() {
            return this.profile.split("").reverse().join("");
        }
    }
});

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "dropdown user-menu" }, [
    _vm._m(0),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "dropdown-menu dropdown-menu-right",
        attrs: { "aria-labelledby": "dd-user-menu" }
      },
      [
        _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
          _c("span", { staticClass: "font-icon glyphicon glyphicon-user" }),
          _vm._v(_vm._s(_vm.switchProfile()))
        ]),
        _vm._v(" "),
        _vm._m(1),
        _vm._v(" "),
        _vm._m(2),
        _vm._v(" "),
        _c("div", { staticClass: "dropdown-divider" }),
        _vm._v(" "),
        _vm._m(3)
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "dropdown-toggle",
        attrs: {
          id: "dd-user-menu",
          type: "button",
          "data-toggle": "dropdown",
          "aria-haspopup": "true",
          "aria-expanded": "false"
        }
      },
      [_c("img", { attrs: { src: "/img/avatar-2-64.png", alt: "" } })]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
      _c("span", { staticClass: "font-icon glyphicon glyphicon-cog" }),
      _vm._v("Settings")
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
      _c("span", {
        staticClass: "font-icon glyphicon glyphicon-question-sign"
      }),
      _vm._v("Help")
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
      _c("span", { staticClass: "font-icon glyphicon glyphicon-log-out" }),
      _vm._v("Logout")
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-d40eeb20", module.exports)
  }
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(32)
/* template */
var __vue_template__ = __webpack_require__(33)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shareds/header/menu/MenuHelp.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-76c7c2e6", Component.options)
  } else {
    hotAPI.reload("data-v-76c7c2e6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "help-dropdown" }, [
      _c("button", { attrs: { type: "button" } }, [
        _c("i", { staticClass: "font-icon font-icon-help" })
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "help-dropdown-popup" }, [
        _c("div", { staticClass: "help-dropdown-popup-side" }, [
          _c("ul", [
            _c("li", [
              _c("a", { attrs: { href: "#" } }, [_vm._v("Getting Started")])
            ]),
            _vm._v(" "),
            _c("li", [
              _c("a", { staticClass: "active", attrs: { href: "#" } }, [
                _vm._v("Creating a new project")
              ])
            ]),
            _vm._v(" "),
            _c("li", [
              _c("a", { attrs: { href: "#" } }, [_vm._v("Adding customers")])
            ]),
            _vm._v(" "),
            _c("li", [_c("a", { attrs: { href: "#" } }, [_vm._v("Settings")])]),
            _vm._v(" "),
            _c("li", [
              _c("a", { attrs: { href: "#" } }, [_vm._v("Importing data")])
            ]),
            _vm._v(" "),
            _c("li", [
              _c("a", { attrs: { href: "#" } }, [_vm._v("Exporting data")])
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "help-dropdown-popup-cont" }, [
          _c("div", { staticClass: "help-dropdown-popup-cont-in" }, [
            _c("div", { staticClass: "jscroll" }, [
              _c(
                "a",
                {
                  staticClass: "help-dropdown-popup-item",
                  attrs: { href: "#" }
                },
                [
                  _vm._v(
                    "\n                        Lorem Ipsum is simply\n                        "
                  ),
                  _c("span", { staticClass: "describe" }, [
                    _vm._v(
                      "Lorem Ipsum has been the industry's standard dummy text "
                    )
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "a",
                {
                  staticClass: "help-dropdown-popup-item",
                  attrs: { href: "#" }
                },
                [
                  _vm._v(
                    "\n                        Contrary to popular belief\n                        "
                  ),
                  _c("span", { staticClass: "describe" }, [
                    _vm._v(
                      "Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC"
                    )
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "a",
                {
                  staticClass: "help-dropdown-popup-item",
                  attrs: { href: "#" }
                },
                [
                  _vm._v(
                    "\n                        The point of using Lorem Ipsum\n                        "
                  ),
                  _c("span", { staticClass: "describe" }, [
                    _vm._v(
                      "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text"
                    )
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "a",
                {
                  staticClass: "help-dropdown-popup-item",
                  attrs: { href: "#" }
                },
                [
                  _vm._v(
                    "\n                        Lorem Ipsum\n                        "
                  ),
                  _c("span", { staticClass: "describe" }, [
                    _vm._v(
                      "There are many variations of passages of Lorem Ipsum available"
                    )
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "a",
                {
                  staticClass: "help-dropdown-popup-item",
                  attrs: { href: "#" }
                },
                [
                  _vm._v(
                    "\n                        Lorem Ipsum is simply\n                        "
                  ),
                  _c("span", { staticClass: "describe" }, [
                    _vm._v(
                      "Lorem Ipsum has been the industry's standard dummy text "
                    )
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "a",
                {
                  staticClass: "help-dropdown-popup-item",
                  attrs: { href: "#" }
                },
                [
                  _vm._v(
                    "\n                        Contrary to popular belief\n                        "
                  ),
                  _c("span", { staticClass: "describe" }, [
                    _vm._v(
                      "Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC"
                    )
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "a",
                {
                  staticClass: "help-dropdown-popup-item",
                  attrs: { href: "#" }
                },
                [
                  _vm._v(
                    "\n                        The point of using Lorem Ipsum\n                        "
                  ),
                  _c("span", { staticClass: "describe" }, [
                    _vm._v(
                      "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text"
                    )
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "a",
                {
                  staticClass: "help-dropdown-popup-item",
                  attrs: { href: "#" }
                },
                [
                  _vm._v(
                    "\n                        Lorem Ipsum\n                        "
                  ),
                  _c("span", { staticClass: "describe" }, [
                    _vm._v(
                      "There are many variations of passages of Lorem Ipsum available"
                    )
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "a",
                {
                  staticClass: "help-dropdown-popup-item",
                  attrs: { href: "#" }
                },
                [
                  _vm._v(
                    "\n                        Lorem Ipsum is simply\n                        "
                  ),
                  _c("span", { staticClass: "describe" }, [
                    _vm._v(
                      "Lorem Ipsum has been the industry's standard dummy text "
                    )
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "a",
                {
                  staticClass: "help-dropdown-popup-item",
                  attrs: { href: "#" }
                },
                [
                  _vm._v(
                    "\n                        Contrary to popular belief\n                        "
                  ),
                  _c("span", { staticClass: "describe" }, [
                    _vm._v(
                      "Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC"
                    )
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "a",
                {
                  staticClass: "help-dropdown-popup-item",
                  attrs: { href: "#" }
                },
                [
                  _vm._v(
                    "\n                        The point of using Lorem Ipsum\n                        "
                  ),
                  _c("span", { staticClass: "describe" }, [
                    _vm._v(
                      "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text"
                    )
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "a",
                {
                  staticClass: "help-dropdown-popup-item",
                  attrs: { href: "#" }
                },
                [
                  _vm._v(
                    "\n                        Lorem Ipsum\n                        "
                  ),
                  _c("span", { staticClass: "describe" }, [
                    _vm._v(
                      "There are many variations of passages of Lorem Ipsum available"
                    )
                  ])
                ]
              )
            ])
          ])
        ])
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-76c7c2e6", module.exports)
  }
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(35)
/* template */
var __vue_template__ = __webpack_require__(36)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shareds/header/menu/MenuAdd.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5d5178e8", Component.options)
  } else {
    hotAPI.reload("data-v-5d5178e8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "dropdown" }, [
      _c(
        "button",
        {
          staticClass: "btn btn-rounded dropdown-toggle",
          attrs: {
            id: "dd-header-add",
            type: "button",
            "data-toggle": "dropdown",
            "aria-haspopup": "true",
            "aria-expanded": "false"
          }
        },
        [_vm._v("\n        Adicionar\n    ")]
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "dropdown-menu",
          attrs: { "aria-labelledby": "dd-header-add" }
        },
        [
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _vm._v("Quant and Verbal")
          ]),
          _vm._v(" "),
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _vm._v("Real Gmat Test")
          ]),
          _vm._v(" "),
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _vm._v("Prep Official App")
          ]),
          _vm._v(" "),
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _vm._v("CATprer Test")
          ]),
          _vm._v(" "),
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _vm._v("Third Party Test")
          ])
        ]
      )
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5d5178e8", module.exports)
  }
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(38)
/* template */
var __vue_template__ = __webpack_require__(39)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shareds/header/menu/MenuProject.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-31bd7884", Component.options)
  } else {
    hotAPI.reload("data-v-31bd7884", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "dropdown dropdown-typical" }, [
      _c("a", { staticClass: "dropdown-toggle no-arr", attrs: { href: "#" } }, [
        _c("span", { staticClass: "font-icon font-icon-page" }),
        _vm._v(" "),
        _c("span", { staticClass: "lbl" }, [_vm._v("Projects")]),
        _vm._v(" "),
        _c("span", { staticClass: "label label-pill label-danger" }, [
          _vm._v("35")
        ])
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-31bd7884", module.exports)
  }
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(41)
/* template */
var __vue_template__ = __webpack_require__(42)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shareds/header/menu/MenuFormBuilder.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-30c5e322", Component.options)
  } else {
    hotAPI.reload("data-v-30c5e322", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "dropdown dropdown-typical" }, [
      _c(
        "a",
        {
          staticClass: "dropdown-toggle",
          attrs: {
            id: "dd-header-form-builder",
            "data-target": "#",
            href: "http://example.com",
            "data-toggle": "dropdown",
            "aria-haspopup": "true",
            "aria-expanded": "false"
          }
        },
        [
          _c("span", { staticClass: "font-icon font-icon-pencil" }),
          _vm._v(" "),
          _c("span", { staticClass: "lbl" }, [_vm._v("Form builder")])
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "dropdown-menu",
          attrs: { "aria-labelledby": "dd-header-form-builder" }
        },
        [
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _c("span", { staticClass: "font-icon font-icon-home" }),
            _vm._v("Quant and Verbal")
          ]),
          _vm._v(" "),
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _c("span", { staticClass: "font-icon font-icon-cart" }),
            _vm._v("Real Gmat Test")
          ]),
          _vm._v(" "),
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _c("span", { staticClass: "font-icon font-icon-speed" }),
            _vm._v("Prep Official App")
          ]),
          _vm._v(" "),
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _c("span", { staticClass: "font-icon font-icon-users" }),
            _vm._v("CATprer Test")
          ]),
          _vm._v(" "),
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _c("span", { staticClass: "font-icon font-icon-comments" }),
            _vm._v("Third Party Test")
          ])
        ]
      )
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-30c5e322", module.exports)
  }
}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(44)
/* template */
var __vue_template__ = __webpack_require__(45)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shareds/header/menu/MenuSocialMedia.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-10d27162", Component.options)
  } else {
    hotAPI.reload("data-v-10d27162", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "dropdown dropdown-typical" }, [
      _c(
        "a",
        {
          staticClass: "dropdown-toggle",
          attrs: {
            id: "dd-header-social",
            "data-target": "#",
            href: "http://example.com",
            "data-toggle": "dropdown",
            "aria-haspopup": "true",
            "aria-expanded": "false"
          }
        },
        [
          _c("span", { staticClass: "font-icon font-icon-share" }),
          _vm._v(" "),
          _c("span", { staticClass: "lbl" }, [_vm._v("Social media")])
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "dropdown-menu",
          attrs: { "aria-labelledby": "dd-header-social" }
        },
        [
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _c("span", { staticClass: "font-icon font-icon-home" }),
            _vm._v("Quant and Verbal")
          ]),
          _vm._v(" "),
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _c("span", { staticClass: "font-icon font-icon-cart" }),
            _vm._v("Real Gmat Test")
          ]),
          _vm._v(" "),
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _c("span", { staticClass: "font-icon font-icon-speed" }),
            _vm._v("Prep Official App")
          ]),
          _vm._v(" "),
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _c("span", { staticClass: "font-icon font-icon-users" }),
            _vm._v("CATprer Test")
          ]),
          _vm._v(" "),
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _c("span", { staticClass: "font-icon font-icon-comments" }),
            _vm._v("Third Party Test")
          ])
        ]
      )
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-10d27162", module.exports)
  }
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(47)
/* template */
var __vue_template__ = __webpack_require__(48)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shareds/header/menu/MenuConfig.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0b9e5f27", Component.options)
  } else {
    hotAPI.reload("data-v-0b9e5f27", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "dropdown dropdown-typical" }, [
      _c(
        "a",
        {
          staticClass: "dropdown-toggle",
          attrs: {
            id: "dd-header-marketing",
            "data-target": "#",
            href: "http://example.com",
            "data-toggle": "dropdown",
            "aria-haspopup": "true",
            "aria-expanded": "false"
          }
        },
        [
          _c("span", { staticClass: "font-icon font-icon-cogwheel" }),
          _vm._v(" "),
          _c("span", { staticClass: "lbl" }, [_vm._v("Marketing automation")])
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "dropdown-menu",
          attrs: { "aria-labelledby": "dd-header-marketing" }
        },
        [
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _vm._v("Current Search")
          ]),
          _vm._v(" "),
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _vm._v("Search for Issues")
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "dropdown-divider" }),
          _vm._v(" "),
          _c("div", { staticClass: "dropdown-header" }, [
            _vm._v("Recent issues")
          ]),
          _vm._v(" "),
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _c("span", { staticClass: "font-icon font-icon-home" }),
            _vm._v("Quant and Verbal")
          ]),
          _vm._v(" "),
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _c("span", { staticClass: "font-icon font-icon-cart" }),
            _vm._v("Real Gmat Test")
          ]),
          _vm._v(" "),
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _c("span", { staticClass: "font-icon font-icon-speed" }),
            _vm._v("Prep Official App")
          ]),
          _vm._v(" "),
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _c("span", { staticClass: "font-icon font-icon-users" }),
            _vm._v("CATprer Test")
          ]),
          _vm._v(" "),
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _c("span", { staticClass: "font-icon font-icon-comments" }),
            _vm._v("Third Party Test")
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "dropdown-more" }, [
            _c("div", { staticClass: "dropdown-more-caption padding" }, [
              _vm._v("more...")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "dropdown-more-sub" }, [
              _c("div", { staticClass: "dropdown-more-sub-in" }, [
                _c(
                  "a",
                  { staticClass: "dropdown-item", attrs: { href: "#" } },
                  [
                    _c("span", { staticClass: "font-icon font-icon-home" }),
                    _vm._v("Quant and Verbal")
                  ]
                ),
                _vm._v(" "),
                _c(
                  "a",
                  { staticClass: "dropdown-item", attrs: { href: "#" } },
                  [
                    _c("span", { staticClass: "font-icon font-icon-cart" }),
                    _vm._v("Real Gmat\n                        Test")
                  ]
                ),
                _vm._v(" "),
                _c(
                  "a",
                  { staticClass: "dropdown-item", attrs: { href: "#" } },
                  [
                    _c("span", { staticClass: "font-icon font-icon-speed" }),
                    _vm._v("Prep Official\n                        App")
                  ]
                ),
                _vm._v(" "),
                _c(
                  "a",
                  { staticClass: "dropdown-item", attrs: { href: "#" } },
                  [
                    _c("span", { staticClass: "font-icon font-icon-users" }),
                    _vm._v("CATprer\n                        Test")
                  ]
                ),
                _vm._v(" "),
                _c(
                  "a",
                  { staticClass: "dropdown-item", attrs: { href: "#" } },
                  [
                    _c("span", { staticClass: "font-icon font-icon-comments" }),
                    _vm._v("Third Party\n                        Test")
                  ]
                )
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "dropdown-divider" }),
          _vm._v(" "),
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _vm._v("Import Issues from CSV")
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "dropdown-divider" }),
          _vm._v(" "),
          _c("div", { staticClass: "dropdown-header" }, [_vm._v("Filters")]),
          _vm._v(" "),
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _vm._v("My Open Issues")
          ]),
          _vm._v(" "),
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _vm._v("Reported by Me")
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "dropdown-divider" }),
          _vm._v(" "),
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _vm._v("Manage filters")
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "dropdown-divider" }),
          _vm._v(" "),
          _c("div", { staticClass: "dropdown-header" }, [_vm._v("Timesheet")]),
          _vm._v(" "),
          _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
            _vm._v("Subscribtions")
          ])
        ]
      )
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0b9e5f27", module.exports)
  }
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(50)
/* template */
var __vue_template__ = __webpack_require__(51)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shareds/header/menu/MenuUpPlan.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5e6a796e", Component.options)
  } else {
    hotAPI.reload("data-v-5e6a796e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    methods: {}
});

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "a",
    {
      staticClass: "btn btn-nav btn-rounded btn-inline btn-success-outline",
      attrs: { href: "#" }
    },
    [_vm._v("\n    Seja PRO\n")]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5e6a796e", module.exports)
  }
}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "span",
    [
      _c("menu-sales"),
      _vm._v(" "),
      _c("menu-config"),
      _vm._v(" "),
      _c("menu-social-media"),
      _vm._v(" "),
      _c("menu-project"),
      _vm._v(" "),
      _c("menu-form-builder"),
      _vm._v(" "),
      _c("menu-add"),
      _vm._v(" "),
      _c("menu-help"),
      _vm._v(" "),
      _c("menu-up-plan")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-313452f6", module.exports)
  }
}

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(54)
/* template */
var __vue_template__ = __webpack_require__(55)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shareds/header/logo/Logo.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-16b06605", Component.options)
  } else {
    hotAPI.reload("data-v-16b06605", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "a",
      { staticClass: "site-logo", attrs: { href: "/", title: "Home" } },
      [
        _c("img", {
          staticClass: "hidden-md-down",
          attrs: { src: "/img/logo-2.png", alt: "" }
        }),
        _vm._v(" "),
        _c("img", {
          staticClass: "hidden-lg-down",
          attrs: { src: "/img/logo-2-mob.png", alt: "" }
        })
      ]
    )
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-16b06605", module.exports)
  }
}

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(57)
/* template */
var __vue_template__ = __webpack_require__(58)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shareds/header/form/FormSearch.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e0f1e4a6", Component.options)
  } else {
    hotAPI.reload("data-v-e0f1e4a6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "site-header-search-container" }, [
      _c("form", { staticClass: "site-header-search closed" }, [
        _c("input", {
          attrs: { type: "text", placeholder: "Pesquisa rápida" }
        }),
        _vm._v(" "),
        _c("button", { attrs: { type: "submit" } }, [
          _c("span", { staticClass: "font-icon-search" })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "overlay" })
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-e0f1e4a6", module.exports)
  }
}

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("header", { staticClass: "site-header" }, [
    _c(
      "div",
      { staticClass: "container-fluid" },
      [
        _c("logo-header"),
        _vm._v(" "),
        _vm._m(0),
        _vm._v(" "),
        _vm._m(1),
        _vm._v(" "),
        _c("div", { staticClass: "site-header-content" }, [
          _c("div", { staticClass: "site-header-content-in" }, [
            _c(
              "div",
              { staticClass: "site-header-shown" },
              [
                _c("notification-header"),
                _vm._v(" "),
                _c("menu-user", { attrs: { profile: _vm.profile } }),
                _vm._v(" "),
                _vm._m(2)
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "mobile-menu-right-overlay" }),
            _vm._v(" "),
            _c("div", { staticClass: "site-header-collapsed" }, [
              _c(
                "div",
                { staticClass: "site-header-collapsed-in" },
                [_c("menu-header"), _vm._v(" "), _c("form-search")],
                1
              )
            ])
          ])
        ])
      ],
      1
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "show-hide-sidebar",
        attrs: { id: "show-hide-sidebar-toggle" }
      },
      [_c("span", [_vm._v("toggle menu")])]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("button", { staticClass: "hamburger hamburger--htla" }, [
      _c("span", [_vm._v("toggle menu")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      { staticClass: "burger-right", attrs: { type: "button" } },
      [_c("i", { staticClass: "font-icon-menu-addl" })]
    )
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-afc68424", module.exports)
  }
}

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(61)
/* template */
var __vue_template__ = __webpack_require__(62)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shareds/sidebar/SideMenuDefault.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-af98d6e0", Component.options)
  } else {
    hotAPI.reload("data-v-af98d6e0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", [
      _c("div", { staticClass: "mobile-menu-left-overlay" }),
      _vm._v(" "),
      _c("nav", { staticClass: "side-menu" }, [
        _c("ul", { staticClass: "side-menu-list" }, [
          _c("li", { staticClass: "grey with-sub" }, [
            _c("span", [
              _c("i", { staticClass: "font-icon font-icon-dashboard" }),
              _vm._v(" "),
              _c("span", { staticClass: "lbl" }, [_vm._v("Dashboard")])
            ]),
            _vm._v(" "),
            _c("ul", [
              _c("li", [
                _c("a", { attrs: { href: "index.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Default")]),
                  _c(
                    "span",
                    {
                      staticClass: "label label-custom label-pill label-danger"
                    },
                    [_vm._v("new")]
                  )
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "dashboard-top-menu.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Top menu")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "side-menu-compact-full.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Compact menu")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "dashboard-addl-menu.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Submenu")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "side-menu-avatar.html" } }, [
                  _c("span", { staticClass: "lbl" }, [
                    _vm._v("Menu with avatar")
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "side-menu-avatar.html" } }, [
                  _c("span", { staticClass: "lbl" }, [
                    _vm._v("Compact menu with avatar")
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "dark-menu.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Dark menu")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "dark-menu-blue.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Blue dark menu")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "dark-menu-green.html" } }, [
                  _c("span", { staticClass: "lbl" }, [
                    _vm._v("Green dark menu")
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "dark-menu-green-compact.html" } }, [
                  _c("span", { staticClass: "lbl" }, [
                    _vm._v("Green compact dark menu")
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "dark-menu-ultramarine.html" } }, [
                  _c("span", { staticClass: "lbl" }, [
                    _vm._v("Ultramarine dark menu")
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "asphalt-menu.html" } }, [
                  _c("span", { staticClass: "lbl" }, [
                    _vm._v("Asphalt top menu")
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "side-menu-big-icon.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Big menu")])
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "brown with-sub" }, [
            _c("span", [
              _c("i", { staticClass: "font-icon glyphicon glyphicon-tint" }),
              _vm._v(" "),
              _c("span", { staticClass: "lbl" }, [_vm._v("Skins")])
            ]),
            _vm._v(" "),
            _c("ul", [
              _c("li", [
                _c("a", { attrs: { href: "theme-side-ebony-clay.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Ebony Clay")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c(
                  "a",
                  { attrs: { href: "theme-side-madison-caribbean.html" } },
                  [
                    _c("span", { staticClass: "lbl" }, [
                      _vm._v("Madison Caribbean")
                    ])
                  ]
                )
              ]),
              _vm._v(" "),
              _c("li", [
                _c(
                  "a",
                  { attrs: { href: "theme-side-caesium-dark-caribbean.html" } },
                  [
                    _c("span", { staticClass: "lbl" }, [
                      _vm._v("Caesium Dark Caribbean")
                    ])
                  ]
                )
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "theme-side-tin.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Tin")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "theme-side-litmus-blue.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Litmus Blue")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "theme-rebecca-purple.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Rebecca Purple")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "theme-picton-blue.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Picton Blue")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c(
                  "a",
                  { attrs: { href: "theme-picton-blue-white-ebony.html" } },
                  [
                    _c("span", { staticClass: "lbl" }, [
                      _vm._v("Picton Blue White Ebony")
                    ])
                  ]
                )
              ])
            ])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "purple with-sub" }, [
            _c("span", [
              _c("i", { staticClass: "font-icon font-icon-comments active" }),
              _vm._v(" "),
              _c("span", { staticClass: "lbl" }, [_vm._v("Messages")])
            ]),
            _vm._v(" "),
            _c("ul", [
              _c("li", [
                _c("a", { attrs: { href: "messenger.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Messenger")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "chat.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Messages")]),
                  _c(
                    "span",
                    {
                      staticClass: "label label-custom label-pill label-danger"
                    },
                    [_vm._v("8")]
                  )
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "chat-write.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Write Message")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "chat-index.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Select User")])
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "red" }, [
            _c("a", { attrs: { href: "mail.html" } }, [
              _c("i", { staticClass: "font-icon glyphicon glyphicon-send" }),
              _vm._v(" "),
              _c("span", { staticClass: "lbl" }, [_vm._v("Mail")])
            ])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "gold with-sub" }, [
            _c("span", [
              _c("i", { staticClass: "font-icon font-icon-edit" }),
              _vm._v(" "),
              _c("span", { staticClass: "lbl" }, [_vm._v("Forms")])
            ]),
            _vm._v(" "),
            _c("ul", [
              _c("li", [
                _c("a", { attrs: { href: "ui-form.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Basic Inputs")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "ui-buttons.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Buttons")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "ui-select.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Select & Tags")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "ui-checkboxes.html" } }, [
                  _c("span", { staticClass: "lbl" }, [
                    _vm._v("Checkboxes & Radios")
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "ui-form-validation.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Validation")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "typeahead.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Typeahead")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "steps.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Steps")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "ui-form-input-mask.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Input Mask")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "form-flex-labels.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Flex Labels")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "ui-form-extras.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Extras")])
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "blue-dirty" }, [
            _c("a", { attrs: { href: "tables.html" } }, [
              _c("span", { staticClass: "glyphicon glyphicon-th" }),
              _vm._v(" "),
              _c("span", { staticClass: "lbl" }, [_vm._v("Tables")])
            ])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "magenta with-sub" }, [
            _c("span", [
              _c("span", { staticClass: "glyphicon glyphicon-list-alt" }),
              _vm._v(" "),
              _c("span", { staticClass: "lbl" }, [_vm._v("Datatables")])
            ]),
            _vm._v(" "),
            _c("ul", [
              _c("li", [
                _c("a", { attrs: { href: "datatables-net.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Datatables.net")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "bootstrap-datatables.html" } }, [
                  _c("span", { staticClass: "lbl" }, [
                    _vm._v("Bootstrap Table")
                  ])
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "green with-sub" }, [
            _c("span", [
              _c("i", { staticClass: "font-icon font-icon-widget" }),
              _vm._v(" "),
              _c("span", { staticClass: "lbl" }, [_vm._v("Components")])
            ]),
            _vm._v(" "),
            _c("ul", [
              _c("li", [
                _c("a", { attrs: { href: "widgets.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Widgets")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "elements.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Bootstrap UI")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "ui-datepicker.html" } }, [
                  _c("span", { staticClass: "lbl" }, [
                    _vm._v("Date and Time Pickers")
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "multipicker.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Multi Picker")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "form-steps.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Form Steps")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "components-upload.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Upload")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "sweet-alerts.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("SweetAlert")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "color-picker.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Color Picker")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "tabs.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Tabs")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "panels.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Panels")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "notifications.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Notifications")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "range-slider.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Sliders")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "editor-summernote.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Editors")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "nestable.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Nestable")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "blockui.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("BlockUI")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "alerts.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Alerts")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "player.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Players")])
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "pink-red" }, [
            _c("a", { attrs: { href: "activity.html" } }, [
              _c("i", { staticClass: "font-icon font-icon-zigzag" }),
              _vm._v(" "),
              _c("span", { staticClass: "lbl" }, [_vm._v("Activity")])
            ])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "blue with-sub" }, [
            _c("span", [
              _c("i", { staticClass: "font-icon font-icon-user" }),
              _vm._v(" "),
              _c("span", { staticClass: "lbl" }, [_vm._v("Profile")])
            ]),
            _vm._v(" "),
            _c("ul", [
              _c("li", [
                _c("a", { attrs: { href: "profile.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Version 1")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "profile-2.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Version 2")])
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "orange-red with-sub" }, [
            _c("span", [
              _c("i", { staticClass: "font-icon font-icon-help" }),
              _vm._v(" "),
              _c("span", { staticClass: "lbl" }, [_vm._v("Support")])
            ]),
            _vm._v(" "),
            _c("ul", [
              _c("li", [
                _c("a", { attrs: { href: "documentation.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Docs (example)")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "faq.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("FAQ Simple")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "faq-search.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("FAQ Search")])
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "red" }, [
            _c(
              "a",
              { staticClass: "label-right", attrs: { href: "contacts.html" } },
              [
                _c("i", { staticClass: "font-icon font-icon-contacts" }),
                _vm._v(" "),
                _c("span", { staticClass: "lbl" }, [_vm._v("Contacts")]),
                _vm._v(" "),
                _c(
                  "span",
                  { staticClass: "label label-custom label-pill label-danger" },
                  [_vm._v("35")]
                )
              ]
            )
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "magenta opened" }, [
            _c("a", { attrs: { href: "scheduler.html" } }, [
              _c("i", { staticClass: "font-icon font-icon-calend" }),
              _vm._v(" "),
              _c("span", { staticClass: "lbl" }, [_vm._v("Calendar")])
            ])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "grey with-sub" }, [
            _c("span", [
              _c("span", { staticClass: "glyphicon glyphicon-duplicate" }),
              _vm._v(" "),
              _c("span", { staticClass: "lbl" }, [_vm._v("Pages")])
            ]),
            _vm._v(" "),
            _c("ul", [
              _c("li", [
                _c("a", { attrs: { href: "email_templates.html" } }, [
                  _c("span", { staticClass: "lbl" }, [
                    _vm._v("Email Templates")
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "blank.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Blank")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "empty.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Empty List")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "prices.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Prices")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "typography.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Typography")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "sign-in.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Login")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "sign-up.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Register")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "reset-password.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Reset Password")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "new-password.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("New Password")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "error-404.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Error 404")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "error-500.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Error 500")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "cards.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Cards")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "avatars.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Avatars")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "ribbons.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Ribbons")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "icons-startui.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Icons")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "invoice.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Invoice")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "helpers.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Helpers")])
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "blue-dirty" }, [
            _c("a", { attrs: { href: "list-tasks.html" } }, [
              _c("i", { staticClass: "font-icon font-icon-notebook" }),
              _vm._v(" "),
              _c("span", { staticClass: "lbl" }, [_vm._v("Tasks")])
            ])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "aquamarine" }, [
            _c("a", { attrs: { href: "contacts-page.html" } }, [
              _c("i", { staticClass: "font-icon font-icon-mail" }),
              _vm._v(" "),
              _c("span", { staticClass: "lbl" }, [_vm._v("Contact form")])
            ])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "blue" }, [
            _c("a", { attrs: { href: "files.html" } }, [
              _c("i", {
                staticClass: "font-icon glyphicon glyphicon-paperclip"
              }),
              _vm._v(" "),
              _c("span", { staticClass: "lbl" }, [_vm._v("File Manager")])
            ])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "gold" }, [
            _c("a", { attrs: { href: "gallery.html" } }, [
              _c("i", { staticClass: "font-icon font-icon-picture-2" }),
              _vm._v(" "),
              _c("span", { staticClass: "lbl" }, [_vm._v("Gallery")])
            ])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "red" }, [
            _c("a", { attrs: { href: "project.html" } }, [
              _c("i", { staticClass: "font-icon font-icon-case-2" }),
              _vm._v(" "),
              _c("span", { staticClass: "lbl" }, [_vm._v("Project")])
            ])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "brown with-sub" }, [
            _c("span", [
              _c("span", { staticClass: "font-icon font-icon-chart" }),
              _vm._v(" "),
              _c("span", { staticClass: "lbl" }, [_vm._v("Charts")])
            ]),
            _vm._v(" "),
            _c("ul", [
              _c("li", [
                _c("a", { attrs: { href: "charts-c3js.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("C3.js")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "charts-peity.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Peity")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "charts-plottable.html" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Plottable.js")])
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "grey with-sub" }, [
            _c("span", [
              _c("span", { staticClass: "font-icon font-icon-burger" }),
              _vm._v(" "),
              _c("span", { staticClass: "lbl" }, [_vm._v("Nested Menu")])
            ]),
            _vm._v(" "),
            _c("ul", [
              _c("li", [
                _c("a", { attrs: { href: "#" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Level 1")])
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "#" } }, [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Level 1")])
                ])
              ]),
              _vm._v(" "),
              _c("li", { staticClass: "with-sub" }, [
                _c("span", [
                  _c("span", { staticClass: "lbl" }, [_vm._v("Level 2")])
                ]),
                _vm._v(" "),
                _c("ul", [
                  _c("li", [
                    _c("a", { attrs: { href: "#" } }, [
                      _c("span", { staticClass: "lbl" }, [_vm._v("Level 2")])
                    ])
                  ]),
                  _vm._v(" "),
                  _c("li", [
                    _c("a", { attrs: { href: "#" } }, [
                      _c("span", { staticClass: "lbl" }, [_vm._v("Level 2")])
                    ])
                  ]),
                  _vm._v(" "),
                  _c("li", { staticClass: "with-sub" }, [
                    _c("span", [
                      _c("span", { staticClass: "lbl" }, [_vm._v("Level 3")])
                    ]),
                    _vm._v(" "),
                    _c("ul", [
                      _c("li", [
                        _c("a", { attrs: { href: "#" } }, [
                          _c("span", { staticClass: "lbl" }, [
                            _vm._v("Level 3")
                          ])
                        ])
                      ]),
                      _vm._v(" "),
                      _c("li", [
                        _c("a", { attrs: { href: "#" } }, [
                          _c("span", { staticClass: "lbl" }, [
                            _vm._v("Level 3")
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ])
          ])
        ]),
        _vm._v(" "),
        _c("section", [
          _c("header", { staticClass: "side-menu-title" }, [_vm._v("Tags")]),
          _vm._v(" "),
          _c("ul", { staticClass: "side-menu-list" }, [
            _c("li", [
              _c("a", { attrs: { href: "#" } }, [
                _c("i", { staticClass: "tag-color green" }),
                _vm._v(" "),
                _c("span", { staticClass: "lbl" }, [_vm._v("Website")])
              ])
            ]),
            _vm._v(" "),
            _c("li", [
              _c("a", { attrs: { href: "#" } }, [
                _c("i", { staticClass: "tag-color grey-blue" }),
                _vm._v(" "),
                _c("span", { staticClass: "lbl" }, [_vm._v("Bugs/Errors")])
              ])
            ]),
            _vm._v(" "),
            _c("li", [
              _c("a", { attrs: { href: "#" } }, [
                _c("i", { staticClass: "tag-color red" }),
                _vm._v(" "),
                _c("span", { staticClass: "lbl" }, [_vm._v("General Problem")])
              ])
            ]),
            _vm._v(" "),
            _c("li", [
              _c("a", { attrs: { href: "#" } }, [
                _c("i", { staticClass: "tag-color pink" }),
                _vm._v(" "),
                _c("span", { staticClass: "lbl" }, [_vm._v("Questions")])
              ])
            ]),
            _vm._v(" "),
            _c("li", [
              _c("a", { attrs: { href: "#" } }, [
                _c("i", { staticClass: "tag-color orange" }),
                _vm._v(" "),
                _c("span", { staticClass: "lbl" }, [_vm._v("Ideas")])
              ])
            ])
          ])
        ])
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-af98d6e0", module.exports)
  }
}

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(64)
/* template */
var __vue_template__ = __webpack_require__(65)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/shareds/sidebar/SideMenuPanelContainer.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-69471a44", Component.options)
  } else {
    hotAPI.reload("data-v-69471a44", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "control-panel-container" }, [
      _c("ul", [
        _c("li", { staticClass: "tasks" }, [
          _c("div", { staticClass: "control-item-header" }, [
            _c("a", { staticClass: "icon-toggle", attrs: { href: "#" } }, [
              _c("span", { staticClass: "caret-down fa fa-caret-down" }),
              _vm._v(" "),
              _c("span", { staticClass: "icon fa fa-tasks" })
            ]),
            _vm._v(" "),
            _c("span", { staticClass: "text" }, [_vm._v("Task list")]),
            _vm._v(" "),
            _c("div", { staticClass: "actions" }, [
              _c("a", { attrs: { href: "#" } }, [
                _c("span", { staticClass: "fa fa-refresh" })
              ]),
              _vm._v(" "),
              _c("a", { attrs: { href: "#" } }, [
                _c("span", { staticClass: "fa fa-cog" })
              ]),
              _vm._v(" "),
              _c("a", { attrs: { href: "#" } }, [
                _c("span", { staticClass: "fa fa-trash" })
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "control-item-content" }, [
            _c("div", { staticClass: "control-item-content-text" }, [
              _vm._v("You don't have pending tasks.")
            ])
          ])
        ]),
        _vm._v(" "),
        _c("li", { staticClass: "sticky-note" }, [
          _c("div", { staticClass: "control-item-header" }, [
            _c("a", { staticClass: "icon-toggle", attrs: { href: "#" } }, [
              _c("span", { staticClass: "caret-down fa fa-caret-down" }),
              _vm._v(" "),
              _c("span", { staticClass: "icon fa fa-file" })
            ]),
            _vm._v(" "),
            _c("span", { staticClass: "text" }, [_vm._v("Sticky Note")]),
            _vm._v(" "),
            _c("div", { staticClass: "actions" }, [
              _c("a", { attrs: { href: "#" } }, [
                _c("span", { staticClass: "fa fa-refresh" })
              ]),
              _vm._v(" "),
              _c("a", { attrs: { href: "#" } }, [
                _c("span", { staticClass: "fa fa-cog" })
              ]),
              _vm._v(" "),
              _c("a", { attrs: { href: "#" } }, [
                _c("span", { staticClass: "fa fa-trash" })
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "control-item-content" }, [
            _c("div", { staticClass: "control-item-content-text" }, [
              _vm._v(
                "\n                    StartUI – a full featured, premium web application admin dashboard built with Twitter Bootstrap\n                    4, JQuery and CSS\n                "
              )
            ])
          ])
        ]),
        _vm._v(" "),
        _c("li", { staticClass: "emails" }, [
          _c("div", { staticClass: "control-item-header" }, [
            _c("a", { staticClass: "icon-toggle", attrs: { href: "#" } }, [
              _c("span", { staticClass: "caret-down fa fa-caret-down" }),
              _vm._v(" "),
              _c("span", { staticClass: "icon fa fa-envelope" })
            ]),
            _vm._v(" "),
            _c("span", { staticClass: "text" }, [_vm._v("Recent e-mails")]),
            _vm._v(" "),
            _c("div", { staticClass: "actions" }, [
              _c("a", { attrs: { href: "#" } }, [
                _c("span", { staticClass: "fa fa-refresh" })
              ]),
              _vm._v(" "),
              _c("a", { attrs: { href: "#" } }, [
                _c("span", { staticClass: "fa fa-cog" })
              ]),
              _vm._v(" "),
              _c("a", { attrs: { href: "#" } }, [
                _c("span", { staticClass: "fa fa-trash" })
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "control-item-content" }, [
            _c("section", { staticClass: "control-item-actions" }, [
              _c("a", { staticClass: "link", attrs: { href: "#" } }, [
                _vm._v("My e-mails")
              ]),
              _vm._v(" "),
              _c("a", { staticClass: "mark", attrs: { href: "#" } }, [
                _vm._v("Mark visible as read")
              ])
            ]),
            _vm._v(" "),
            _c("ul", { staticClass: "control-item-lists" }, [
              _c("li", [
                _c("a", { attrs: { href: "#" } }, [
                  _c("h6", [_vm._v("Welcome to the Community!")]),
                  _vm._v(" "),
                  _c("div", [_vm._v("Hi, welcome to the my app...")]),
                  _vm._v(" "),
                  _c("div", [
                    _vm._v(
                      "\n                                Message text\n                            "
                    )
                  ])
                ]),
                _vm._v(" "),
                _c("a", { staticClass: "reply-all", attrs: { href: "#" } }, [
                  _vm._v("Reply all")
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "#" } }, [
                  _c("h6", [_vm._v("Welcome to the Community!")]),
                  _vm._v(" "),
                  _c("div", [_vm._v("Hi, welcome to the my app...")]),
                  _vm._v(" "),
                  _c("div", [
                    _vm._v(
                      "\n                                Message text\n                            "
                    )
                  ])
                ]),
                _vm._v(" "),
                _c("a", { staticClass: "reply-all", attrs: { href: "#" } }, [
                  _vm._v("Reply all")
                ])
              ]),
              _vm._v(" "),
              _c("li", [
                _c("a", { attrs: { href: "#" } }, [
                  _c("h6", [_vm._v("Welcome to the Community!")]),
                  _vm._v(" "),
                  _c("div", [_vm._v("Hi, welcome to the my app...")]),
                  _vm._v(" "),
                  _c("div", [
                    _vm._v(
                      "\n                                Message text\n                            "
                    )
                  ])
                ]),
                _vm._v(" "),
                _c("a", { staticClass: "reply-all", attrs: { href: "#" } }, [
                  _vm._v("Reply all")
                ])
              ])
            ])
          ])
        ]),
        _vm._v(" "),
        _c("li", { staticClass: "add" }, [
          _c("div", { staticClass: "control-item-header" }, [
            _c(
              "a",
              { staticClass: "icon-toggle no-caret", attrs: { href: "#" } },
              [_c("span", { staticClass: "icon fa fa-plus" })]
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c("a", { staticClass: "control-panel-toggle" }, [
        _c("span", { staticClass: "fa fa-angle-double-left" })
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-69471a44", module.exports)
  }
}

/***/ })
],[8]);