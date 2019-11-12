import jfetch from '../src/index';

describe("get request", function () {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("can get json", done => {
    fetch.mockResponseOnce('{ "hello": "world" }', { status: 200, headers: { 'content-type': 'application/json' } });

    jfetch.get('test', { test: 1 })
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

    jfetch.get('test')
      .then(json => {
        done.fail(json);
      })
      .catch(error => {
        expect(error.hello).toEqual('world');
        done();
      });
  });

  test("can get text", done => {
    fetch.mockResponseOnce('hello');

    jfetch.get('test')
      .then(json => {
        expect(json).toEqual('hello');
        done();
      })
      .catch(error => {
        done.fail(error);
      });
  });

  test("can get blob", done => {
    const blob = new Blob(['a', 'b', 'c', 'd']);
    fetch.mockResponseOnce('*', { body: blob, status: 200, headers: { 'content-type': 'image/png' } }, { sendAsJson: false });

    jfetch.get('test', null, {
      responseType: 'blob'
    })
      .then(blob => {
        expect(blob.constructor.name).toBe('Blob');
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
      const json = await jfetch.get('test', { test: 1 });
      expect(json.hello).toEqual('world');
      done();
    } catch (error) {
      done.fail(error);
    }
  });
});


describe("modify default headers", function () {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("correct header sent, base url changed", async done => {
    fetch.mockResponse('{ "hello": "world" }', { status: 200, headers: { 'content-type': 'application/json' } });

    jfetch.defaults.headers['Content-Type'] = 'application/json';
    jfetch.defaults.baseUrl = '/test';

    const request = jfetch.get('test');

    request.then(json => {
      expect(fetch.mock.calls[0][1].headers.get('Content-Type')).toEqual('application/json');
      // console.log(fetch.mock.calls[0][0]).toEqual();
      expect(fetch.mock.calls[0][0]).toEqual('/testtest');
      done();
    })
      .catch(error => {
        console.log(error);
        done.fail(error);
      });
  });
});

/*describe("abort controller", function () {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("can abort", done => {
    fetch.mockResponseOnce(() => new Promise(resolve => setTimeout(() => resolve({ body: 'ok' }), 500)));

    const request = jfetch.get('test');

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