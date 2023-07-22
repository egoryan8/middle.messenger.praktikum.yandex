import Block from '../../utils/Block';

export interface IMessageProps {
  isMyMessage: boolean;
  messageText: string;
  messageDate?: string;
  messageTime?: string;
}

export class Message extends Block<IMessageProps> {
  constructor({ isMyMessage, messageText }: IMessageProps) {
    super({
      isMyMessage,
      messageText,
    });
  }

  render() {
    // language=hbs
    return this.props.isMyMessage
      ? '<div class="output-message">{{messageText}}</div>'
      : '<div class="input-message">{{messageText}}</div>';
  }
}
