import Block from '../../utils/Block';
import AuthController from '../../controllers/AuthController';
import Router from '../../utils/Router';
import { validateInputs } from '../../utils/validation';
import { REGEXP_PASSWORD } from '../../utils/regexps';
import UserController from '../../controllers/UserController';
import { ChangePasswordData } from '../../api/AuthApi';

import './password-edit.scss';

interface PasswordEditProps {
  avatar?: string;
}

interface IPasswordEdit extends PasswordEditProps {
  onClick: Function;
}

export class PasswordEdit extends Block<IPasswordEdit> {
  constructor(props: PasswordEditProps) {
    super({
      ...props,
      onSavePassword: () => this.onSavePassword(),
    });
  }

  componentDidMount() {
    AuthController.fetchUser().catch(() => new Router().go('/signin'));
  }

  onSavePassword() {
    const data = validateInputs(
      { elementId: 'newPassword', regexp: REGEXP_PASSWORD },
      { elementId: 'oldPassword', regexp: REGEXP_PASSWORD },
    );
    console.log(data);
    if (data) {
      UserController.changePassword(data as ChangePasswordData)
        .then(() => alert('Пароль успешно изменен!'))
        .catch((error) => alert(`Ошибка изменения пароля! ${error ? error.reason : ''}`));
    }
  }

  render() {
    const avatar = this.props.avatar ? `"${this.props.avatar}"` : undefined;

    if (!this.props.id) {
      return '<div class="loader-wrapper"><span class="loader"></span></div>';
    }

    // language=hbs
    return `
        <div class="profile-edit__wrapper">
            {{{ Sidebar }}}
            <div class="profile-edit">
                <div class="profile__img-wrapper">
                    {{{ProfileAvatar avatar=${avatar} isLoading=${false}  }}}
                    <span class="profile__name">${this.props.first_name}</span>
                </div>
                <ul class="profile-edit__fields">
                    {{{ InputProfile
                            label="Старый пароль"
                            inputId="oldPassword"
                            inputName="oldPassword"
                            regexp="${REGEXP_PASSWORD}"
                            inputType="password"
                    }}}
                    {{{ InputProfile
                            label="Новый пароль"
                            inputId="newPassword"
                            inputName="newPassword"
                            regexp="${REGEXP_PASSWORD}"
                            inputType="password"
                    }}}
                </ul>
                <div class="profile-edit__button-wrapper">
                    {{{ Button type="submit" text="Сохранить" onClick=onSavePassword }}}
                </div>
            </div>
        </div>
    `;
  }
}
