webpackJsonp([1],[
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
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(73)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(75)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(77)
/* template */
var __vue_template__ = __webpack_require__(78)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4060e761"
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
Component.options.__file = "resources/assets/js/components/shareds/StatisticBoxHelper.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4060e761", Component.options)
  } else {
    hotAPI.reload("data-v-4060e761", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(99)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(101)
/* template */
var __vue_template__ = __webpack_require__(102)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1b2002c5"
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
Component.options.__file = "resources/assets/js/components/shareds/BoxTypicalPanelHelper.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1b2002c5", Component.options)
  } else {
    hotAPI.reload("data-v-1b2002c5", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(69);


/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_statistics_box_OrderApproved__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_statistics_box_OrderApproved___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_statistics_box_OrderApproved__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_statistics_box_OrderCanceled__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_statistics_box_OrderCanceled___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_statistics_box_OrderCanceled__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_statistics_box_OrderDone__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_statistics_box_OrderDone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_statistics_box_OrderDone__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_statistics_box_OrderPending__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_statistics_box_OrderPending___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_statistics_box_OrderPending__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_box_panel_OrderRecent__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_box_panel_OrderRecent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_box_panel_OrderRecent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_box_panel_RecentComments__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_box_panel_RecentComments___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_box_panel_RecentComments__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_box_panel_Contacts__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_box_panel_Contacts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_box_panel_Contacts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_statistics_chart_SaleWeek__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_statistics_chart_SaleWeek___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__components_statistics_chart_SaleWeek__);

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
window.Vue = __webpack_require__(4);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */










var app = new Vue({
    el: '#home',
    components: {
        'sale-week': __WEBPACK_IMPORTED_MODULE_7__components_statistics_chart_SaleWeek___default.a,
        'order-approved': __WEBPACK_IMPORTED_MODULE_0__components_statistics_box_OrderApproved___default.a,
        'order-canceled': __WEBPACK_IMPORTED_MODULE_1__components_statistics_box_OrderCanceled___default.a,
        'order-done': __WEBPACK_IMPORTED_MODULE_2__components_statistics_box_OrderDone___default.a,
        'order-pending': __WEBPACK_IMPORTED_MODULE_3__components_statistics_box_OrderPending___default.a,
        'order-recent': __WEBPACK_IMPORTED_MODULE_4__components_box_panel_OrderRecent___default.a,
        'recent-comments': __WEBPACK_IMPORTED_MODULE_5__components_box_panel_RecentComments___default.a,
        'contacts': __WEBPACK_IMPORTED_MODULE_6__components_box_panel_Contacts___default.a
    }
});

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(71)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(74)
/* template */
var __vue_template__ = __webpack_require__(79)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-13282a40"
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
Component.options.__file = "resources/assets/js/components/pages/home/components/statistics/box/OrderApproved.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-13282a40", Component.options)
  } else {
    hotAPI.reload("data-v-13282a40", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(72);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("0b1f3d3a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../../../node_modules/css-loader/index.js!../../../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-13282a40\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./OrderApproved.vue", function() {
     var newContent = require("!!../../../../../../../../../node_modules/css-loader/index.js!../../../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-13282a40\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./OrderApproved.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 73 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shareds_StatisticBoxHelper__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shareds_StatisticBoxHelper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__shareds_StatisticBoxHelper__);
//
//
//
//
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
        'statistic': __WEBPACK_IMPORTED_MODULE_0__shareds_StatisticBoxHelper___default.a
    },
    props: [],
    mounted: function mounted() {},
    data: function data() {
        return {};
    },

    methods: {},
    computed: {}
});

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(76);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("d8c5c886", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4060e761\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./StatisticBoxHelper.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4060e761\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./StatisticBoxHelper.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.statistic-box[data-v-4060e761] {\n    color: #fff;\n}\n", ""]);

// exports


/***/ }),
/* 77 */
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

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        color: {
            type: String
        },
        sizeColSM: {
            type: Number,
            default: 6
        }
    },
    mounted: function mounted() {},
    data: function data() {
        return {};
    },

    methods: {},
    computed: {
        defineSizeSM: function defineSizeSM() {
            return 'col-sm-' + this.sizeColSM;
        }
    }
});

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { class: _vm.defineSizeSM }, [
    _c(
      "article",
      { staticClass: "statistic-box", class: _vm.color },
      [_vm._t("default")],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4060e761", module.exports)
  }
}

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("statistic", { attrs: { color: "green", sizeColSM: 6 } }, [
    _c("div", [
      _c("div", { staticClass: "number" }, [_vm._v("--")]),
      _vm._v(" "),
      _c("div", { staticClass: "caption" }, [
        _c("div", [_vm._v("Nenhum pedido aprovado nos últimos 30 dias")])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-13282a40", module.exports)
  }
}

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(81)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(83)
/* template */
var __vue_template__ = __webpack_require__(84)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-9e74f1bc"
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
Component.options.__file = "resources/assets/js/components/pages/home/components/statistics/box/OrderCanceled.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9e74f1bc", Component.options)
  } else {
    hotAPI.reload("data-v-9e74f1bc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(82);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("70ebd51c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../../../node_modules/css-loader/index.js!../../../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9e74f1bc\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./OrderCanceled.vue", function() {
     var newContent = require("!!../../../../../../../../../node_modules/css-loader/index.js!../../../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9e74f1bc\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./OrderCanceled.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shareds_StatisticBoxHelper__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shareds_StatisticBoxHelper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__shareds_StatisticBoxHelper__);
//
//
//
//
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
        'statistic': __WEBPACK_IMPORTED_MODULE_0__shareds_StatisticBoxHelper___default.a
    },
    props: [],
    mounted: function mounted() {},
    data: function data() {
        return {};
    },

    methods: {},
    computed: {}
});

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("statistic", { attrs: { color: "red", sizeColSM: 6 } }, [
    _c("div", [
      _c("div", { staticClass: "number" }, [_vm._v("01")]),
      _vm._v(" "),
      _c("div", { staticClass: "caption" }, [
        _c("div", [_vm._v("Pedidos cancelados nos últimos 30 dias")])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-9e74f1bc", module.exports)
  }
}

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(86)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(88)
/* template */
var __vue_template__ = __webpack_require__(89)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-410e6a0b"
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
Component.options.__file = "resources/assets/js/components/pages/home/components/statistics/box/OrderDone.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-410e6a0b", Component.options)
  } else {
    hotAPI.reload("data-v-410e6a0b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(87);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("7c56c494", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../../../node_modules/css-loader/index.js!../../../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-410e6a0b\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./OrderDone.vue", function() {
     var newContent = require("!!../../../../../../../../../node_modules/css-loader/index.js!../../../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-410e6a0b\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./OrderDone.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shareds_StatisticBoxHelper__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shareds_StatisticBoxHelper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__shareds_StatisticBoxHelper__);
//
//
//
//
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
        'statistic': __WEBPACK_IMPORTED_MODULE_0__shareds_StatisticBoxHelper___default.a
    },
    props: [],
    mounted: function mounted() {},
    data: function data() {
        return {};
    },

    methods: {},
    computed: {}
});

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("statistic", { attrs: { color: "yellow", sizeColSM: 6 } }, [
    _c("div", [
      _c("div", { staticClass: "number" }, [_vm._v("05")]),
      _vm._v(" "),
      _c("div", { staticClass: "caption" }, [
        _c("div", [_vm._v("Pedidos feitos nos últimos 30 dias")])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-410e6a0b", module.exports)
  }
}

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(91)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(93)
/* template */
var __vue_template__ = __webpack_require__(94)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5228fbc4"
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
Component.options.__file = "resources/assets/js/components/pages/home/components/statistics/box/OrderPending.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5228fbc4", Component.options)
  } else {
    hotAPI.reload("data-v-5228fbc4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(92);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("5210e996", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../../../node_modules/css-loader/index.js!../../../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5228fbc4\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./OrderPending.vue", function() {
     var newContent = require("!!../../../../../../../../../node_modules/css-loader/index.js!../../../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5228fbc4\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./OrderPending.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shareds_StatisticBoxHelper__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shareds_StatisticBoxHelper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__shareds_StatisticBoxHelper__);
//
//
//
//
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
        'statistic': __WEBPACK_IMPORTED_MODULE_0__shareds_StatisticBoxHelper___default.a
    },
    props: [],
    mounted: function mounted() {},
    data: function data() {
        return {};
    },

    methods: {},
    computed: {}
});

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("statistic", { attrs: { color: "purple", sizeColSM: 6 } }, [
    _c("div", [
      _c("div", { staticClass: "number" }, [_vm._v("--")]),
      _vm._v(" "),
      _c("div", { staticClass: "caption" }, [
        _c("div", [_vm._v("Nenhum pedido pendente nos últimos 30 dias.")])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5228fbc4", module.exports)
  }
}

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(96)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(98)
/* template */
var __vue_template__ = __webpack_require__(103)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3f648a7e"
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
Component.options.__file = "resources/assets/js/components/pages/home/components/box-panel/OrderRecent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3f648a7e", Component.options)
  } else {
    hotAPI.reload("data-v-3f648a7e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(97);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("4d155266", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../../node_modules/css-loader/index.js!../../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3f648a7e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./OrderRecent.vue", function() {
     var newContent = require("!!../../../../../../../../node_modules/css-loader/index.js!../../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3f648a7e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./OrderRecent.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shareds_BoxTypicalPanelHelper__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shareds_BoxTypicalPanelHelper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__shareds_BoxTypicalPanelHelper__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        'box-panel': __WEBPACK_IMPORTED_MODULE_0__shareds_BoxTypicalPanelHelper___default.a
    },
    props: [],
    mounted: function mounted() {

        $(document).ready(function () {

            $('.panel').each(function () {
                try {
                    $(this).lobiPanel({
                        sortable: true
                    }).on('dragged.lobiPanel', function (ev, lobiPanel) {
                        $('.dahsboard-column').matchHeight();
                    });
                } catch (err) {}
            });
        });
    },
    data: function data() {
        return {};
    },

    methods: {},
    computed: {}
});

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(100);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("7f40d653", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1b2002c5\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./BoxTypicalPanelHelper.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1b2002c5\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./BoxTypicalPanelHelper.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 101 */
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

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['title'],
    mounted: function mounted() {},
    data: function data() {
        return {};
    },

    methods: {},
    computed: {}

});

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "section",
    {
      staticClass:
        "box-typical box-typical-dashboard panel panel-default scrollable"
    },
    [
      _c("header", { staticClass: "box-typical-header panel-heading" }, [
        _c("h3", { staticClass: "panel-title" }, [_vm._v(_vm._s(_vm.title))])
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "box-typical-body panel-body" },
        [_vm._t("default")],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1b2002c5", module.exports)
  }
}

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("box-panel", { attrs: { title: "Pedidos Recentes" } }, [
    _c("table", { staticClass: "tbl-typical" }, [
      _c("tr", [
        _c("th", [_c("div", [_vm._v("Status")])]),
        _vm._v(" "),
        _c("th", [_c("div", [_vm._v("Clients")])]),
        _vm._v(" "),
        _c("th", { attrs: { align: "center" } }, [
          _c("div", [_vm._v("Orders#")])
        ]),
        _vm._v(" "),
        _c("th", { attrs: { align: "center" } }, [_c("div", [_vm._v("Date")])])
      ]),
      _vm._v(" "),
      _c("tr", [
        _c("td", [
          _c("span", { staticClass: "label label-primary" }, [_vm._v("Paid")]),
          _vm._v(" "),
          _c("span", { staticClass: "label label-success" }, [_vm._v("Active")])
        ]),
        _vm._v(" "),
        _c("td", [_vm._v("John Doe")]),
        _vm._v(" "),
        _c("td", { attrs: { align: "center" } }, [_vm._v("3435362")]),
        _vm._v(" "),
        _c(
          "td",
          {
            staticClass: "color-blue-grey",
            attrs: { nowrap: "", align: "center" }
          },
          [
            _c("span", { staticClass: "semibold" }, [_vm._v("Today")]),
            _vm._v(" 8:30")
          ]
        )
      ]),
      _vm._v(" "),
      _c("tr", [
        _c("td", [
          _c("span", { staticClass: "label label-primary" }, [_vm._v("Paid")]),
          _vm._v(" "),
          _c("span", { staticClass: "label label-success" }, [_vm._v("Active")])
        ]),
        _vm._v(" "),
        _c("td", [_vm._v("Thomas Bayer")]),
        _vm._v(" "),
        _c("td", { attrs: { align: "center" } }, [_vm._v("3435362")]),
        _vm._v(" "),
        _c(
          "td",
          {
            staticClass: "color-blue-grey",
            attrs: { nowrap: "", align: "center" }
          },
          [
            _c("span", { staticClass: "semibold" }, [_vm._v("Today")]),
            _vm._v(" 16:30")
          ]
        )
      ]),
      _vm._v(" "),
      _c("tr", [
        _c("td", [
          _c("span", { staticClass: "label label-primary" }, [_vm._v("Paid")]),
          _vm._v(" "),
          _c("span", { staticClass: "label label-default" }, [
            _vm._v("Inactive")
          ])
        ]),
        _vm._v(" "),
        _c("td", [_vm._v("Nicolas Karabat")]),
        _vm._v(" "),
        _c("td", { attrs: { align: "center" } }, [_vm._v("3435362")]),
        _vm._v(" "),
        _c(
          "td",
          {
            staticClass: "color-blue-grey",
            attrs: { nowrap: "", align: "center" }
          },
          [_c("span", { staticClass: "semibold" }, [_vm._v("Yesterday")])]
        )
      ]),
      _vm._v(" "),
      _c("tr", [
        _c("td", [
          _c("span", { staticClass: "label label-default" }, [
            _vm._v("Unpaid")
          ]),
          _vm._v(" "),
          _c("span", { staticClass: "label label-default" }, [
            _vm._v("Inactive")
          ])
        ]),
        _vm._v(" "),
        _c("td", [_vm._v("Alexandre Pome")]),
        _vm._v(" "),
        _c("td", { attrs: { align: "center" } }, [_vm._v("3435362")]),
        _vm._v(" "),
        _c(
          "td",
          {
            staticClass: "color-blue-grey",
            attrs: { nowrap: "", align: "center" }
          },
          [_vm._v("23th May")]
        )
      ]),
      _vm._v(" "),
      _c("tr", [
        _c("td", [
          _c("span", { staticClass: "label label-primary" }, [_vm._v("Paid")]),
          _vm._v(" "),
          _c("span", { staticClass: "label label-success" }, [_vm._v("Active")])
        ]),
        _vm._v(" "),
        _c("td", [_vm._v("John Doe")]),
        _vm._v(" "),
        _c("td", { attrs: { align: "center" } }, [_vm._v("3435362")]),
        _vm._v(" "),
        _c(
          "td",
          {
            staticClass: "color-blue-grey",
            attrs: { nowrap: "", align: "center" }
          },
          [
            _c("span", { staticClass: "semibold" }, [_vm._v("Today")]),
            _vm._v(" 8:30")
          ]
        )
      ]),
      _vm._v(" "),
      _c("tr", [
        _c("td", [
          _c("span", { staticClass: "label label-primary" }, [_vm._v("Paid")]),
          _vm._v(" "),
          _c("span", { staticClass: "label label-success" }, [_vm._v("Active")])
        ]),
        _vm._v(" "),
        _c("td", [_vm._v("Thomas Bayer")]),
        _vm._v(" "),
        _c("td", { attrs: { align: "center" } }, [_vm._v("3435362")]),
        _vm._v(" "),
        _c(
          "td",
          {
            staticClass: "color-blue-grey",
            attrs: { nowrap: "", align: "center" }
          },
          [
            _c("span", { staticClass: "semibold" }, [_vm._v("Today")]),
            _vm._v(" 16:30")
          ]
        )
      ]),
      _vm._v(" "),
      _c("tr", [
        _c("td", [
          _c("span", { staticClass: "label label-primary" }, [_vm._v("Paid")]),
          _vm._v(" "),
          _c("span", { staticClass: "label label-default" }, [
            _vm._v("Inactive")
          ])
        ]),
        _vm._v(" "),
        _c("td", [_vm._v("Nicolas Karabat")]),
        _vm._v(" "),
        _c("td", { attrs: { align: "center" } }, [_vm._v("3435362")]),
        _vm._v(" "),
        _c(
          "td",
          {
            staticClass: "color-blue-grey",
            attrs: { nowrap: "", align: "center" }
          },
          [_c("span", { staticClass: "semibold" }, [_vm._v("Yesterday")])]
        )
      ]),
      _vm._v(" "),
      _c("tr", [
        _c("td", [
          _c("span", { staticClass: "label label-default" }, [
            _vm._v("Unpaid")
          ]),
          _vm._v(" "),
          _c("span", { staticClass: "label label-default" }, [
            _vm._v("Inactive")
          ])
        ]),
        _vm._v(" "),
        _c("td", [_vm._v("Alexandre Pome")]),
        _vm._v(" "),
        _c("td", { attrs: { align: "center" } }, [_vm._v("3435362")]),
        _vm._v(" "),
        _c(
          "td",
          {
            staticClass: "color-blue-grey",
            attrs: { nowrap: "", align: "center" }
          },
          [_vm._v("23th May")]
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3f648a7e", module.exports)
  }
}

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(105)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(107)
/* template */
var __vue_template__ = __webpack_require__(108)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-11d29727"
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
Component.options.__file = "resources/assets/js/components/pages/home/components/box-panel/RecentComments.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-11d29727", Component.options)
  } else {
    hotAPI.reload("data-v-11d29727", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(106);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("5a684bfa", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../../node_modules/css-loader/index.js!../../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-11d29727\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./RecentComments.vue", function() {
     var newContent = require("!!../../../../../../../../node_modules/css-loader/index.js!../../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-11d29727\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./RecentComments.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shareds_BoxTypicalPanelHelper__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shareds_BoxTypicalPanelHelper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__shareds_BoxTypicalPanelHelper__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        'box-panel': __WEBPACK_IMPORTED_MODULE_0__shareds_BoxTypicalPanelHelper___default.a
    },
    props: [],
    mounted: function mounted() {

        $(document).ready(function () {

            $('.panel').each(function () {
                try {
                    $(this).lobiPanel({
                        sortable: true
                    }).on('dragged.lobiPanel', function (ev, lobiPanel) {
                        $('.dahsboard-column').matchHeight();
                    });
                } catch (err) {}
            });
        });
    },
    data: function data() {
        return {};
    },

    methods: {},
    computed: {}
});

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("box-panel", { attrs: { title: "Comentários Recentes" } }, [
    _c("table", { staticClass: "tbl-typical" }, [
      _c("tr", [
        _c("th", [_c("div", [_vm._v("Status")])]),
        _vm._v(" "),
        _c("th", [_c("div", [_vm._v("Subject")])]),
        _vm._v(" "),
        _c("th", { attrs: { align: "center" } }, [
          _c("div", [_vm._v("Department")])
        ]),
        _vm._v(" "),
        _c("th", { attrs: { align: "center" } }, [_c("div", [_vm._v("Date")])])
      ]),
      _vm._v(" "),
      _c("tr", [
        _c("td", [
          _c("span", { staticClass: "label label-success" }, [_vm._v("Open")])
        ]),
        _vm._v(" "),
        _c("td", [_vm._v("Website down for one week")]),
        _vm._v(" "),
        _c("td", { attrs: { align: "center" } }, [_vm._v("Support")]),
        _vm._v(" "),
        _c("td", { attrs: { nowrap: "", align: "center" } }, [
          _c("span", { staticClass: "semibold" }, [_vm._v("Today")]),
          _vm._v(" 8:30")
        ])
      ]),
      _vm._v(" "),
      _c("tr", [
        _c("td", [
          _c("span", { staticClass: "label label-success" }, [_vm._v("Open")])
        ]),
        _vm._v(" "),
        _c("td", [_vm._v("Restoring default settings")]),
        _vm._v(" "),
        _c("td", { attrs: { align: "center" } }, [_vm._v("Support")]),
        _vm._v(" "),
        _c("td", { attrs: { nowrap: "", align: "center" } }, [
          _c("span", { staticClass: "semibold" }, [_vm._v("Today")]),
          _vm._v(" 16:30")
        ])
      ]),
      _vm._v(" "),
      _c("tr", [
        _c("td", [
          _c("span", { staticClass: "label label-warning" }, [
            _vm._v("Progress")
          ])
        ]),
        _vm._v(" "),
        _c("td", [_vm._v("Loosing control on server")]),
        _vm._v(" "),
        _c("td", { attrs: { align: "center" } }, [_vm._v("Support")]),
        _vm._v(" "),
        _c("td", { attrs: { nowrap: "", align: "center" } }, [
          _c("span", { staticClass: "semibold" }, [_vm._v("Yesterday")])
        ])
      ]),
      _vm._v(" "),
      _c("tr", [
        _c("td", [
          _c("span", { staticClass: "label label-danger" }, [_vm._v("Closed")])
        ]),
        _vm._v(" "),
        _c("td", [_vm._v("Authorizations keys")]),
        _vm._v(" "),
        _c("td", { attrs: { align: "center" } }, [_vm._v("Support")]),
        _vm._v(" "),
        _c("td", { attrs: { nowrap: "", align: "center" } }, [
          _vm._v("23th May")
        ])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-11d29727", module.exports)
  }
}

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(110)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(112)
/* template */
var __vue_template__ = __webpack_require__(113)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-30bb600b"
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
Component.options.__file = "resources/assets/js/components/pages/home/components/box-panel/Contacts.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-30bb600b", Component.options)
  } else {
    hotAPI.reload("data-v-30bb600b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(111);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("6cba220a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../../node_modules/css-loader/index.js!../../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-30bb600b\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Contacts.vue", function() {
     var newContent = require("!!../../../../../../../../node_modules/css-loader/index.js!../../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-30bb600b\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Contacts.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shareds_BoxTypicalPanelHelper__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shareds_BoxTypicalPanelHelper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__shareds_BoxTypicalPanelHelper__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        'box-panel': __WEBPACK_IMPORTED_MODULE_0__shareds_BoxTypicalPanelHelper___default.a
    },
    props: [],
    mounted: function mounted() {

        $(document).ready(function () {

            $('.panel').each(function () {
                try {
                    $(this).lobiPanel({
                        sortable: true
                    }).on('dragged.lobiPanel', function (ev, lobiPanel) {
                        $('.dahsboard-column').matchHeight();
                    });
                } catch (err) {}
            });
        });
    },
    data: function data() {
        return {};
    },

    methods: {},
    computed: {}
});

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("box-panel", { attrs: { title: "Contatos Recentes" } }, [
    _c("div", { staticClass: "contact-row-list" }, [
      _c("article", { staticClass: "contact-row" }, [
        _c("div", { staticClass: "user-card-row" }, [
          _c("div", { staticClass: "tbl-row" }, [
            _c("div", { staticClass: "tbl-cell tbl-cell-photo" }, [
              _c("a", { attrs: { href: "#" } }, [
                _c("img", { attrs: { src: "img/photo-64-2.jpg", alt: "" } })
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "tbl-cell" }, [
              _c("p", { staticClass: "user-card-row-name" }, [
                _c("a", { attrs: { href: "#" } }, [_vm._v("Tim Collins")])
              ]),
              _vm._v(" "),
              _c("p", { staticClass: "user-card-row-mail" }, [
                _c("a", { attrs: { href: "#" } }, [
                  _vm._v("timcolins@mail.com")
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "tbl-cell tbl-cell-status" }, [
              _vm._v("Director at Tony’s")
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("article", { staticClass: "contact-row" }, [
        _c("div", { staticClass: "user-card-row" }, [
          _c("div", { staticClass: "tbl-row" }, [
            _c("div", { staticClass: "tbl-cell tbl-cell-photo" }, [
              _c("a", { attrs: { href: "#" } }, [
                _c("img", { attrs: { src: "img/photo-64-1.jpg", alt: "" } })
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "tbl-cell" }, [
              _c("p", { staticClass: "user-card-row-name" }, [
                _c("a", { attrs: { href: "#" } }, [_vm._v("Maggy Smith")])
              ]),
              _vm._v(" "),
              _c("p", { staticClass: "user-card-row-mail" }, [
                _c("a", { attrs: { href: "#" } }, [
                  _vm._v("maggysmith@mail.com")
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "tbl-cell tbl-cell-status" }, [
              _vm._v("PR Manager")
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("article", { staticClass: "contact-row" }, [
        _c("div", { staticClass: "user-card-row" }, [
          _c("div", { staticClass: "tbl-row" }, [
            _c("div", { staticClass: "tbl-cell tbl-cell-photo" }, [
              _c("a", { attrs: { href: "#" } }, [
                _c("img", { attrs: { src: "img/photo-64-3.jpg", alt: "" } })
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "tbl-cell" }, [
              _c("p", { staticClass: "user-card-row-name" }, [
                _c("a", { attrs: { href: "#" } }, [_vm._v("Molly Bridjet")])
              ]),
              _vm._v(" "),
              _c("p", { staticClass: "user-card-row-mail" }, [
                _c("a", { attrs: { href: "#" } }, [_vm._v("mollybr@mail.com")])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "tbl-cell tbl-cell-status" }, [
              _vm._v("Assistan")
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("article", { staticClass: "contact-row" }, [
        _c("div", { staticClass: "user-card-row" }, [
          _c("div", { staticClass: "tbl-row" }, [
            _c("div", { staticClass: "tbl-cell tbl-cell-photo" }, [
              _c("a", { attrs: { href: "#" } }, [
                _c("img", { attrs: { src: "img/photo-64-4.jpg", alt: "" } })
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "tbl-cell" }, [
              _c("p", { staticClass: "user-card-row-name" }, [
                _c("a", { attrs: { href: "#" } }, [_vm._v("Maggy Smith")])
              ]),
              _vm._v(" "),
              _c("p", { staticClass: "user-card-row-mail" }, [
                _c("a", { attrs: { href: "#" } }, [
                  _vm._v("maggysmith@mail.com")
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "tbl-cell tbl-cell-status" }, [
              _vm._v("PR Manager")
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("article", { staticClass: "contact-row" }, [
        _c("div", { staticClass: "user-card-row" }, [
          _c("div", { staticClass: "tbl-row" }, [
            _c("div", { staticClass: "tbl-cell tbl-cell-photo" }, [
              _c("a", { attrs: { href: "#" } }, [
                _c("img", { attrs: { src: "img/photo-64-2.jpg", alt: "" } })
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "tbl-cell" }, [
              _c("p", { staticClass: "user-card-row-name" }, [
                _c("a", { attrs: { href: "#" } }, [_vm._v("Tim Collins")])
              ]),
              _vm._v(" "),
              _c("p", { staticClass: "user-card-row-mail" }, [
                _c("a", { attrs: { href: "#" } }, [
                  _vm._v("timcolins@mail.com")
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "tbl-cell tbl-cell-status" }, [
              _vm._v("Director at Tony’s")
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("article", { staticClass: "contact-row" }, [
        _c("div", { staticClass: "user-card-row" }, [
          _c("div", { staticClass: "tbl-row" }, [
            _c("div", { staticClass: "tbl-cell tbl-cell-photo" }, [
              _c("a", { attrs: { href: "#" } }, [
                _c("img", { attrs: { src: "img/photo-64-1.jpg", alt: "" } })
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "tbl-cell" }, [
              _c("p", { staticClass: "user-card-row-name" }, [
                _c("a", { attrs: { href: "#" } }, [_vm._v("Maggy Smith")])
              ]),
              _vm._v(" "),
              _c("p", { staticClass: "user-card-row-mail" }, [
                _c("a", { attrs: { href: "#" } }, [
                  _vm._v("maggysmith@mail.com")
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "tbl-cell tbl-cell-status" }, [
              _vm._v("PR Manager")
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("article", { staticClass: "contact-row" }, [
        _c("div", { staticClass: "user-card-row" }, [
          _c("div", { staticClass: "tbl-row" }, [
            _c("div", { staticClass: "tbl-cell tbl-cell-photo" }, [
              _c("a", { attrs: { href: "#" } }, [
                _c("img", { attrs: { src: "img/photo-64-3.jpg", alt: "" } })
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "tbl-cell" }, [
              _c("p", { staticClass: "user-card-row-name" }, [
                _c("a", { attrs: { href: "#" } }, [_vm._v("Molly Bridjet")])
              ]),
              _vm._v(" "),
              _c("p", { staticClass: "user-card-row-mail" }, [
                _c("a", { attrs: { href: "#" } }, [_vm._v("mollybr@mail.com")])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "tbl-cell tbl-cell-status" }, [
              _vm._v("Assistan")
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("article", { staticClass: "contact-row" }, [
        _c("div", { staticClass: "user-card-row" }, [
          _c("div", { staticClass: "tbl-row" }, [
            _c("div", { staticClass: "tbl-cell tbl-cell-photo" }, [
              _c("a", { attrs: { href: "#" } }, [
                _c("img", { attrs: { src: "img/photo-64-4.jpg", alt: "" } })
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "tbl-cell" }, [
              _c("p", { staticClass: "user-card-row-name" }, [
                _c("a", { attrs: { href: "#" } }, [_vm._v("Maggy Smith")])
              ]),
              _vm._v(" "),
              _c("p", { staticClass: "user-card-row-mail" }, [
                _c("a", { attrs: { href: "#" } }, [
                  _vm._v("maggysmith@mail.com")
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "tbl-cell tbl-cell-status" }, [
              _vm._v("PR Manager")
            ])
          ])
        ])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-30bb600b", module.exports)
  }
}

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(115)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(117)
/* template */
var __vue_template__ = __webpack_require__(118)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3efb16c6"
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
Component.options.__file = "resources/assets/js/components/pages/home/components/statistics/chart/SaleWeek.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3efb16c6", Component.options)
  } else {
    hotAPI.reload("data-v-3efb16c6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(116);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("33dfcbac", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../../../node_modules/css-loader/index.js!../../../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3efb16c6\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./SaleWeek.vue", function() {
     var newContent = require("!!../../../../../../../../../node_modules/css-loader/index.js!../../../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3efb16c6\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./SaleWeek.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.sale-week[data-v-3efb16c6] {\n}\n", ""]);

// exports


/***/ }),
/* 117 */
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'sale-week',
    props: [],
    mounted: function mounted() {

        $(document).ready(function () {

            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var dataTable = new google.visualization.DataTable();
                dataTable.addColumn('string', 'Day');
                dataTable.addColumn('number', 'Values');
                // A column for custom tooltip content
                dataTable.addColumn({ type: 'string', role: 'tooltip', 'p': { 'html': true } });
                dataTable.addRows([['MON', 130, ' '], ['TUE', 130, '130'], ['WED', 180, '180'], ['THU', 175, '175'], ['FRI', 200, '200'], ['SAT', 170, '170'], ['SUN', 250, '250'], ['MON', 220, '220'], ['TUE', 220, ' ']]);

                var options = {
                    height: 314,
                    legend: 'none',
                    areaOpacity: 0.18,
                    axisTitlesPosition: 'out',
                    hAxis: {
                        title: '',
                        textStyle: {
                            color: '#fff',
                            fontName: 'Proxima Nova',
                            fontSize: 11,
                            bold: true,
                            italic: false
                        },
                        textPosition: 'out'
                    },
                    vAxis: {
                        minValue: 0,
                        textPosition: 'out',
                        textStyle: {
                            color: '#fff',
                            fontName: 'Proxima Nova',
                            fontSize: 11,
                            bold: true,
                            italic: false
                        },
                        baselineColor: '#16b4fc',
                        ticks: [0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350],
                        gridlines: {
                            color: '#1ba0fc',
                            count: 15
                        }
                    },
                    lineWidth: 2,
                    colors: ['#fff'],
                    curveType: 'function',
                    pointSize: 5,
                    pointShapeType: 'circle',
                    pointFillColor: '#f00',
                    backgroundColor: {
                        fill: '#008ffb',
                        strokeWidth: 0
                    },
                    chartArea: {
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '100%'
                    },
                    fontSize: 11,
                    fontName: 'Proxima Nova',
                    tooltip: {
                        trigger: 'selection',
                        isHtml: true
                    }
                };

                var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
                chart.draw(dataTable, options);
            }

            $(window).resize(function () {
                drawChart();
                setTimeout(function () {}, 1000);
            });
        });
    },
    data: function data() {
        return {};
    },

    methods: {},
    computed: {}
});

/***/ }),
/* 118 */
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
    return _c("div", { staticClass: "chart-statistic-box" }, [
      _c("div", { staticClass: "chart-txt" }, [
        _c("div", { staticClass: "chart-txt-top" }, [
          _c("p", [
            _c("span", { staticClass: "unit" }, [_vm._v("$")]),
            _c("span", { staticClass: "number" }, [_vm._v("1540")])
          ]),
          _vm._v(" "),
          _c("p", { staticClass: "caption" }, [_vm._v("Vendas da Semana")])
        ]),
        _vm._v(" "),
        _c("table", { staticClass: "tbl-data" }, [
          _c("tr", [
            _c("td", { staticClass: "price color-purple" }, [_vm._v("120$")]),
            _vm._v(" "),
            _c("td", [_vm._v("Orders")])
          ]),
          _vm._v(" "),
          _c("tr", [
            _c("td", { staticClass: "price color-yellow" }, [_vm._v("15$")]),
            _vm._v(" "),
            _c("td", [_vm._v("Investments")])
          ]),
          _vm._v(" "),
          _c("tr", [
            _c("td", { staticClass: "price color-lime" }, [_vm._v("55$")]),
            _vm._v(" "),
            _c("td", [_vm._v("Others")])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "chart-container" }, [
        _c("div", { staticClass: "chart-container-in" }, [
          _c("div", { attrs: { id: "chart_div" } }),
          _vm._v(" "),
          _c("header", { staticClass: "chart-container-title" }, [
            _vm._v("Income")
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "chart-container-x" }, [
            _c("div", { staticClass: "item" }),
            _vm._v(" "),
            _c("div", { staticClass: "item" }, [_vm._v("tue")]),
            _vm._v(" "),
            _c("div", { staticClass: "item" }, [_vm._v("wed")]),
            _vm._v(" "),
            _c("div", { staticClass: "item" }, [_vm._v("thu")]),
            _vm._v(" "),
            _c("div", { staticClass: "item" }, [_vm._v("fri")]),
            _vm._v(" "),
            _c("div", { staticClass: "item" }, [_vm._v("sat")]),
            _vm._v(" "),
            _c("div", { staticClass: "item" }, [_vm._v("sun")]),
            _vm._v(" "),
            _c("div", { staticClass: "item" }, [_vm._v("mon")]),
            _vm._v(" "),
            _c("div", { staticClass: "item" })
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "chart-container-y" }, [
            _c("div", { staticClass: "item" }, [_vm._v("300")]),
            _vm._v(" "),
            _c("div", { staticClass: "item" }),
            _vm._v(" "),
            _c("div", { staticClass: "item" }, [_vm._v("250")]),
            _vm._v(" "),
            _c("div", { staticClass: "item" }),
            _vm._v(" "),
            _c("div", { staticClass: "item" }, [_vm._v("200")]),
            _vm._v(" "),
            _c("div", { staticClass: "item" }),
            _vm._v(" "),
            _c("div", { staticClass: "item" }, [_vm._v("150")]),
            _vm._v(" "),
            _c("div", { staticClass: "item" }),
            _vm._v(" "),
            _c("div", { staticClass: "item" }, [_vm._v("100")]),
            _vm._v(" "),
            _c("div", { staticClass: "item" }),
            _vm._v(" "),
            _c("div", { staticClass: "item" }, [_vm._v("50")]),
            _vm._v(" "),
            _c("div", { staticClass: "item" })
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
    require("vue-hot-reload-api")      .rerender("data-v-3efb16c6", module.exports)
  }
}

/***/ })
],[68]);