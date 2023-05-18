export default `
<div class="profile-edit__wrapper">
  {{{ Sidebar}}}
  <div class="profile-edit">
    <div class="profile-edit__img-wrapper">
    <svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="65" cy="65" r="65" fill="#EFEFEF"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M81 47H49C47.8954 47 47 47.8954 47 49V70.2667L59.6547 67.3139C60.5486 67.1053 61.4635 67 62.3814 67H67.6186C68.5365 67 69.4514 67.1053 70.3453 67.3139L83 70.2667V49C83 47.8954 82.1046 47 81 47ZM49 45C46.7909 45 45 46.7909 45 49V81C45 83.2091 46.7909 85 49 85H81C83.2091 85 85 83.2091 85 81V49C85 46.7909 83.2091 45 81 45H49ZM55.9091 59.5455C57.9174 59.5455 59.5455 57.9174 59.5455 55.9091C59.5455 53.9008 57.9174 52.2727 55.9091 52.2727C53.9008 52.2727 52.2728 53.9008 52.2728 55.9091C52.2728 57.9174 53.9008 59.5455 55.9091 59.5455Z" fill="#CDCDCD"/>
    </svg>
<!--<img class="profile-edit__img" src="./images/mock-user-avatar.svg" alt="аватар пользователя">-->
    </div>
    <ul class="profile-edit__fields">
      <li class="profile-edit__field">
        <span class="profile-edit__field__label">Почта</span>
        <input class="profile-edit__field__value" name="email" value="pochta@yandex.ru" type="text"/>
      </li>
      <li class="profile-edit__field">
        <span class="profile-edit__field__label">Логин</span>
        <input class="profile-edit__field__value" name="login" value="ivanivanov" type="text"/>
      </li>
      <li class="profile-edit__field">
        <span class="profile-edit__field__label">Имя</span>
        <input class="profile-edit__field__value" name="first_name" value="Иван" type="text"/>
      </li>
      <li class="profile-edit__field">
        <span class="profile-edit__field__label">Фамилия</span>
        <input class="profile-edit__field__value" name="second_name" value="Иванов" type="text"/>
      </li>
      <li class="profile-edit__field">
        <span class="profile-edit__field__label">Имя в чате</span>
        <input class="profile-edit__field__value" name="display_name" value="Иван" type="text"/>
      </li>
      <li class="profile-edit__field">
        <span class="profile-edit__field__label">Телефон</span>
        <input class="profile-edit__field__value" name="phone" value="+7 (909) 967 30 30" type="text"/>
      </li>
    </ul>
    <div class="profile-edit__button-wrapper">
      {{{ Button type="submit" text="Сохранить"}}}  
    </div>
  </div>
</div>
`;
