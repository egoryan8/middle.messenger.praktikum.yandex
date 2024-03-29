import UserAPI, { IProfileData, ChangePasswordData } from '../api/UserApi';
import { store } from '../Store';

class UserController {
  private api: UserAPI;

  constructor() {
    this.api = new UserAPI();
  }

  async updateProfile(profile: IProfileData) {
    await this.api.update(profile);
  }

  async changePassword(data: ChangePasswordData) {
    await this.api.changePassword(data);
  }

  async getUserByLogin(login: string) {
    return this.api.getUserByLogin(login);
  }

  async changeAvatar(data: FormData) {
    const userData = await this.api.changeAvatarData(data);
    store.set('currentUser', userData);
  }
}

export default new UserController();
