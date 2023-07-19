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

  componentDidMount() {
    AuthController.fetchUser().catch(() => new Router().go('/signin'));
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
    const id = this.props.id || undefined;
    const email = !this.props.email ? undefined : `"${this.props.email}"`;
    const login = !this.props.login ? undefined : `"${this.props.login}"`;
    const firstName = !this.props.first_name ? undefined : `"${this.props.first_name}"`;
    const secondName = !this.props.second_name ? undefined : `"${this.props.second_name}"`;
    const displayName = !this.props.display_name ? undefined : `"${this.props.display_name}"`;
    const phone = this.props.phone || undefined;
    const avatar = this.props.avatar || 'https://racksmetal.ru/assets/images/products/1147/noimg-2-1.jpg';

    console.log('props: ', this.props);

    // language=hbs
    return `
        <div class="profile__wrapper">
            {{{ Sidebar }}}
            <div class="profile">
                <div class="profile__img-wrapper">
                    <div class="profile__img-overlay-wrapper">
<!--                        <svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                            <circle cx="65" cy="65" r="65" fill="#EFEFEF"/>-->
<!--                            <path fill-rule="evenodd" clip-rule="evenodd" d="M81 47H49C47.8954 47 47 47.8954 47 49V70.2667L59.6547 67.3139C60.5486 67.1053 61.4635 67 62.3814 67H67.6186C68.5365 67 69.4514 67.1053 70.3453 67.3139L83 70.2667V49C83 47.8954 82.1046 47 81 47ZM49 45C46.7909 45 45 46.7909 45 49V81C45 83.2091 46.7909 85 49 85H81C83.2091 85 85 83.2091 85 81V49C85 46.7909 83.2091 45 81 45H49ZM55.9091 59.5455C57.9174 59.5455 59.5455 57.9174 59.5455 55.9091C59.5455 53.9008 57.9174 52.2727 55.9091 52.2727C53.9008 52.2727 52.2728 53.9008 52.2728 55.9091C52.2728 57.9174 53.9008 59.5455 55.9091 59.5455Z" fill="#CDCDCD"/>-->
<!--                        </svg>-->
                        <img class="profile__img" src='${avatar}' alt="аватар пользователя">
                        <div class="profile__img-overlay">
                            Поменять аватар
                        </div>
                    </div>
                    <span class="profile__name">Иван</span>
                </div>
                <ul class="profile__fields">
                    <li class="profile__field">
                        <span class="profile__field__label">User ID</span>
                        <span class="profile__field__value">${id}</span>
                    </li>
                    {{{ InputProfile 
                            inputValue=${email}
                            label="Почта"
                            inputId="email"
                            inputName="email"
                            regexp="${REGEXP_EMAIL}"
                    }}}
                    {{{ InputProfile
                            inputValue=${login}
                            label="Логин"
                            inputId="login"
                            inputName="login"
                            regexp="${REGEXP_LOGIN}"
                    }}}
                    {{{ InputProfile
                            inputValue=${firstName}
                            label="Имя"
                            inputId="first_name"
                            inputName="first_name"
                            regexp="${REGEXP_NAME}"
                    }}}
                    {{{ InputProfile
                            inputValue=${secondName}
                            label="Фамилия"
                            inputId="second_name"
                            inputName="second_name"
                            regexp="${REGEXP_NAME}"
                    }}}
                    {{{ InputProfile
                            inputValue=${displayName}
                            label="Имя в чате"
                            inputId="display_name"
                            inputName="display_name"
                            regexp="${REGEXP_NICKNAME}"
                    }}}
                    {{{ InputProfile
                            inputValue=${phone}
                            label="Телефон"
                            inputId="phone"
                            inputName="phone"
                            regexp="${REGEXP_PHONE}"
                    }}}
                </ul>
                <div class="profile__links-wrapper">
                    <a href="/profile-edit" class="profile__link">Изменить данные</a>
                    <a href="/password-edit" class="profile__link">Изменить пароль</a>
                    <button class="profile__sign-out-btn">Выйти</button>
                </div>
            </div>
        </div>
    `;
  }
}
