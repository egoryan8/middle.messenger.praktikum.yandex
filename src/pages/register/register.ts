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
      onClick: () => this.onSignUp(),
      events: {
        submit: (e: Event) => this.goNext(e),
      },
    });
  }

  onSignUp = () => {
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
        .then(() => new Router().go('/messages'))
        .catch((error) => alert(`Ошибка выполнения запроса регистрации! ${error ? error.reason : ''}`));
    }
  };

  goNext = (e: Event) => {
    console.log('NEXT');
    e.preventDefault();
    console.log(e);

    const values = Object.fromEntries(new FormData(e.target));
    console.log(values);

    const validations = {
      login: (value) => value.length >= 3 && value.length <= 20,
      password: (value) => value.length >= 3 && value.length <= 40,
      first_name: (value) => /^[A-Z]{1}|[А-Я]{1}$/.test(value[0]),
      second_name: (value) => /^[A-Z]{1}|[А-Я]{1}$/.test(value[0]),
      email: (value) => value.length >= 1 && value.includes('@'),
      phone: (value) => /^\d{11}$/.test(value),

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
      location.replace('/pages/chats/index.html');
    }
  };

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
