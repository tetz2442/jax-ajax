# A tiny fetch library built for the browser

## Installing

Using npm:

```bash
$ npm install jfetch
```

## Example

```js
import jfetch from 'jfetch';
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