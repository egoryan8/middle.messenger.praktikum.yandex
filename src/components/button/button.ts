import template from './button.template';
import Block from '../../utils/Block';

interface ButtonProps {
  text: string;
  type?: string;
  onClick: () => void;
}

type ButtonType = Omit<ButtonProps, 'onClick'> & {
  events: {
    click: Function,
  },
};

export class Button extends Block<ButtonType> {
  constructor({
    text, type = 'button', onClick,
  }: ButtonProps) {
    super({
      text,
      type,
      events: {
        click: onClick,
      },
    });
  }

  render() {
    return template;
  }
}
