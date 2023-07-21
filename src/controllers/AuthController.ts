import AuthAPI, { SignInData, SignUpData } from '../api/AuthApi';
import { store } from '../Store';

class AuthController {
  private api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  async signUp(data: SignUpData) {
    await this.api.signUp(data);
  }

  async signIn(data: SignInData) {
    await this.api.signIn(data);
  }

  async logout() {
    await this.api.logout();
  }

  async fetchUser() {
    const userData = await this.api.read();

    store.set('currentUser', userData);

    return userData;
  }
}

export default new AuthController();
