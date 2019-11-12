# A tiny fetch wrapper built for the browser

## Installing

Using npm:

```bash
$ npm i @jontetz/jfetch
```

## Example

```js
import jfetch from '@jontetz/jfetch';
```

Performing a `GET` request

```js
// Make a request for a user with a given ID
jfetch.get('/user?ID=12345')
  .then(response => {
    // handle success
    console.log(response);
  })
  .catch(error => {
    // handle error
    console.log(error);
  })
  .finally(() => {
    // always executed
  });

// Optionally the request above could also be done as
jfetch.get('/user', {
    ID: 12345
  })
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  })
  .finally(() => {
    // always executed
  });  

// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getUser() {
  try {
    const response = await jfetch.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

Performing a `POST` request

```js
// Make a request to create a new user
jfetch.post('/user', {
  name: 'John Smith'
})
  .then(response => {
    // handle success
    console.log(response);
  })
  .catch(error => {
    // handle error
    console.log(error);
  })
  .finally(() => {
    // always executed
  });
```

Performing a `PUT` request

```js
// Make a request to update a users name
jfetch.put('/user/123', {
  name: 'John Smith'
})
  .then(response => {
    // handle success
    console.log(response);
  })
  .catch(error => {
    // handle error
    console.log(error);
  })
  .finally(() => {
    // always executed
  });
```

Performing a `DELETE` request

```js
// Make a request for a user with a given ID
jfetch.del('/user/1234/delete')
  .then(response => {
    // handle success
    console.log(response);
  })
  .catch(error => {
    // handle error
    console.log(error);
  })
  .finally(() => {
    // always executed
  });

// Optionally the request above could also be done as
jfetch.del('/user', {
  ID: 12345
})
  .then(response => {
    // handle success
    console.log(response);
  })
  .catch(error => {
    // handle error
    console.log(error);
  })
  .finally(() => {
    // always executed
  });
```

Aborting a request

```js
// store a reference to the original promise
const request = jfetch.get('/user');

request.then(response => {
    // handle success
    console.log(response);
  })
  .catch(error => {
    // handle an abort error
    if(error === 'AbortError') return;
    // handle error
    console.log(error);
  });

// abort the request
request.controller.abort();
```

## Fetch options

You can modify the fetch itself by passing an object to the third parameter

```js
jfetch.post('/user/12345', {
    ID: 12345
  }, {
    responseType: 'text', // json, text or blob - this option is specific to jfetch
    credentials: 'none', // this removes the default 'include' that is included in each request
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  })
  .finally(() => {
    // always executed
  });  
```

## Defaults

`credentials: 'include'` is included in the requests by default to send cookie data. To remove that setting, you can pass `credentials: 'none'` in the third parameter.

Set some default headers that should be in each request  
Or set the base url that should be prepended to each request  

```js
import jfetch from '@jontetz/jfetch';
jfetch.defaults.headers['Content-Type'] = 'application/json';
jfetch.defaults.baseUrl = '/test';
```