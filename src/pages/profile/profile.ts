import { validateInputs } from '../../utils/validation';
import {
  REGEXP_EMAIL, REGEXP_LOGIN, REGEXP_NAME, REGEXP_NICKNAME, REGEXP_PHONE,
} from '../../utils/regexps';
import Block from '../../utils/Block';
import './profile.scss';
import template from './profile.template';
import UserController from '../../controllers/UserController';
import { IProfileData } from '../../api/UserApi';

interface IProfileProps {
  id?: string;
  email?: string;
  login?: string;
  first_name?: string;
  second_name?: string;
  display_name?: string;
  phone?: string;
  avatar?: string;
  onClick: () => void;
}

export class Profile extends Block<IProfileProps> {
  constructor(props: IProfileProps) {
    super({
      ...props,
      onClick: () => this.onSaveProfile(),
    });
  }

  onSaveProfile() {
    const data = validateInputs(
      { elementId: 'email-profile', regexp: REGEXP_EMAIL },
      { elementId: 'login-profile', regexp: REGEXP_LOGIN },
      { elementId: 'first_name-profile', regexp: REGEXP_NAME },
      { elementId: 'second_name-profile', regexp: REGEXP_NAME },
      { elementId: 'display_name-profile', regexp: REGEXP_NICKNAME },
      { elementId: 'phone-profile', regexp: REGEXP_PHONE },
    );
    if (data) {
      UserController.updateProfile(data as IProfileData)
        // eslint-disable-next-line no-alert
        .then(() => alert('Профиль успешно обновлен!'))
        // eslint-disable-next-line no-alert
        .catch((error) => alert(`Ошибка выполнения запроса обновления профиля! ${error ? error.reason : ''}`));
    }
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
