import { store } from '../Store';
import { scrollToLastMessage } from './scrollToLastMessage';
import { HTTPTransport } from './HTTPRequest';

export class WS {
  private socket: WebSocket;

  private host = 'ya-praktikum.tech';

  private chatId?: number;

  private userId?: number;

  private timerId?: NodeJS.Timer;

  private isConnectionOK: boolean;

  private onOpenConnection() {
    this.isConnectionOK = true;
    console.log('Соединение установлено');

    this.getLastMessages();

    /*
     Функция для поддержания соединения по Websocket
     */
    if (!this.timerId) {
      this.timerId = setInterval(() => {
        this.socket.send(
          JSON.stringify({
            type: 'ping',
          }),
        );
      }, 5000);
    }
  }

  private onCloseConnection(event: CloseEvent) {
    console.log(event.wasClean ? 'Соединение закрыто чисто' : 'Обрыв соединения');
    this.isConnectionOK = false;

    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = undefined;
    }
  }

  private onReceiveMessage(event: MessageEvent) {
    console.log('Получены данные', event.data);
    let data;
    try {
      data = JSON.parse(event.data);
    } catch (error) {
      console.error(error);

      return;
      // Expected output: ReferenceError: nonExistentFunction is not defined
      // (Note: the exact output may be browser-dependent)
    }
    /*
     Если приходит архив сообщений
      */
    if (Array.isArray(data)) {
      const oldMessages = data
        .map((item) => ({
          isMyMessage: this.userId === item.user_id,
          messageText: item.content,
        }))
        .reverse();
      store.set('messageList', oldMessages);
      scrollToLastMessage();
      /*
       Если приходит сообщение
        */
    } else if (data.type === 'message') {
      const messages = store.getState().messageList || [];
      messages.push({
        isMyMessage: this.userId === data.user_id,
        messageText: data.content,
      });
      store.set('messageList', messages);
    }
  }

  private onError(event: ErrorEvent) {
    console.log('Ошибка', event.message);
  }

  sendMessage(message: string) {
    if (this.isConnectionOK) {
      this.socket.send(
        JSON.stringify({
          content: message,
          type: 'message',
        }),
      );
    }
  }

  private getLastMessages() {
    this.socket.send(
      JSON.stringify({
        content: '0',
        type: 'get old',
      }),
    );
  }

  connect() {
    const chatId = store.getState()?.currentChatId;
    const userId = store.getState()?.currentUser?.id;

    if (!chatId || !userId) {
      throw new Error('Неверный chatId или userId!');
    }

    if (chatId === this.chatId && userId === this.userId) {
      return;
    }

    const http = new HTTPTransport(`/chats/token/${chatId}`);
    http
      .post<{ token: string }>('', { mode: 'cors', credentials: 'include' })
      .then((data) => {
        /*
        Если до этого было соденинение по WS с другим чатом  то удаляем старые обработчики событий
         */
        if (this.chatId !== undefined) {
          this.socket.removeEventListener('open', this.onOpenConnection.bind(this));
          this.socket.removeEventListener('close', this.onCloseConnection.bind(this));
          this.socket.removeEventListener('message', this.onReceiveMessage.bind(this));
          this.socket.removeEventListener('error', this.onError.bind(this));
          this.socket.close(1000, `Close previous chat connection with chat ${this.chatId}`);
        }

        this.socket = new WebSocket(`wss://${this.host}/ws/chats/${userId}/${chatId}/${data.token}`);

        this.socket.addEventListener('open', this.onOpenConnection.bind(this));
        this.socket.addEventListener('close', this.onCloseConnection.bind(this));
        this.socket.addEventListener('message', this.onReceiveMessage.bind(this));
        this.socket.addEventListener('error', this.onError.bind(this));
        this.chatId = chatId;
        this.userId = userId;
      })
      .catch((error) => console.log('Ошибка установки соединения', error));
  }
}
