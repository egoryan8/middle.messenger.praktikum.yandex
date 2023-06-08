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
      // goNext:
      events: {
        submit: (e: Event) => this.goNext(e),
      },
    });
  }

  componentDidMount() {
    AuthController.fetchUser().then(() => {
      const router = new Router();
      router.go('/messenger');
    });
  }

  onSignIn() {
    const data = validateInputs({ elementId: 'login', regexp: REGEXP_LOGIN }, { elementId: 'password', regexp: REGEXP_PASSWORD });

    if (data) {
      AuthController.signIn(data as SignInData)
        .then(() => {
          console.log('Авторизация выполнена успешно!');
          ChatController.getChats();
          const router = new Router();
          router.go('/messages');
        })
        .catch((error) => alert(`Ошибка выполнения запроса авторизации! ${error ? error.reason : ''}`));
    }
  }

  goNext = (e: Event) => {
    console.log('NEXT');
    e.preventDefault();
    console.log(e);

    const values = Object.fromEntries(new FormData(e.target));
    console.log(values);

    const validations = {
      login: (value) => value.length >= 3 && value.length <= 20,
      password: (value) => value.length >= 3 && value.length <= 40,
    };
    let isAllValid = true;
    for (const name in values) {
      if (!validations[name](values[name])) {
        const input = e.target.querySelector(`[name="${name}"]`);
        input.style.outline = '2px solid red';
        input.classList.add('error');
        isAllValid = false;
      }
    }

    if (isAllValid) {
      location.replace('/pages/messages/index.html');
    }
  };

  validate() {
    validateInputs({ elementId: 'login', regexp: REGEXP_LOGIN }, { elementId: 'password', regexp: REGEXP_PASSWORD });
  }

  render() {
    // language=hbs
    return template;
  }
}
