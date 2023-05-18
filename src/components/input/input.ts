import Block from '../../utils/Block';
import { validateInput } from '../../utils/validation';

export type TInputType = 'email' | 'text' | 'tel' | 'password';

interface IInputProps {
  inputId: string;
  inputValue?: string;
  inputPlaceholder?: string;
  inputType: TInputType;
  inputName: string;
  className?: string;
  regexp: string;
  class: string;
}

interface IInput extends IInputProps {
  events: {
    focus: Function; blur: Function;
  }
}

export class Input extends Block<IInput> {
  constructor(props: IInputProps) {
    super({
      ...props,
      events: {
        focus: () => validateInput(this.props.inputId, this.props.regexp),
        blur: () => validateInput(this.props.inputId, this.props.regexp),
      },
    });
  }

  render() {
    return `
      <input id={{inputId}}
             ${this.props.inputValue !== undefined && 'value={{inputValue}}'}

             ${this.props.inputPlaceholder !== undefined && 'placeholder={{inputPlaceholder}}'}

             type={{inputType}} name={{inputName}}
             class={{class}} autocomplete="false"/>`;
  }
}
