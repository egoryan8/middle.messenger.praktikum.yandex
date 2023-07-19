import template from './dialog-item.template';
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
  time: string;
  messageCount: string;
  avatar: string;
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
    const id = getParentDataSetParam(e.target as HTMLElement, 'dialog', 'id');
    if (id) {
      store.set('currentChatId', id);
      const chatUsers = await ChatController.getChatUsers(id);
      // eslint-disable-next-line no-console
      console.log(`Чат ${id}, пользователи: `, chatUsers);
      ws.connect(); // Создаем подключение по Websocket
    } else {
      scrollToLastMessage();
    }
  }

  render() {
    const activeChatBorder = store.getState().currentChatId === this.props.id ? 'style="background: #92bdff"' : '';
    const { messageCount } = this.props;

    return `
    <div class="dialog" data-id={{id}} ${activeChatBorder}>
      <div class="dialog__avatar"></div>
      <div class="dialog__message-wrapper">
        <h3 class="dialog__name">{{name}}</h3>
        <p class="dialog__message">{{message}}</p>
      </div>
      <div class="dialog__info">
        <span class="dialog__time">{{time}}</span>
        ${messageCount ? '<div class="dialog__message-count">{{messageCount}}</div>' : ''}
      </div>
    </div>`;
  }
}
