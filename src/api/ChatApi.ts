import { IProfileData } from './UserApi';
import { HTTPTransport } from '../utils/HTTPRequest';

export interface IChatData {
  first_name: 'string';
  second_name: 'string';
  display_name: 'string';
  login: 'string';
  email: 'string';
  phone: 'string';
}

export default class ChatAPI {
  protected http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport('/chats');
  }

  getChatUsers(chatId: string): Promise<IProfileData[]> {
    return this.http.get(`/${chatId}/users`);
  }

  addUserToChat(chatId: number, userId: number): Promise<string> {
    return this.http.put('/users', { users: [userId], chatId });
  }

  removeUserFromChat(chatId: number, userId: number): Promise<string> {
    return this.http.delete('/users', { users: [userId], chatId });
  }

  create(chatTitle: string): Promise<string> {
    return this.http.post('', { title: chatTitle });
  }

  read(): Promise<IChatData[]> {
    return this.http.get('');
  }

  delete(chatId: string): Promise<string> {
    return this.http.delete('', { chatId });
  }
}
