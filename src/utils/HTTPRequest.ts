/* eslint-disable prefer-promise-reject-errors */
const Method = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

interface Options {
  method: string;
  data?: any;
}

type IData = Record<string, string>;

function queryStringify(data: IData) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);

  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}
export default class HTTPRequest {
  static API_URL = 'https://ya-praktikum.tech/api/v2';

  protected endpoint: string;

  constructor(endpoint: string, baseURL?: string) {
    this.endpoint = `${baseURL || HTTPRequest.API_URL}${endpoint}`;
    console.log('>>>>>', this.endpoint);
  }

  public get<Response>(path = '/'): Promise<Response> {
    return this.request<Response>(this.endpoint + path);
  }

  public post<Response = void>(path: string, data?: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.POST,
      data,
    });
  }

  public put<Response = void>(path: string, data?: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.PUT,
      data,
    });
  }

  public patch<Response = void>(path: string, data?: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.PATCH,
      data,
    });
  }

  public delete<Response>(path: string, data?: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.DELETE,
      data,
    });
  }

  private request<Response>(url: string, options: Options = { method: Method.GET }): Promise<Response> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      const isGet = method === Method.GET;
      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);
      // xhr.open(method, url);

      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return;
        }
        if (xhr.status < 400) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      };

      console.log('------- 1');

      xhr.onabort = () => reject({ reason: 'abort' });
      xhr.onerror = () => reject({ reason: 'network error' });
      xhr.ontimeout = () => reject({ reason: 'timeout' });

      console.log('------- 2', FormData);
      if (!(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      console.log('------- 3');
      if (method === Method.GET || !data) {
        console.log('------- 4');
        xhr.send();
      } else {
        console.log('------- 5');
        const body = data instanceof FormData ? data : JSON.stringify(data);
        xhr.send(body);
      }
    });
  }
}
