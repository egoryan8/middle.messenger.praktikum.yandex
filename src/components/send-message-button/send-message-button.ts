import Block from '../../utils/Block';

interface SendMessageButtonProps {
  onClick: () => void;
}

type TSendMessageButton = Omit<SendMessageButtonProps, 'onClick'> & {
  events: {
    click: Function,
  },
};

export class SendMessageButton extends Block<TSendMessageButton> {
  constructor({
    onClick,
  }: SendMessageButtonProps) {
    super({
      events: {
        click: onClick,
      },
    });
  }

  render() {
    // language=hbs
    return '<button class="chats__send-button"></button>';
  }
}
