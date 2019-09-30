const defaultHeaders = {};

// converts returned fetch data to valid type 
function handleStatus(type) {
  return function (response) {
    const contentType = response.headers.get('content-type'),
      isJson = contentType && contentType.indexOf('application/json') >= 0,
      isOkay = response.ok;

    if (type === 'json' || isJson) {
      if (!isOkay) return response.json().then(json => { throw json; });
      return response.json();
    }
    else if (type === 'blob') {
      if (!isOkay) return response.text().then(text => { throw text; });
      return response.blob();
    }
    else {
      if (!isOkay) return response.text().then(text => { throw text; });
      return response.text();
    }
  }
}

function formatOptions(options) {
  if (options.credentials === 'none') delete options.credentials;
}

function setHeaders(options) {
  let headers = new Headers(Object.assign(defaultHeaders, options.headers));
  delete options.headers;
  return headers;
}

/**
* Takes an object and creates query string paramaters using the key/value pairs
* @param {String} url
* @param {Object} data
*/
function convertObjectToParams(url, data) {
  let addedParams = [],
    firstChar = '';
  if (data) {
    Object.keys(data).forEach((key) => {
      if (typeof data[key] !== undefined && data[key] !== null) addedParams.push(key + '=' + encodeURIComponent(data[key]));
    });
  }
  const urlHasParams = url.indexOf('?') >= 0;
  if (addedParams.length) {
    firstChar = '?'
    if (urlHasParams) firstChar = '&';
  }
  return firstChar + addedParams.join('&');
}

// base function that sends the fetch request
function fetchAjax(url, options, customOptions) {
  const controller = new AbortController(),
    signal = controller.signal,
    type = customOptions.responseType;
  delete customOptions.responseType;
  options.headers = setHeaders(customOptions);
  options = Object.assign(options, customOptions);
  formatOptions(options);
  options.signal = signal;
  let request;

  const promise = new Promise((resolve, reject) => {
    request = fetch(url, options)
      .then(handleStatus(type))
      .then(json => {
        resolve(json);
      })
      .catch(error => {
        reject(error);
      });
  });
  promise.controller = controller;
  promise.originalFetch = request;
  return promise;
}

/**
* A fetch post request that returns a promise
* @param {String} url
* @param {Object} data
* @param {Object} options
*/
function post(url, data = {}, options = {}) {
  let o = {
    method: 'post',
    credentials: 'include',
    body: JSON.stringify(data)
  };

  return fetchAjax(url, o, options);
}
/**
* A fetch put request that returns a promise
* @param {String} url
* @param {Object} data
* @param {Object} options
*/
function put(url, data = {}, options = {}) {
  let o = {
    method: 'put',
    credentials: 'include',
    body: JSON.stringify(data)
  };

  return fetchAjax(url, o, options);
}

/**
* A fetch get request that returns a promise
* @param {String} url
* @param {Object} data
* @param {Object} options
*/
function get(url, data = {}, options = {}) {
  let o = {
    method: 'get',
    credentials: 'include'
  };

  return fetchAjax(url + convertObjectToParams(url, data), o, options);
}

/**
* A fetch delete request that returns a promise
* @param {String} url
* @param {Object} data
* @param {Object} options
*/
function del(url, data = {}, options = {}) {
  let o = {
    method: 'delete',
    credentials: 'include'
  };

  return fetchAjax(url + convertObjectToParams(url, data), o, options);
}


export default {
  post,
  del,
  get,
  put,
  defaults: {
    headers: defaultHeaders
  }
}