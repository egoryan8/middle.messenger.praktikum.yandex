import {
  REGEXP_EMAIL, REGEXP_LOGIN, REGEXP_NAME, REGEXP_PASSWORD, REGEXP_PHONE,
} from '../../utils/regexps';

export default `
<div class="register-page">
  <form class="register-page__wrapper">
    <h1 class="register-page__title">Регистрация</h1>
    <div class="register-page__input-wrapper">
                        {{{ InputWithLabel classInput="input-with-label__input" labelText="Почта" errorText="Латиница, обязательно должен быть символ @" inputType="email" inputId="email" inputName="email" regexp="${REGEXP_EMAIL}" }}}
                        {{{ InputWithLabel classInput="input-with-label__input" labelText="Логин" errorText="Должно содержать от 3 до 8 символов" inputId="login" inputType="text" inputName="login" regexp="${REGEXP_LOGIN}" }}}
                        {{{ InputWithLabel classInput="input-with-label__input" labelText="Имя" errorText="Первая буква должна быть заглавной, без пробелов и без цифр" inputId="first_name" inputType="text" inputName="first_name" regexp="${REGEXP_NAME}" }}}
                        {{{ InputWithLabel classInput="input-with-label__input" labelText="Фамилия"  errorText="Первая буква должна быть заглавной, без пробелов и без цифр" inputId="second_name" inputType="text" inputName="second_name" regexp="${REGEXP_NAME}" }}}
                        {{{ InputWithLabel classInput="input-with-label__input" labelText="Телефон" errorText="Цифры, от 11 до 15 символов" inputId="phone" inputType="tel" inputName="phone" regexp="${REGEXP_PHONE}" }}}
                        {{{ InputWithLabel classInput="input-with-label__input" labelText="Пароль" errorText="Должно содержать от 8 до 40 символов + Заглавный символ" inputId="password" inputType="password" inputName="password" regexp="${REGEXP_PASSWORD}" }}}
    </div>
    <div class="register-page__button-wrapper">
      {{{ Button type="submit" text="Зарегистрироваться" onClick=onClick}}}
      <a class="register-page__link" href="/">Войти</a>
    </div>  
  </form>
</div>
`;
