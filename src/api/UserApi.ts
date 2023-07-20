import { HTTPTransport } from '../utils/HTTPRequest';

export interface IProfileData {
  id: string;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

export default class UserAPI {
  protected http: HTTPTransport;

  protected constructor() {
    this.http = new HTTPTransport('/user');
  }

  update(profile: IProfileData): Promise<string> {
    return this.http.put('/profile', profile);
  }

  getUserByLogin(login: string): Promise<IProfileData> {
    return this.http.get('/search', { login });
  }

  changePassword(data: ChangePasswordData): Promise<string> {
    return this.http.put('/password', data);
  }

  changeAvatarData(data: FormData): Promise<string> {
    return this.http.put('/profile/avatar', data);
  }
}
