import ajax from '../src/index';
import 'whatwg-fetch';

describe("get request", function () {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("can get json", done => {
    fetch.mockResponseOnce('{ "hello": "world" }', { status: 200, headers: { 'content-type': 'application/json' } });

    ajax.get('test', { test: 1 })
      .then(json => {
        expect(json.hello).toEqual('world');
        done();
      })
      .catch(error => {
        done.fail(error);
      });
  });

  test("fail get json", done => {
    fetch.mockResponseOnce('{ "hello": "world" }', { status: 401, headers: { 'content-type': 'application/json' } });

    ajax.get('test')
      .then(json => {
        done.fail(error);
      })
      .catch(error => {
        expect(error.hello).toEqual('world');
        done();
      });
  });

  test("can get text", done => {
    fetch.mockResponseOnce('hello');

    ajax.get('test')
      .then(json => {
        expect(json).toEqual('hello');
        done();
      })
      .catch(error => {
        done.fail(error);
      });
  });
});

describe("async get request", function () {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("can get async json", async done => {
    fetch.mockResponseOnce('{ "hello": "world" }', { status: 200, headers: { 'content-type': 'application/json' } });

    try {
      const json = await ajax.get('test', { test: 1 });
      expect(json.hello).toEqual('world');
      done();
    } catch (error) {
      done.fail(error);
    }
  });
});

/*describe("abort controller", function () {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("can abort", done => {
    fetch.mockResponseOnce(() => new Promise(resolve => setTimeout(() => resolve({ body: 'ok' }), 500)));

    const request = ajax.get('test');

    request.then(json => {
      done.fail('Did not abort');
    })
      .catch(error => {
        console.log(error);
        expect(error).toEqual('AbortError');
        done();
      });

    request.controller.abort();
  });
});*/