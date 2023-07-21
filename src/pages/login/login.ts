import Block from '../../utils/Block';
import template from './login.template';
import { REGEXP_LOGIN, REGEXP_PASSWORD } from '../../utils/regexps';
import { validateInputs } from '../../utils/validation';
import AuthController from '../../controllers/AuthController';
import Router from '../../utils/Router';
import ChatController from '../../controllers/ChatController';
import { SignInData } from '../../api/AuthApi';

import './index.scss';

export class LoginPage extends Block<{ onClick: Function }> {
  constructor() {
    super({
      onClick: (e: Event) => this.onSignIn(e),
      events: {
        submit: (e: Event) => this.onSignIn(e),
      },
    });
  }

  componentDidMount() {
    AuthController.fetchUser().then(() => {
      const router = new Router();
      router.go('/messenger');
    });
  }

  onSignIn(e: Event) {
    e.preventDefault();
    const data = validateInputs({ elementId: 'login', regexp: REGEXP_LOGIN }, { elementId: 'password', regexp: REGEXP_PASSWORD });

    if (data) {
      AuthController.signIn(data as SignInData)
        .then(() => {
          console.log('Авторизация выполнена успешно!');
          ChatController.getChats();
          const router = new Router();
          router.go('/messenger');
        })
        .catch((error) => alert(`Ошибка выполнения запроса авторизации! ${error ? error.reason : ''}`));
    }
  }

  validate() {
    validateInputs({ elementId: 'login', regexp: REGEXP_LOGIN }, { elementId: 'password', regexp: REGEXP_PASSWORD });
  }

  render() {
    // language=hbs
    return template;
  }
}
