enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

function queryStringify(data: XMLHttpRequestBodyInit) {
  return `?${Object.entries(data)
    .map((obj) => `${obj[0]}=${obj[1]}`)
    .join('&')}`;
}

interface IOptions {
  method?: METHODS;
  timeout?: number;
  headers?: Record<string, string>;
  data?: XMLHttpRequestBodyInit;
}

type HTTPMethod = (url: string, options: IOptions) => Promise<unknown>;

export class HTTPTransport {
  // используем тип и удаляем дублирование в аргументах
  get: HTTPMethod = (url, options) => (
    this.request(url, { ...options, method: METHODS.GET }, options.timeout)
  );
  // используем тип и удаляем дублирование в аргументах
  put: HTTPMethod = (url, options) => (
    this.request(url, { ...options, method: METHODS.PUT }, options.timeout)
  );
  // используем тип и удаляем дублирование в аргументах
  post: HTTPMethod = (url, options) => (
    this.request(url, { ...options, method: METHODS.POST }, options.timeout)
  );
  // используем тип и удаляем дублирование в аргументах
  delete: HTTPMethod = (url, options) => (
    this.request(url, { ...options, method: METHODS.DELETE }, options.timeout)
  );

  request = (url: string, options: IOptions = { method: METHODS.GET }, timeout = 5000) => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method as string, method === METHODS.GET && !!data ? url + queryStringify(data) : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.timeout = timeout;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data as XMLHttpRequestBodyInit);
      }
    });
  };
}
