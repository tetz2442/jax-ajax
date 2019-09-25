/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: handleStatus, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"handleStatus\", function() { return handleStatus; });\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n// converts returned fetch data to valid type \nfunction handleStatus(response) {\n  var contentType = response.headers.get('content-type'),\n      isOkay = response.ok;\n\n  if (contentType.indexOf('application/json') >= 0) {\n    if (!isOkay) return response.json().then(function (json) {\n      throw json;\n    });\n    return response.json();\n  } else {\n    if (!isOkay) return response.text().then(function (text) {\n      throw text;\n    });\n    return response.text();\n  }\n}\n\nfunction formatOptions(options) {\n  if (options.credentials === 'none') delete options.credentials;\n}\n\nfunction setHeaders(options) {\n  var headers = new Headers(Object.assign({\n    'Content-Type': 'application/json'\n  }, options.headers));\n  delete options.headers;\n  return headers;\n}\n/**\r\n* Takes an object and creates query string paramaters using the key/value pairs\r\n* @param {String} url\r\n* @param {Object} data\r\n*/\n\n\nfunction convertObjectToParams(url, data) {\n  var addedParams = [],\n      firstChar = '';\n  Object.keys(data).forEach(function (key) {\n    if (_typeof(data[key]) !== undefined && data[key] !== null) addedParams.push(key + '=' + encodeURIComponent(data[key]));\n  });\n  var urlHasParams = url.indexOf('?') >= 0;\n\n  if (addedParams.length) {\n    firstChar = '?';\n    if (urlHasParams) firstChar = '&';\n  }\n\n  return firstChar + addedParams.join('&');\n} // base function that sends the fetch request\n\n\nfunction fetchAjax(url, options, customOptions) {\n  var controller = new AbortController(),\n      signal = controller.signal;\n  options.headers = setHeaders(customOptions);\n  options = Object.assign(options, customOptions);\n  formatOptions(options);\n  options.signal = signal;\n  var promise = new Promise(function (resolve, reject) {\n    fetch(url, options).then(handleStatus).then(function (json) {\n      resolve(json);\n    }).catch(function (error) {\n      reject(error);\n    });\n  });\n  promise.controller = controller;\n  return promise;\n}\n/**\r\n* A fetch post request that returns a promise\r\n* @param {String} url\r\n* @param {Object} data\r\n* @param {Object} options\r\n*/\n\n\nfunction post(url) {\n  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n  var o = {\n    method: 'post',\n    credentials: 'include',\n    body: JSON.stringify(data)\n  };\n  return fetchAjax(url, o, options);\n}\n/**\r\n* A fetch put request that returns a promise\r\n* @param {String} url\r\n* @param {Object} data\r\n* @param {Object} options\r\n*/\n\n\nfunction put(url) {\n  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n  var o = {\n    method: 'put',\n    credentials: 'include',\n    body: JSON.stringify(data)\n  };\n  return fetchAjax(url, o, options);\n}\n/**\r\n* A fetch get request that returns a promise\r\n* @param {String} url\r\n* @param {Object} data\r\n* @param {Object} options\r\n*/\n\n\nfunction get(url) {\n  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n  var o = {\n    method: 'get',\n    credentials: 'include'\n  };\n  return fetchAjax(url + convertObjectToParams(url, data), o, options);\n}\n/**\r\n* A fetch delete request that returns a promise\r\n* @param {String} url\r\n* @param {Object} data\r\n* @param {Object} options\r\n*/\n\n\nfunction del(url) {\n  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n  var o = {\n    method: 'delete',\n    credentials: 'include'\n  };\n  return fetchAjax(url + convertObjectToParams(url, data), o, options);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  post: post,\n  del: del,\n  get: get,\n  put: put\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });