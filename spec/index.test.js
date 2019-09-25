import ajax from '../src/index';

describe("get request", function () {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("is a successful get", done => {
    fetch.mockResponseOnce(JSON.stringify({ hello: 'world' }));

    ajax.get('test')
      .then(json => {
        expect(json.hello).toBe('world');
      })
      .catch(error => {
        done.fail(error);
      });
  });
});