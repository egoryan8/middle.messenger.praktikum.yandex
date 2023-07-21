import Block from '../../utils/Block';

export type TInputTypeField = 'email' | 'text' | 'tel' | 'password';

interface IInputField {
  labelText?: string;
  inputId: string;
  inputType: TInputTypeField;
  inputName: string;
  inputValue?: string;
  inputPlaceholder?: string;
  regexp: string;
  classInput?: string;
  errorText: string;
}

export class InputWithLabel extends Block<IInputField> {
  constructor(props: IInputField) {
    super({
      ...props,
    });
  }

  render() {
    const {
      labelText, inputId, inputType, inputName, inputValue, inputPlaceholder, regexp, classInput,
    } = this.props;

    // language=hbs
    return `
        <label class="input-with-label">
            <span class="input-with-label__caption">${labelText}</span>
            {{{ Input inputId="${inputId}"
                      inputType="${inputType}"
                      inputName="${inputName}"
                      ${inputValue !== undefined ? `inputValue="${inputValue}"` : ''}
                      ${inputPlaceholder !== undefined ? `inputPlaceholder="${inputPlaceholder}"` : ''}
                      regexp="${regexp}"
                      class="${classInput}"
                      
            }}}
            <div class="input-with-label__error">
           {{errorText}}
            </div>
        </label>  


    `;
  }
}
