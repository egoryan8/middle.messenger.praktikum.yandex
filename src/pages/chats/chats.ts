import Block from '../../utils/Block';
import './index.scss';
import { IChatData, IUserData, store } from '../../Store';
import { IMessageProps } from '../../components/message';
import Router from '../../utils/Router';
import ChatController from '../../controllers/ChatController';
import AuthController from '../../controllers/AuthController';
import { validateInputs } from '../../utils/validation';
import { REGEXP_MESSAGE } from '../../utils/regexps';
import { scrollToLastMessage } from '../../utils/scrollToLastMessage';
import { ws } from '../../index';
import { getRandomColor } from '../../utils/getRandomColor';
import { log } from 'handlebars';

const arrayOfRandomColors = [...Array(100)].map(getRandomColor);

interface ChatsPageProps {
  chatList?: IChatData[];
  messageList?: IMessageProps[];
  onClick: (e: Event) => void;
  currentUser: IUserData;
}

export class ChatsPage extends Block<ChatsPageProps> {
  constructor(props: ChatsPageProps) {
    const state = store.getState();
    console.log(state.currentUser);
    super({
      ...props,
      onLogout: () => this.onLogout(),
      onSendMessage: (e: Event) => this.onSendMessage(e),
      onCreateChat: () => this.createChat(),
      onDeleteChat: () => this.deleteChat(),
      onAddUser: () => this.addUserToChat(),
      onDeleteUser: () => this.removeUserFromChat(),
      getProfileInfo: () => this.getProfileInfo(),
      getIsAdmin: () => this.getIsAdmin(),
      events: {
        submit: (e: Event) => this.onSendMessage(e),
      },
    });
  }

  componentDidMount() {
    const router = new Router();
    ChatController.getChats()
      .then(() => {
        // eslint-disable-next-line no-return-assign
        AuthController.fetchUser().then((res) => this.props.currentUser = res);
        store.set('isChatLoading', false);
      })
      .catch(() => {
        router.go('/');
      });
  }

  addUserToChat() {
    const userId = prompt('Введите ID пользователя для добавления в текущий чат');
    const currentUserId = this.props.currentUser.id;
    if (userId) {
      if (+userId === currentUserId) {
        alert('Вы итак уже в чате :)');

        return;
      }
      ChatController.addUserToChat(store.getState().currentChatId, +userId)
        .then(() => alert('Пользователь успешно добавлен!'))
        .catch((error) => alert(`Ошибка выполнения запроса! ${error ? error.reason : ''}`));
    } else {
      alert('Поле не должно быть пустым!');
    }
  }

  async _wasUserInChat(userId: string, chatId: string) {
    // eslint-disable-next-line no-return-assign
    const chatUsers = await ChatController.getChatUsers(chatId);

    return chatUsers.map((i) => i.id).indexOf(+userId) > -1;
  }

  async removeUserFromChat() {
    const userId = prompt('Введите ID пользователя для удаления из текущего чата');
    const chatId = store.getState().currentChatId;
    const currentUserId = this.props.currentUser.id;
    if (userId && +userId === currentUserId) {
      const result = window.confirm('Исключив себя вы удалите чат');
      if (result) {
        ChatController.deleteChat(store.getState().currentChatId)
          .then(() => {
            store.set('messageList', []);
            ChatController.getChats();
          })
          .catch((error) => alert(`Ошибка выполнения запроса! ${error ? error.reason : ''}`));
      }

      return;
    }
    if (userId) {
      const wasUserInChat = await this._wasUserInChat(userId, chatId);
      if (wasUserInChat) {
        ChatController.removeUserFromChat(chatId, +userId)
          .then(() => alert('Пользователь успешно удалён!'))
          .catch((error) => alert(`Ошибка выполнения запроса! ${error ? error.reason : ''}`));
      } else {
        alert('Такого пользователя нет в чате!');
      }
    } else {
      alert('Поле не должно быть пустым!');
    }
  }

  createChat() {
    const chatTitle = prompt('Введите название чата');
    if (chatTitle) {
      ChatController.createChat(chatTitle)
        .then(() => ChatController.getChats())
        .catch((error) => alert(`Ошибка выполнения запроса! ${error ? error.reason : ''}`));
    } else {
      alert('Название чата не должно быть пустым!');
    }
  }

  deleteChat() {
    const result = window.confirm('Вы действительно хотите удалить этот чат?');

    if (result) {
      ChatController.deleteChat(store.getState().currentChatId)
        .then(() => {
          store.set('messageList', []);
          ChatController.getChats();
        })
        .catch((error) => alert(`Ошибка выполнения запроса! ${error ? error.reason : ''}`));
    }
  }

  getProfileInfo() {
    AuthController.fetchUser()
      .catch((error) => alert(`Ошибка запроса данных пользователя! ${error ? error.reason : ''}`));
  }

  onSendMessage(e: Event) {
    e.preventDefault();
    const data = validateInputs({
      elementId: 'message',
      regexp: REGEXP_MESSAGE,
    }) as { message: string } | undefined;
    if (data) {
      ws.sendMessage(data.message);
      scrollToLastMessage();
      setTimeout(() => {
        document.getElementById('message')!.focus();
      }, 300);
    }
  }

  onLogout() {
    AuthController.logout()
      .then(() => {
        store.clearUserInfo();
        const router = new Router();
        router.go('/');
      })
      .catch((error) => alert(`Ошибка выполнения запроса /logout! ${error ? error.reason : ''}`));
  }

  messageListToJSX() {
    if (this.props.messageList.length === 0) {
      return '<div class="messages-loader-wrapper">Здесь пока ничего нет...</div>';
    }

    if (store.getState().isChatLoading) {
      return '<div class="messages-loader-wrapper"><span class="messages-loader"></span></div>';
    }

    return this.props.messageList.map((message: IMessageProps) => `{{{ Message isMyMessage=${message.isMyMessage} messageText="${message.messageText}" }}}`)
      .join('');
  }

  chatListToJSX() {
    if (!this.props.chatList) {
      return '<div class="chats-empty">У вас пока нет чатов</div>';
    }

    return this.props.chatList
      .map((chat: IChatData, index: number) => {
        const lastMessage = !chat.last_message?.content ? undefined : `"${chat.last_message?.content}"`;
        const lastUsername = !chat.last_message?.user?.display_name ? undefined : `"${chat.last_message?.user?.display_name}"`;
        const unreadMessagesCount = !chat.unread_count ? undefined : `"${chat.unread_count}"`;

        let lastMessageTime;
        if (chat.last_message?.time) {
          lastMessageTime = `"${new Date(chat.last_message?.time).toLocaleTimeString()}"`;
        }

        return ` 
          {{{ DialogItem
           id="${chat.id}"
           name="${chat.title}"
           message=${lastMessage}
           time=${lastMessageTime}
           messageCount=${unreadMessagesCount}
           lastUserName=${lastUsername}
           color="${arrayOfRandomColors[index]}"
           }}}
        `;
      })
      .join('');
  }

  getChatTitle() {
    const chatId = store.getState()?.currentChatId;
    if (chatId) {
      const chat = store.getState()
        ?.chatList
        .find((item: IChatData) => String(item.id) === chatId);
      if (chat) {
        return chat.title;
      }
    }

    return undefined;
  }

  getIsAdmin() {
    const chatId = store.getState()?.currentChatId;
    const user = store.getState().currentUser;
    if (chatId) {
      const chat = store?.getState()?.chatList
        .find((item: IChatData) => String(item.id) === chatId);

      return chat?.created_by === user.id;
    }

    return false;
  }

  render() {
    const currentChatTitle = this.getChatTitle();
    const isAdmin = this.getIsAdmin();
    const user: IUserData = this.props.currentUser;
    const avatar = user?.avatar;
    const name = user?.first_name;
    const hostResources = 'https://ya-praktikum.tech/api/v2/resources/';
    const userAvatar = avatar ? `${hostResources}${avatar}` : 'https://racksmetal.ru/assets/images/products/1147/noimg-2-1.jpg';
    const miniAvatar = this.props.miniAvatar || 'https://cdn1.iconfinder.com/data/icons/ui-5/502/speech-1024.png';
    // language=hbs

    if (!user?.id) {
      return '<div class="chats-loader-wrapper"><span class="chats-loader"></span></div>';
    }

    return `
        <main class='chats'>
            <div class="chats__list-wrapper">
                <div class="chats__heading">
                    <div class="chats__heading-wrapper">
                    <img src=${userAvatar} class="chats__heading-avatar" alt="фото пользователя">
                        <div class="chats__heading-name">${name}</div>
                    <a class="chats__link-to-profile" href="/settings">
                        Профиль
                        <div class="arrow-right"></div>
                    </a>
                    </div>
                    <div class="button-chat-container">
                        {{{ Button className="profile__btn" text="+ Создать чат" onClick=onCreateChat }}}
                    </div>
                    <input class="search-input" type="text" placeholder="Поиск">
                </div>
                <div class="chat-list">
                    ${this.chatListToJSX()}
                </div>
            </div>
            <div class="chats__current">
                <div class="chats__current-heading">
                    ${currentChatTitle ? `<img class="chats__current-avatar" src='${miniAvatar}' alt="Аватар чата"/>
                                <span class="chats__current-name">${currentChatTitle || 'Выберите чат'}</span>
                    ` : ''}
                    <div class="chats__top-buttons">
                        ${isAdmin && currentChatTitle ? `
                        {{{ Button buttonId="button-add-user" className="profile__btn" text="Пригласить" onClick=onAddUser }}}
                        {{{ Button buttonId="button-delete-user" className="profile__btn" text="Исключить" onClick=onDeleteUser }}}
                        {{{ Button className="button_color_red" text="Удалить чат" onClick=onDeleteChat }}}
                      ` : ''}
<!--                        {{{ Button className="sign-out-btn" text="Выйти" onClick=onLogout}}}-->
                    </div>
                </div>
                <div class="chats__dialog">
                    ${currentChatTitle ? this.messageListToJSX() : '<div class="chats__pick-dialog"><span class="chats__pick-dialog-text">Выберите чат<span></span></div>'}
                </div>
                ${currentChatTitle ? `<form class="chats__handling">
                    <button class="chats__clip-button"></button>
                    {{{Input
                            class="chats__input-message"
                            inputId="message"
                            type="text"
                            inputPlaceholder="Сообщение"
                            inputName="message"
                    }}}
                    {{{SendMessageButton onClick=onSendMessage }}}
                </form>` : ''}

            </div>
        </main>;
    `;
  }
}
