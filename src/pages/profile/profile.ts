import { validateInputs } from '../../utils/validation';
import {
  REGEXP_EMAIL, REGEXP_LOGIN, REGEXP_NAME, REGEXP_NICKNAME, REGEXP_PHONE,
} from '../../utils/regexps';
import Block from '../../utils/Block';
import './profile.scss';
import template from './profile.template';

interface IProfileProps {
  // email: string;
  // login: string;
  // firstName: string;
  // secondName: string;
  // displayName: string;
  // phone: string;
  onClick: () => void;

}

export class Profile extends Block<IProfileProps> {
  constructor(props: IProfileProps) {
    super({
      ...props,
      onClick: (event: Event) => {
        if ((event.target as HTMLButtonElement).id === 'button-save') {
          this.validate();
        }
      },
    });
  }

  validate() {
    validateInputs(
      { elementId: 'email', regexp: REGEXP_EMAIL },
      { elementId: 'login', regexp: REGEXP_LOGIN },
      { elementId: 'first_name', regexp: REGEXP_NAME },
      { elementId: 'second_name', regexp: REGEXP_NAME },
      { elementId: 'display_name', regexp: REGEXP_NICKNAME },
      { elementId: 'phone', regexp: REGEXP_PHONE },
    );
  }

  render() {
    // const {
    //   email, login, firstName, secondName, displayName, phone,
    // } = this.props;

    // language=hbs
    return template;
  }
}
