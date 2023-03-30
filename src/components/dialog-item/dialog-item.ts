import '../../services/styles/styles.less';
import template from './dialog-item.template';
import Block from '../../utils/Block';

interface DialogItemProps {
  name: string;
  message: string;
  time: string;
  messageCount: string;
  onClick: () => void;
}

type DialogItemType = Omit<DialogItemProps, 'onClick'> & {
  events: {
    click: Function,
  },
};

export class DialogItem extends Block<DialogItemType> {
  constructor({
    message, time, name, messageCount, onClick,
  }: DialogItemProps) {
    super({
      name,
      message,
      time,
      messageCount,
      events: {
        click: onClick,
      },
    });
  }

  render() {
    return template;
  }
}
