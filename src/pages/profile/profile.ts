import { validateInputs } from '../../utils/validation';
import {
  REGEXP_EMAIL, REGEXP_LOGIN, REGEXP_NAME, REGEXP_NICKNAME, REGEXP_PHONE,
} from '../../utils/regexps';
import Block from '../../utils/Block';
import UserController from '../../controllers/UserController';
import { IProfileData } from '../../api/UserApi';
import AuthController from '../../controllers/AuthController';
import Router from '../../utils/Router';
import './index.scss';
import { store } from '../../Store';

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
      onSaveProfile: () => this.onSaveProfile(),
      onLogout: () => this.onLogout(),
    });
  }

  componentDidMount() {
    AuthController.fetchUser().catch(() => new Router().go('/'));
  }

  onLogout() {
    AuthController.logout()
      .then(() => {
        store.clearUserInfo();
        const router = new Router();
        router.go('/');
      })
      .catch((error) => alert(`Ошибка выполнения запроса /logout! ${error ? error.reason : ''}`));
  }

  onSaveProfile() {
    try {
      const data = validateInputs(
        { elementId: 'email-profile', regexp: REGEXP_EMAIL },
        { elementId: 'login-profile', regexp: REGEXP_LOGIN },
        { elementId: 'first_name-profile', regexp: REGEXP_NAME },
        { elementId: 'second_name-profile', regexp: REGEXP_NAME },
        { elementId: 'display_name-profile', regexp: REGEXP_NICKNAME },
        { elementId: 'phone-profile', regexp: REGEXP_PHONE },
      );
      if (data) {
        console.log(data);
        UserController.updateProfile(data as IProfileData)
          // eslint-disable-next-line no-alert
          .then(() => alert('Профиль успешно обновлен!'))
          // eslint-disable-next-line no-alert
          .catch((error) => alert(`Ошибка выполнения запроса обновления профиля! ${error ? error.reason : ''}`));
      }
    } catch (e: any) {
      alert(`Ошибка выполнения запроса обновления профиля! ${e ? e.reason : ''}`);
    }
  }

  render() {
    const id = this.props.id || undefined;
    const email = !this.props.email ? undefined : `"${this.props.email}"`;
    const login = !this.props.login ? undefined : `"${this.props.login}"`;
    const firstName = !this.props.first_name ? undefined : `"${this.props.first_name}"`;
    const secondName = !this.props.second_name ? undefined : `"${this.props.second_name}"`;
    const displayName = !this.props.display_name ? undefined : `"${this.props.display_name}"`;
    const phone = this.props.phone || undefined;
    const avatar = this.props.avatar ? `"${this.props.avatar}"` : undefined;

    if (!this.props.id) {
      return '<div class="loader-wrapper"><span class="loader"></span></div>';
    }

    // language=hbs
    return `
        <div class="profile__wrapper">
            {{{ Sidebar }}}
            <div class="profile">
                <div class="profile__img-wrapper">
                    {{{ProfileAvatar avatar=${avatar} isLoading=${false}  }}}
                    <span class="profile__name">${this.props.first_name}</span>
                </div>
                <ul class="profile__fields">
                    <li class="profile__field">
                        <span class="profile__field__label">User ID</span>
                        <span class="profile__field__value">${id}</span>
                    </li>
                    {{{ InputProfile 
                            inputValue=${email}
                            label="Почта"
                            inputId="email-profile"
                            inputName="email"
                            regexp="${REGEXP_EMAIL}"
                    }}}
                    {{{ InputProfile
                            inputValue=${login}
                            label="Логин"
                            inputId="login-profile"
                            inputName="login"
                            regexp="${REGEXP_LOGIN}"
                    }}}
                    {{{ InputProfile
                            inputValue=${firstName}
                            label="Имя"
                            inputId="first_name-profile"
                            inputName="first_name"
                            regexp="${REGEXP_NAME}"
                    }}}
                    {{{ InputProfile
                            inputValue=${secondName}
                            label="Фамилия"
                            inputId="second_name-profile"
                            inputName="second_name"
                            regexp="${REGEXP_NAME}"
                    }}}
                    {{{ InputProfile
                            inputValue=${displayName}
                            label="Имя в чате"
                            inputId="display_name-profile"
                            inputName="display_name"
                            regexp="${REGEXP_NICKNAME}"
                    }}}
                    {{{ InputProfile
                            inputValue=${phone}
                            label="Телефон"
                            inputId="phone-profile"
                            inputName="phone"
                            regexp="${REGEXP_PHONE}"
                    }}}
                </ul>
                <div class="profile__links-wrapper">
                    {{{ Button  className="profile__btn"  buttonId="button-save-profile" text="Сохранить" onClick=onSaveProfile }}}
                    <a href="/password-edit" class="profile__link">Изменить пароль</a>
                    {{{ Button  className="profile__sign-out-btn"  buttonId="button-logout" text="Выйти" onClick=onLogout }}}
                </div>
            </div>
        </div>
    `;
  }
}
