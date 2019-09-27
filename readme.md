# A tiny fetch api

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
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });

// Optionally the request above could also be done as
jfetch.get('/user', {
    ID: 12345
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
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