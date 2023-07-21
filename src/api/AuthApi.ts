import { IUserData } from '../Store';

import { HTTPTransport } from '../utils/HTTPRequest';

export interface SignUpData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface SignInData {
  login: string;
  password: string;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

// export interface changeAvatarData {
//   avatar: string;
// }
export default class AuthAPI {
  protected http: HTTPTransport;

  protected constructor() {
    this.http = new HTTPTransport('/auth');
  }

  signUp(data: SignUpData): Promise<string> {
    return this.http.post('/signup', data);
  }

  signIn(data: SignInData): Promise<string> {
    return this.http.post('/signin', data, { cre });
  }

  logout(): Promise<string> {
    return this.http.post('/logout');
  }

  read(): Promise<IUserData> {
    return this.http.get('/user');
  }
}
