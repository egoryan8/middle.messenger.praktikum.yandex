import { REGEXP_LOGIN, REGEXP_PASSWORD } from '../../utils/regexps';

export default `
<div class="login-page">
  <div class="login-page__wrapper">
    <h1 class="login-page__title">Вход</h1>
    <div class="login-page__input-wrapper">
       {{{ InputWithLabel classInput="input-with-label__input" labelText="Логин:" errorText="Должно содержать от 3 до 8 символов" inputId="login" inputName="login" regexp="${REGEXP_LOGIN}" }}}
       {{{ InputWithLabel classInput="input-with-label__input" labelText="Пароль:" errorText="Должно содержать от 8 до 40 символов + Заглавный символ" inputId="password" inputType="password" inputName="password" regexp="${REGEXP_PASSWORD}"   }}}
    </div>
    <div class="login-page__button-wrapper">
      {{{ Button text="Войти"}}}
      <a class="login-page__link" href="../register/index.html">Ещё не зарегистрированы?</a>
    </div>
  </div>
</div>
`;
