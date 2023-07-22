// import template from './button.hbs';
import Block from '../../utils/Block';

export type InputTypeProfile = 'email' | 'text' | 'tel' | 'password';

interface InputProfileProps {
  label?: string;
  inputId: string;
  inputType?: InputTypeProfile;
  inputName: string;
  inputValue?: string;
  inputPlaceholder?: string;
  regexp: string;
  className: string;
}

export class InputProfile extends Block<InputProfileProps> {
  constructor(props: InputProfileProps) {
    super({
      ...props,
    });
  }

  render() {
    const {
      label,
      inputId,
      inputType = 'text',
      inputName,
      inputValue,
      inputPlaceholder,
      regexp,
    } = this.props;

    // language=hbs
    return `
    <li class="profile__field">
    <label for={{inputName}} class="profile__field__label">${label}</label> 
   
    {{{ Input inputId="${inputId}"
              inputType="${inputType}"
              inputName="${inputName}"
              ${inputValue !== undefined ? `inputValue="${inputValue}"` : ''}
              ${inputPlaceholder !== undefined ? `inputPlaceholder="${inputPlaceholder}"` : ''}
              regexp="${regexp}"
              class="profile__field__value"
    }}}
    </li>
    `;
  }
}
