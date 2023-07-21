import ChatAPI from '../api/ChatApi';
import { store } from '../Store';

class ChatController {
  private api: ChatAPI;

  constructor() {
    this.api = new ChatAPI();
  }

  async createChat(chatTitle: string) {
    await this.api.create(chatTitle);
  }

  async deleteChat(chatId: string) {
    await this.api.delete(chatId);
  }

  async getChats() {
    const chatList = await this.api.read();

    store.set('chatList', chatList);
  }

  async getChatUsers(chatId: string) {
    return this.api.getChatUsers(chatId);
  }

  async addUserToChat(chatId: number, userId: number) {
    return this.api.addUserToChat(chatId, userId);
  }

  async removeUserFromChat(chatId: number, userId: number) {
    return this.api.removeUserFromChat(chatId, userId);
  }
}

export default new ChatController();
