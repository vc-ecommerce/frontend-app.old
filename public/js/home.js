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
/* 1 */,
/* 2 */
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
/* 3 */
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

var listToStyles = __webpack_require__(8)

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(83)
/* template */
var __vue_template__ = __webpack_require__(84)
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
Component.options.__file = "resources/assets/js/components/layouts/Grid.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-baa32a7a", Component.options)
  } else {
    hotAPI.reload("data-v-baa32a7a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(85)
/* template */
var __vue_template__ = __webpack_require__(86)
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
Component.options.__file = "resources/assets/js/components/layouts/Article.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-31b58e89", Component.options)
  } else {
    hotAPI.reload("data-v-31b58e89", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 6 */,
/* 7 */,
/* 8 */
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
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(73);


/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_ChartSaleWeek__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_ChartSaleWeek___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_ChartSaleWeek__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_OrderApproved__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_OrderApproved___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_OrderApproved__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_OrderCanceled__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_OrderCanceled___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_OrderCanceled__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_OrderDone__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_OrderDone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_OrderDone__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_OrderPending__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_OrderPending___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_OrderPending__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_OrderRecent__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_OrderRecent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_OrderRecent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_RecentComments__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_RecentComments___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_RecentComments__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_Contacts__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_Contacts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__components_Contacts__);









var app = new Vue({
  el: '#content',
  components: {
    ChartSaleWeek: __WEBPACK_IMPORTED_MODULE_0__components_ChartSaleWeek___default.a,
    OrderApproved: __WEBPACK_IMPORTED_MODULE_1__components_OrderApproved___default.a,
    OrderCanceled: __WEBPACK_IMPORTED_MODULE_2__components_OrderCanceled___default.a,
    OrderDone: __WEBPACK_IMPORTED_MODULE_3__components_OrderDone___default.a,
    OrderPending: __WEBPACK_IMPORTED_MODULE_4__components_OrderPending___default.a,
    OrderRecent: __WEBPACK_IMPORTED_MODULE_5__components_OrderRecent___default.a,
    RecentComments: __WEBPACK_IMPORTED_MODULE_6__components_RecentComments___default.a,
    Contacts: __WEBPACK_IMPORTED_MODULE_7__components_Contacts___default.a
  },
  mounted: function mounted() {
    document.getElementById('content').style.display = 'block';
  }
});

/***/ }),
/* 74 */
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
var __vue_scopeId__ = "data-v-e212343a"
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
Component.options.__file = "resources/assets/js/pages/home/components/ChartSaleWeek.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e212343a", Component.options)
  } else {
    hotAPI.reload("data-v-e212343a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(76);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("0197657c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e212343a\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ChartSaleWeek.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e212343a\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ChartSaleWeek.vue");
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

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "\n.sale-week[data-v-e212343a] {\n}\n", ""]);

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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "ChartSaleWeek",
  props: [],
  mounted: function mounted() {
    $(document).ready(function () {
      google.charts.load("current", { packages: ["corechart"] });
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn("string", "Day");
        dataTable.addColumn("number", "Values");
        // A column for custom tooltip content
        dataTable.addColumn({
          type: "string",
          role: "tooltip",
          p: { html: true }
        });
        dataTable.addRows([["MON", 130, " "], ["TUE", 130, "130"], ["WED", 180, "180"], ["THU", 175, "175"], ["FRI", 200, "200"], ["SAT", 170, "170"], ["SUN", 250, "250"], ["MON", 220, "220"], ["TUE", 220, " "]]);

        var options = {
          height: 314,
          legend: "none",
          areaOpacity: 0.18,
          axisTitlesPosition: "out",
          hAxis: {
            title: "",
            textStyle: {
              color: "#fff",
              fontName: "Proxima Nova",
              fontSize: 11,
              bold: true,
              italic: false
            },
            textPosition: "out"
          },
          vAxis: {
            minValue: 0,
            textPosition: "out",
            textStyle: {
              color: "#fff",
              fontName: "Proxima Nova",
              fontSize: 11,
              bold: true,
              italic: false
            },
            baselineColor: "#16b4fc",
            ticks: [0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350],
            gridlines: {
              color: "#1ba0fc",
              count: 15
            }
          },
          lineWidth: 2,
          colors: ["#fff"],
          curveType: "function",
          pointSize: 5,
          pointShapeType: "circle",
          pointFillColor: "#f00",
          backgroundColor: {
            fill: "#008ffb",
            strokeWidth: 0
          },
          chartArea: {
            left: 0,
            top: 0,
            width: "100%",
            height: "100%"
          },
          fontSize: 11,
          fontName: "Proxima Nova",
          tooltip: {
            trigger: "selection",
            isHtml: true
          }
        };

        var chart = new google.visualization.AreaChart(document.getElementById("chart_div"));
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
/* 78 */
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
    require("vue-hot-reload-api")      .rerender("data-v-e212343a", module.exports)
  }
}

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(80)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(82)
/* template */
var __vue_template__ = __webpack_require__(87)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-b316a5a2"
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
Component.options.__file = "resources/assets/js/pages/home/components/OrderApproved.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b316a5a2", Component.options)
  } else {
    hotAPI.reload("data-v-b316a5a2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(81);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("4c2aa9f2", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b316a5a2\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./OrderApproved.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b316a5a2\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./OrderApproved.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_Grid__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_Grid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_layouts_Grid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_layouts_Article__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_layouts_Article___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_layouts_Article__);
//
//
//
//
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
  name: 'OrderCanceled',
  components: {
    Grid: __WEBPACK_IMPORTED_MODULE_0__components_layouts_Grid___default.a,
    Article: __WEBPACK_IMPORTED_MODULE_1__components_layouts_Article___default.a
  },
  props: [],
  data: function data() {
    return {};
  },
  mounted: function mounted() {},

  methods: {},
  computed: {}
});

/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    col: {
      type: Number,
      default: 12
    }
  },
  computed: {
    defineCol: function defineCol() {
      return "col-sm-" + this.col;
    }
  }
});

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { class: _vm.defineCol }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-baa32a7a", module.exports)
  }
}

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Article",
  props: {
    className: {
      type: String,
      required: true
    },
    color: {
      type: String
    }
  },
  computed: {
    defineClass: function defineClass() {
      return this.className + " " + this.color || "";
    }
  }
});

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("article", { class: _vm.defineClass }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-31b58e89", module.exports)
  }
}

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Grid",
    { attrs: { col: 6 } },
    [
      _c("Article", { attrs: { className: "statistic-box", color: "green" } }, [
        _c("div", [
          _c("div", { staticClass: "number" }, [_vm._v("--")]),
          _vm._v(" "),
          _c("div", { staticClass: "caption" }, [
            _c("div", [_vm._v("Nenhum pedido aprovado nos últimos 30 dias")])
          ])
        ])
      ])
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
    require("vue-hot-reload-api")      .rerender("data-v-b316a5a2", module.exports)
  }
}

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(89)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(91)
/* template */
var __vue_template__ = __webpack_require__(92)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-44120a11"
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
Component.options.__file = "resources/assets/js/pages/home/components/OrderCanceled.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-44120a11", Component.options)
  } else {
    hotAPI.reload("data-v-44120a11", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(90);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("5118d8e6", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-44120a11\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./OrderCanceled.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-44120a11\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./OrderCanceled.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_Grid__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_Grid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_layouts_Grid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_layouts_Article__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_layouts_Article___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_layouts_Article__);
//
//
//
//
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
  name: 'OrderCanceled',
  components: {
    Grid: __WEBPACK_IMPORTED_MODULE_0__components_layouts_Grid___default.a,
    Article: __WEBPACK_IMPORTED_MODULE_1__components_layouts_Article___default.a
  },
  props: [],
  data: function data() {
    return {};
  },
  mounted: function mounted() {},

  methods: {},
  computed: {}
});

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Grid",
    { attrs: { col: 6 } },
    [
      _c("Article", { attrs: { className: "statistic-box", color: "red" } }, [
        _c("div", [
          _c("div", { staticClass: "number" }, [_vm._v("--")]),
          _vm._v(" "),
          _c("div", { staticClass: "caption" }, [
            _c("div", [_vm._v("Pedidos cancelados nos últimos 30 dias")])
          ])
        ])
      ])
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
    require("vue-hot-reload-api")      .rerender("data-v-44120a11", module.exports)
  }
}

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(94)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(96)
/* template */
var __vue_template__ = __webpack_require__(97)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-f190870c"
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
Component.options.__file = "resources/assets/js/pages/home/components/OrderDone.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f190870c", Component.options)
  } else {
    hotAPI.reload("data-v-f190870c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(95);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("a62fb97e", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f190870c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./OrderDone.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f190870c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./OrderDone.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_Grid__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_Grid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_layouts_Grid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_layouts_Article__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_layouts_Article___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_layouts_Article__);
//
//
//
//
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
  name: 'OrderDone',
  components: {
    Grid: __WEBPACK_IMPORTED_MODULE_0__components_layouts_Grid___default.a,
    Article: __WEBPACK_IMPORTED_MODULE_1__components_layouts_Article___default.a
  },
  props: [],
  data: function data() {
    return {};
  },
  mounted: function mounted() {},

  methods: {},
  computed: {}
});

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Grid",
    { attrs: { col: 6 } },
    [
      _c(
        "Article",
        { attrs: { className: "statistic-box", color: "yellow" } },
        [
          _c("div", [
            _c("div", { staticClass: "number" }, [_vm._v("06")]),
            _vm._v(" "),
            _c("div", { staticClass: "caption" }, [
              _c("div", [_vm._v("Pedidos feitos nos últimos 30 dias")])
            ])
          ])
        ]
      )
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
    require("vue-hot-reload-api")      .rerender("data-v-f190870c", module.exports)
  }
}

/***/ }),
/* 98 */
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
var __vue_scopeId__ = "data-v-ccc93562"
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
Component.options.__file = "resources/assets/js/pages/home/components/OrderPending.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ccc93562", Component.options)
  } else {
    hotAPI.reload("data-v-ccc93562", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(100);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("1e1c42e5", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ccc93562\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./OrderPending.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ccc93562\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./OrderPending.vue");
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

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_Grid__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_Grid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_layouts_Grid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_layouts_Article__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_layouts_Article___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_layouts_Article__);
//
//
//
//
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
  name: 'OrderPending',
  components: {
    Grid: __WEBPACK_IMPORTED_MODULE_0__components_layouts_Grid___default.a,
    Article: __WEBPACK_IMPORTED_MODULE_1__components_layouts_Article___default.a
  },
  props: [],
  data: function data() {
    return {};
  },
  mounted: function mounted() {},

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
    "Grid",
    { attrs: { col: 6 } },
    [
      _c("Article", { attrs: { className: "statistic-box", color: "green" } }, [
        _c("div", [
          _c("div", { staticClass: "number" }, [_vm._v("--")]),
          _vm._v(" "),
          _c("div", { staticClass: "caption" }, [
            _c("div", [_vm._v("Nenhum pedido pendente nos últimos 30 dias.")])
          ])
        ])
      ])
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
    require("vue-hot-reload-api")      .rerender("data-v-ccc93562", module.exports)
  }
}

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(104)
/* template */
var __vue_template__ = __webpack_require__(105)
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
Component.options.__file = "resources/assets/js/pages/home/components/OrderRecent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1fdf72d3", Component.options)
  } else {
    hotAPI.reload("data-v-1fdf72d3", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_Panel__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_Panel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_layouts_Panel__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_layouts_Table__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_layouts_Table___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_layouts_Table__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'OrderRecent',
  components: {
    Panel: __WEBPACK_IMPORTED_MODULE_0__components_layouts_Panel___default.a,
    Table: __WEBPACK_IMPORTED_MODULE_1__components_layouts_Table___default.a
  },
  props: [],
  data: function data() {
    return {
      headers: []
    };
  },
  mounted: function mounted() {
    this.headers = [{ name: "Status" }, { name: "Clientes" }, { name: "Pedidos", position: "center" }, { name: "Data", position: "center" }];
  }
});

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Panel",
    { attrs: { title: "Pedidos Recentes" } },
    [
      _c(
        "Table",
        [
          _c("template", { slot: "tr-th" }, [
            _c(
              "tr",
              _vm._l(_vm.headers, function(header) {
                return _c(
                  "th",
                  { key: header.name, attrs: { align: header.position || "" } },
                  [_c("div", [_vm._v(_vm._s(header.name))])]
                )
              })
            )
          ]),
          _vm._v(" "),
          _c("template", { slot: "tr-td" }, [
            _c("tr", [
              _c("td", [
                _c("span", { staticClass: "label label-primary" }, [
                  _vm._v("Paid")
                ]),
                _vm._v(" "),
                _c("span", { staticClass: "label label-success" }, [
                  _vm._v("Active")
                ])
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
                _c("span", { staticClass: "label label-primary" }, [
                  _vm._v("Paid")
                ]),
                _vm._v(" "),
                _c("span", { staticClass: "label label-success" }, [
                  _vm._v("Active")
                ])
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
                _c("span", { staticClass: "label label-primary" }, [
                  _vm._v("Paid")
                ]),
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
                _c("span", { staticClass: "label label-primary" }, [
                  _vm._v("Paid")
                ]),
                _vm._v(" "),
                _c("span", { staticClass: "label label-success" }, [
                  _vm._v("Active")
                ])
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
                _c("span", { staticClass: "label label-primary" }, [
                  _vm._v("Paid")
                ]),
                _vm._v(" "),
                _c("span", { staticClass: "label label-success" }, [
                  _vm._v("Active")
                ])
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
                _c("span", { staticClass: "label label-primary" }, [
                  _vm._v("Paid")
                ]),
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
        ],
        2
      )
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
    require("vue-hot-reload-api")      .rerender("data-v-1fdf72d3", module.exports)
  }
}

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(107)
/* template */
var __vue_template__ = __webpack_require__(108)
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
Component.options.__file = "resources/assets/js/pages/home/components/RecentComments.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9f63e456", Component.options)
  } else {
    hotAPI.reload("data-v-9f63e456", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_Panel__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_Panel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_layouts_Panel__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_layouts_Table__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_layouts_Table___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_layouts_Table__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'RecentComments',
  components: {
    Panel: __WEBPACK_IMPORTED_MODULE_0__components_layouts_Panel___default.a,
    Table: __WEBPACK_IMPORTED_MODULE_1__components_layouts_Table___default.a
  },
  props: [],
  data: function data() {
    return {
      headers: []
    };
  },
  mounted: function mounted() {
    this.headers = [{ name: "Status" }, { name: "Assunto" }, { name: "Departamento", position: "center" }, { name: "Data", position: "center" }];
  }
});

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Panel",
    { attrs: { title: "Comentários Recentes" } },
    [
      _c(
        "Table",
        [
          _c("template", { slot: "tr-th" }, [
            _c(
              "tr",
              _vm._l(_vm.headers, function(header) {
                return _c(
                  "th",
                  { key: header.name, attrs: { align: header.position || "" } },
                  [_c("div", [_vm._v(_vm._s(header.name))])]
                )
              })
            )
          ]),
          _vm._v(" "),
          _c("template", { slot: "tr-td" }, [
            _c("tr", [
              _c("td", [
                _c("span", { staticClass: "label label-success" }, [
                  _vm._v("Open")
                ])
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
                _c("span", { staticClass: "label label-success" }, [
                  _vm._v("Open")
                ])
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
                _c("span", { staticClass: "label label-danger" }, [
                  _vm._v("Closed")
                ])
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
        ],
        2
      )
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
    require("vue-hot-reload-api")      .rerender("data-v-9f63e456", module.exports)
  }
}

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(110)
/* template */
var __vue_template__ = __webpack_require__(111)
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
Component.options.__file = "resources/assets/js/pages/home/components/Contacts.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5408f139", Component.options)
  } else {
    hotAPI.reload("data-v-5408f139", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_Panel__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_Panel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_layouts_Panel__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_layouts_Article__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_layouts_Article___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_layouts_Article__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_layouts_Grid__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_layouts_Grid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_layouts_Grid__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'Contacts',
  components: {
    Panel: __WEBPACK_IMPORTED_MODULE_0__components_layouts_Panel___default.a,
    Article: __WEBPACK_IMPORTED_MODULE_1__components_layouts_Article___default.a,
    Grid: __WEBPACK_IMPORTED_MODULE_2__components_layouts_Grid___default.a
  },
  props: [],
  data: function data() {
    return {};
  },
  mounted: function mounted() {},

  methods: {},
  computed: {}
});

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("Panel", { attrs: { title: "Contatos Recentes" } }, [
    _c(
      "div",
      { staticClass: "contact-row-list" },
      [
        _c("Article", { attrs: { className: "contact-row" } }, [
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
                  _c("a", { attrs: { href: "#" } }, [
                    _vm._v("mollybr@mail.com")
                  ])
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
                  _c("a", { attrs: { href: "#" } }, [
                    _vm._v("mollybr@mail.com")
                  ])
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
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5408f139", module.exports)
  }
}

/***/ }),
/* 112 */,
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(115)
/* template */
var __vue_template__ = __webpack_require__(116)
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
Component.options.__file = "resources/assets/js/components/layouts/Panel.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-110fd757", Component.options)
  } else {
    hotAPI.reload("data-v-110fd757", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(117)
/* template */
var __vue_template__ = __webpack_require__(118)
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
Component.options.__file = "resources/assets/js/components/layouts/Table.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1a33d7be", Component.options)
  } else {
    hotAPI.reload("data-v-1a33d7be", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 115 */
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
  name: "Panel",
  props: {
    title: {
      type: String,
      required: true
    }
  }
});

/***/ }),
/* 116 */
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
    require("vue-hot-reload-api")      .rerender("data-v-110fd757", module.exports)
  }
}

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

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Table",
  props: {
    className: {
      default: "tbl-typical"
    }
  }
});

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "table",
    { class: _vm.className },
    [_vm._t("tr-th"), _vm._v(" "), _vm._t("tr-td")],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1a33d7be", module.exports)
  }
}

/***/ })
],[72]);