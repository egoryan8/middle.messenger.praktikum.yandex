import Block from '../../utils/Block';
import ChatController from '../../controllers/ChatController';
import { store } from '../../Store';
import { ws } from '../../index';
import { scrollToLastMessage } from '../../utils/scrollToLastMessage';
import { getParentDataSetParam } from '../../utils/getParentDataSetParam';

export interface DialogItemProps {
  id: string;
  name: string;
  message: string;
  lastUserName: string;
  time: string;
  messageCount: string;
  avatar: string;
  color: string;
}

interface IDialog extends DialogItemProps {
  events: {
    click: Function;
  };
}

export class DialogItem extends Block<IDialog> {
  constructor(props: DialogItemProps) {
    super({
      ...props,
      events: {
        click: (e: PointerEvent) => this.setCurrentChatId(e),
      },
    });
  }

  async setCurrentChatId(e: PointerEvent) {
    store.set('isChatLoading', true);
    const id = getParentDataSetParam(e.target as HTMLElement, 'dialog', 'id');
    if (id) {
      store.set('currentChatId', id);
      const chatUsers = await ChatController.getChatUsers(id)
        .then(() => setTimeout(() => store.set('isChatLoading', false), 500));
      // eslint-disable-next-line no-console
      console.log(`Чат ${id}, пользователи: `, chatUsers);
      ws.connect(); // Создаем подключение по Websocket
      setTimeout(() => {
        document.getElementById('message')!.focus();
      }, 500);
    } else {
      scrollToLastMessage();
      setTimeout(() => {
        document.getElementById('message')!.focus();
      }, 500);
    }
  }

  getFirstBigSymbolOfChatName() {
    return Array.from(this.props.name)[0];
  }

  render() {
    const activeChatBorder = store.getState().currentChatId === this.props.id ? 'style="background: #92bdff"' : '';
    const { messageCount } = this.props;

    return `
    <div class="dialog" data-id={{id}} ${activeChatBorder}>
      <div class="dialog__avatar-mock" style="background: ${this.props.color}">
        ${this.getFirstBigSymbolOfChatName()}
      </div>
      <div class="dialog__message-wrapper">
        <h3 class="dialog__name">{{name}}</h3>
        <div class="dialog__lastUsername">{{lastUserName}}</div>
        <p class="dialog__message">{{message}}</p>
      </div>
      <div class="dialog__info">
        <span class="dialog__time">{{time}}</span>
        ${messageCount ? '<div class="dialog__message-count">{{messageCount}}</div>' : ''}
      </div>
    </div>`;
  }
}
