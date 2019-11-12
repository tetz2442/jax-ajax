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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst defaultHeaders = {};\nconst defaults = {\n  headers: defaultHeaders,\n  baseUrl: ''\n}; // converts returned fetch data to valid type \n\nfunction handleStatus(type) {\n  return function (response) {\n    const contentType = response.headers.get('content-type'),\n          isJson = contentType && contentType.indexOf('application/json') >= 0,\n          isOkay = response.ok;\n\n    if (type === 'json' || isJson) {\n      if (!isOkay) return response.json().then(json => {\n        throw json;\n      });\n      return response.json();\n    } else if (type === 'blob') {\n      if (!isOkay) return response.text().then(text => {\n        throw text;\n      });\n      return response.blob();\n    } else {\n      if (!isOkay) return response.text().then(text => {\n        throw text;\n      });\n      return response.text();\n    }\n  };\n}\n\nfunction formatOptions(options) {\n  if (options.credentials === 'none') delete options.credentials;\n}\n\nfunction setHeaders(options) {\n  let headers = new Headers(Object.assign(defaultHeaders, options.headers));\n  delete options.headers;\n  return headers;\n}\n/**\r\n* Takes an object and creates query string paramaters using the key/value pairs\r\n* @param {String} url\r\n* @param {Object} data\r\n*/\n\n\nfunction convertObjectToParams(url, data) {\n  let addedParams = [],\n      firstChar = '';\n\n  if (data) {\n    Object.keys(data).forEach(key => {\n      if (typeof data[key] !== undefined && data[key] !== null) addedParams.push(key + '=' + encodeURIComponent(data[key]));\n    });\n  }\n\n  const urlHasParams = url.indexOf('?') >= 0;\n\n  if (addedParams.length) {\n    firstChar = '?';\n    if (urlHasParams) firstChar = '&';\n  }\n\n  return firstChar + addedParams.join('&');\n} // base function that sends the fetch request\n\n\nfunction fetchAjax(url, options, customOptions) {\n  const controller = new AbortController(),\n        signal = controller.signal,\n        type = customOptions.responseType;\n  delete customOptions.responseType;\n  options.headers = setHeaders(customOptions);\n  options = Object.assign(options, customOptions);\n  formatOptions(options);\n  options.signal = signal;\n  let request;\n  const promise = new Promise((resolve, reject) => {\n    request = fetch(defaults.baseUrl + url, options).then(handleStatus(type)).then(json => {\n      resolve(json);\n    }).catch(error => {\n      reject(error);\n    });\n  });\n  promise.controller = controller;\n  promise.originalFetch = request;\n  return promise;\n}\n/**\r\n* A fetch post request that returns a promise\r\n* @param {String} url\r\n* @param {Object} data\r\n* @param {Object} options\r\n*/\n\n\nfunction post(url, data = {}, options = {}) {\n  let o = {\n    method: 'post',\n    credentials: 'include',\n    body: JSON.stringify(data)\n  };\n  return fetchAjax(url, o, options);\n}\n/**\r\n* A fetch put request that returns a promise\r\n* @param {String} url\r\n* @param {Object} data\r\n* @param {Object} options\r\n*/\n\n\nfunction put(url, data = {}, options = {}) {\n  let o = {\n    method: 'put',\n    credentials: 'include',\n    body: JSON.stringify(data)\n  };\n  return fetchAjax(url, o, options);\n}\n/**\r\n* A fetch get request that returns a promise\r\n* @param {String} url\r\n* @param {Object} data\r\n* @param {Object} options\r\n*/\n\n\nfunction get(url, data = {}, options = {}) {\n  let o = {\n    method: 'get',\n    credentials: 'include'\n  };\n  return fetchAjax(url + convertObjectToParams(url, data), o, options);\n}\n/**\r\n* A fetch delete request that returns a promise\r\n* @param {String} url\r\n* @param {Object} data\r\n* @param {Object} options\r\n*/\n\n\nfunction del(url, data = {}, options = {}) {\n  let o = {\n    method: 'delete',\n    credentials: 'include'\n  };\n  return fetchAjax(url + convertObjectToParams(url, data), o, options);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  post,\n  del,\n  get,\n  put,\n  defaults: defaults\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });