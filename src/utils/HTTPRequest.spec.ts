import { expect } from 'chai';
import sinon, { } from 'sinon';
import HTTPTransport from './HTTPRequest';

let open: any;
let send: any;
let setRequestHeader: any;

describe('HTTPTransport test', () => {
  beforeEach(() => {
    open = sinon.fake();
    send = sinon.fake();
    setRequestHeader = sinon.fake();
  });

  function FakeFormData() { }

  // @ts-ignore
  global.FormData = FakeFormData;
  // @ts-ignore
  global.XMLHttpRequest = function () {
    return {
      x: 123,
      open,
      send,
      setRequestHeader,
    } as any;
  };

  it('Get method', () => {
    const http = new HTTPTransport('/user');

    http.get('/getUser');

    expect(open.callCount).to.eq(1);
    expect(send.callCount).to.eq(1);

    expect(open.firstArg).to.eq('GET');
    expect(open.lastArg).to.eq('https://ya-praktikum.tech/api/v2/user/getUser');
  });

  it('Post method with query params', () => {
    const http = new HTTPTransport('/user');

    http.post('/createUser', { username: 'qwe', password: '123456' });

    expect(open.callCount).to.eq(1);
    expect(send.callCount).to.eq(1);

    expect(open.firstArg).to.eq('POST');
    expect(open.lastArg).to.eq('https://ya-praktikum.tech/api/v2/user/createUser');

    expect(send.firstArg).to.eq('{"username":"qwe","password":"123456"}');
  });

  it('Delete method', () => {
    const http = new HTTPTransport('/user');

    http.delete('/test');

    expect(open.callCount).to.eq(1);
    expect(send.callCount).to.eq(1);

    expect(open.firstArg).to.eq('DELETE');
    expect(open.lastArg).to.eq('https://ya-praktikum.tech/api/v2/user/test');
  });

  it('Send form data', () => {
    const http = new HTTPTransport('/user');
    const formData = new FormData();

    http.post('/test', formData);

    expect(open.callCount).to.eq(1);
    expect(send.callCount).to.eq(1);

    expect(open.firstArg).to.eq('POST');
    expect(open.lastArg).to.eq('https://ya-praktikum.tech/api/v2/user/test');
    expect(send.firstArg).to.eq(formData);
  });
});
