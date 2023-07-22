import Block from '../../utils/Block';
import template from './register.template';
import { validateInputs } from '../../utils/validation';
import {
  REGEXP_EMAIL, REGEXP_LOGIN, REGEXP_NAME, REGEXP_PASSWORD, REGEXP_PHONE,
} from '../../utils/regexps';
import './index.scss';
import AuthController from '../../controllers/AuthController';
import { SignUpData } from '../../api/AuthApi';
import Router from '../../utils/Router';

export class RegisterPage extends Block<{ onClick: Function }> {
  constructor() {
    super({
      onClick: (e: Event) => this.onSignUp(e),
      events: {
        submit: (e: Event) => this.onSignUp(e),
      },
    });
  }

  onSignUp = (e: Event) => {
    e.preventDefault();
    const data = validateInputs(
      { elementId: 'email', regexp: REGEXP_EMAIL },
      { elementId: 'login', regexp: REGEXP_LOGIN },
      { elementId: 'first_name', regexp: REGEXP_NAME },
      { elementId: 'second_name', regexp: REGEXP_NAME },
      { elementId: 'phone', regexp: REGEXP_PHONE },
      { elementId: 'password', regexp: REGEXP_PASSWORD },
    );

    // Если все поля заполнены и провалидированы - отправляем запрос
    if (data) {
      AuthController.signUp(data as SignUpData)
        .then(() => new Router().go('/messenger'))
        .catch((error) => {
          if (error.reason === 'User already in system') {
            const router = new Router();
            router.go('/messenger');
          } else alert(`Ошибка выполнения запроса авторизации! ${error ? error.reason : ''}`);
        });
    }
  };

  componentDidMount() {
    AuthController.fetchUser().then(() => {
      const router = new Router();
      router.go('/messenger');
    });
  }

  validate() {
    validateInputs(
      { elementId: 'email', regexp: REGEXP_EMAIL },
      { elementId: 'login', regexp: REGEXP_LOGIN },
      { elementId: 'first_name', regexp: REGEXP_NAME },
      { elementId: 'second_name', regexp: REGEXP_NAME },
      { elementId: 'phone', regexp: REGEXP_PHONE },
      { elementId: 'password', regexp: REGEXP_PASSWORD },
    );
  }

  render() {
    return template;
  }
}
