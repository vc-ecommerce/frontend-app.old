webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(5);
var isBuffer = __webpack_require__(15);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(0);
var normalizeHeaderName = __webpack_require__(18);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(6);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(6);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ }),
/* 3 */
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
/* 4 */
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

var listToStyles = __webpack_require__(35)

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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var settle = __webpack_require__(19);
var buildURL = __webpack_require__(21);
var parseHeaders = __webpack_require__(22);
var isURLSameOrigin = __webpack_require__(23);
var createError = __webpack_require__(7);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(24);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("development" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(25);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(20);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(86)
/* template */
var __vue_template__ = __webpack_require__(87)
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(88)
/* template */
var __vue_template__ = __webpack_require__(89)
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var axios = __webpack_require__(13);

window.Vue = __webpack_require__(33);

//Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.prototype.$urlAPI = 'http://api.vocecrianca.site/v1/';

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var bind = __webpack_require__(5);
var Axios = __webpack_require__(16);
var defaults = __webpack_require__(2);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(9);
axios.CancelToken = __webpack_require__(31);
axios.isCancel = __webpack_require__(8);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(32);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(2);
var utils = __webpack_require__(0);
var InterceptorManager = __webpack_require__(26);
var dispatchRequest = __webpack_require__(27);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(7);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var transformData = __webpack_require__(28);
var isCancel = __webpack_require__(8);
var defaults = __webpack_require__(2);
var isAbsoluteURL = __webpack_require__(29);
var combineURLs = __webpack_require__(30);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(9);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 33 */,
/* 34 */,
/* 35 */
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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(108)
/* template */
var __vue_template__ = __webpack_require__(109)
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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
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
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(76);


/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_ChartSaleWeek__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_ChartSaleWeek___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_ChartSaleWeek__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_OrderApproved__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_OrderApproved___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_OrderApproved__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_OrderCanceled__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_OrderCanceled___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_OrderCanceled__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_OrderDone__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_OrderDone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_OrderDone__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_OrderPending__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_OrderPending___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_OrderPending__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_OrderRecent__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_OrderRecent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_OrderRecent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_RecentComments__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_RecentComments___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_RecentComments__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_RecentContacts__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_RecentContacts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__components_RecentContacts__);
__webpack_require__(12);










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
    RecentContacts: __WEBPACK_IMPORTED_MODULE_7__components_RecentContacts___default.a
  },
  mounted: function mounted() {
    document.getElementById('content').style.display = 'block';
  }
});

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(80)
/* template */
var __vue_template__ = __webpack_require__(135)
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
/* 78 */,
/* 79 */,
/* 80 */
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
  data: function data() {
    return {
      valor: 30015
    };
  },

  methods: {},
  computed: {}
});

/***/ }),
/* 81 */,
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(83)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(85)
/* template */
var __vue_template__ = __webpack_require__(90)
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
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(84);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("4c2aa9f2", content, false, {});
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
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_Grid__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_Grid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_layouts_Grid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_layouts_Article__ = __webpack_require__(11);
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
/* 86 */
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
/* 87 */
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
/* 88 */
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
/* 89 */
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
/* 90 */
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
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(92)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(94)
/* template */
var __vue_template__ = __webpack_require__(95)
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
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(93);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("5118d8e6", content, false, {});
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
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_Grid__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_Grid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_layouts_Grid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_layouts_Article__ = __webpack_require__(11);
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
/* 95 */
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
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(97)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(99)
/* template */
var __vue_template__ = __webpack_require__(100)
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
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(98);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("a62fb97e", content, false, {});
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
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_Grid__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_Grid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_layouts_Grid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_layouts_Article__ = __webpack_require__(11);
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
/* 100 */
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
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(102)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(104)
/* template */
var __vue_template__ = __webpack_require__(105)
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
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(103);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("1e1c42e5", content, false, {});
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
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_Grid__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_Grid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_layouts_Grid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_layouts_Article__ = __webpack_require__(11);
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
/* 105 */
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
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(107)
/* template */
var __vue_template__ = __webpack_require__(112)
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
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_Panel__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_Panel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_layouts_Panel__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_layouts_Table__ = __webpack_require__(37);
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
/* 108 */
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
/* 109 */
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
/* 110 */
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
/* 111 */
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

/***/ }),
/* 112 */
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
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(114)
/* template */
var __vue_template__ = __webpack_require__(115)
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
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_Panel__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_Panel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_layouts_Panel__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_layouts_Table__ = __webpack_require__(37);
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
/* 115 */
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
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
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
Component.options.__file = "resources/assets/js/pages/home/components/RecentContacts.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-65e56e98", Component.options)
  } else {
    hotAPI.reload("data-v-65e56e98", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_Panel__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_layouts_Panel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_layouts_Panel__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_layouts_Article__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_layouts_Article___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_layouts_Article__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_layouts_Grid__ = __webpack_require__(10);
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
  name: 'RecentContacts',
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
/* 118 */
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
    require("vue-hot-reload-api")      .rerender("data-v-65e56e98", module.exports)
  }
}

/***/ }),
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "chart-statistic-box" }, [
    _vm._m(0),
    _vm._v(" "),
    _c("div", { staticClass: "chart-container" }, [
      _c("div", { staticClass: "chart-container-in" }, [
        _c("div", { attrs: { id: "chart_div" } }),
        _vm._v(" "),
        _c("header", { staticClass: "chart-container-title" }, [
          _vm._v("Vendas")
        ]),
        _vm._v(" "),
        _vm._m(1),
        _vm._v(" "),
        _c("div", { staticClass: "chart-container-y" }, [
          _c("div", { staticClass: "item" }, [_vm._v(_vm._s(_vm.valor))]),
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
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "chart-txt" }, [
      _c("div", { staticClass: "chart-txt-top" }, [
        _c("p", [
          _c("span", { staticClass: "unit" }, [_vm._v("R$")]),
          _c("span", { staticClass: "number" }, [_vm._v("1540,00")])
        ]),
        _vm._v(" "),
        _c("p", { staticClass: "caption" }, [_vm._v("Vendas da Semana")])
      ]),
      _vm._v(" "),
      _c("table", { staticClass: "tbl-data" }, [
        _c("tr", [
          _c("td", { staticClass: "price color-purple" }, [
            _vm._v("R$ 1200.00")
          ]),
          _vm._v(" "),
          _c("td", [_vm._v("Pedidos")])
        ]),
        _vm._v(" "),
        _c("tr", [
          _c("td", { staticClass: "price color-yellow" }, [_vm._v("R$ 15")]),
          _vm._v(" "),
          _c("td", [_vm._v("Investimentos")])
        ]),
        _vm._v(" "),
        _c("tr", [
          _c("td", { staticClass: "price color-lime" }, [_vm._v("R$ 55")]),
          _vm._v(" "),
          _c("td", [_vm._v("Outros")])
        ])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "chart-container-x" }, [
      _c("div", { staticClass: "item" }),
      _vm._v(" "),
      _c("div", { staticClass: "item" }, [_vm._v("ter")]),
      _vm._v(" "),
      _c("div", { staticClass: "item" }, [_vm._v("qua")]),
      _vm._v(" "),
      _c("div", { staticClass: "item" }, [_vm._v("qui")]),
      _vm._v(" "),
      _c("div", { staticClass: "item" }, [_vm._v("sex")]),
      _vm._v(" "),
      _c("div", { staticClass: "item" }, [_vm._v("sab")]),
      _vm._v(" "),
      _c("div", { staticClass: "item" }, [_vm._v("dom")]),
      _vm._v(" "),
      _c("div", { staticClass: "item" }, [_vm._v("seg")]),
      _vm._v(" "),
      _c("div", { staticClass: "item" })
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

/***/ })
],[75]);