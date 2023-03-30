export default `
<div class="register-page">
  <div class="register-page__wrapper">
    <h1 class="register-page__title">Регистрация</h1>
    <div class="register-page__input-wrapper">
      {{{ InputWithLabel label="Почта" type="email" placeholder="Почта" errorText="Неверная почта" name="email"}}}
      {{{ InputWithLabel label="Логин" type="text" placeholder="Логин" name="login"}}}
      {{{ InputWithLabel label="Имя" type="text" placeholder="Имя" name="first_name"}}}
      {{{ InputWithLabel label="Фамилия" type="text" placeholder="Фамилия" name="second_name"}}}
      {{{ InputWithLabel label="Телефон" type="text" placeholder="Телефон" name="phone"}}}
      {{{ InputWithLabel label="Пароль" type="password" placeholder="Пароль" name="password"}}}
      {{{ InputWithLabel label="Пароль (ещё раз)" type="password" placeholder="Пароль (ещё раз)" name="password"}}}
    </div>
    <div class="register-page__button-wrapper">
      {{{ Button text="Зарегистрироваться"}}}
      <a class="register-page__link" href="../login/index.html">Войти</a>
    </div>
  </div>
</div>
`;
