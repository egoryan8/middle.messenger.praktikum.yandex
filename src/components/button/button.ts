import template from './button.template';
import Block from '../../utils/Block';

interface ButtonProps {
  text: string;
  className: string;
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
    text, type = 'button', onClick, className,
  }: ButtonProps) {
    super({
      text,
      type,
      className,
      events: {
        click: onClick,
      },
    });
  }

  render() {
    return template;
  }
}
