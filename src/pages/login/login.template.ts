export default `
<div class="login-page">
  <div class="login-page__wrapper">
    <h1 class="login-page__title">Вход</h1>
    <div class="login-page__input-wrapper">
      {{{ InputWithLabel label="Логин" type="text" placeholder="Логин" errorText="Неверный логин" name="login"}}}
      {{{ InputWithLabel label="Пароль" type="password" placeholder="Пароль" name="password"}}}
    </div>
    <div class="login-page__button-wrapper">
      {{{ Button text="Войти"}}}
      <a class="login-page__link" href="../register/index.html">Ещё не зарегистрированы?</a>
    </div>
  </div>
</div>
`;
