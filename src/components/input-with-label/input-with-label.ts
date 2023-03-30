import template from './input-with-label.template';
import Block from '../../utils/Block';

interface InputWithLabelProps {
  label: string;
  type: string;
  placeholder: string;
  name: string;
  errorText?: string;
}

export class InputWithLabel extends Block<InputWithLabelProps> {
  constructor({
    label, type, placeholder, name, errorText,
  }: InputWithLabelProps) {
    super({
      label,
      type,
      placeholder,
      name,
      errorText,
    });
  }

  render() {
    return template;
  }
}
