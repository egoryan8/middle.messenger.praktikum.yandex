export default `
<div class="chats">
  <div class="chats__list-wrapper">
    <div class="chats__heading">
      <a class="chats__link-to-profile" href="/settings">
        Профиль
        <div class="arrow-right"></div>
      </a>
      <input class="search-input" type="text" placeholder="Поиск">
    </div>
    <ul class="chats__list">
        {{{ DialogItem name="Егор" message="И Human Interface" time="22:28" messageCount="1"}}}
        {{{ DialogItem name="Егор" message="Друзья, у меня для вас особенный выпуск новостей! Очень очень много новостей" time="Пт" messageCount="2"}}}
        {{{ DialogItem name="Егор" message="Пример очень-очень длинного текста Пример очень-очень длинного текста Пример очень-очень длинного текста Пример очень-очень длинного текста" time="12 фев" messageCount="4"}}}
        {{{ DialogItem name="Егор" message="И Human Interface" time="22:28" messageCount="8"}}}
        {{{ DialogItem name="Егор" message="И Human Interface" time="22:28" messageCount="12"}}}
        {{{ DialogItem name="Егор" message="И Human Interface" time="22:28" messageCount="2123"}}}
        {{{ DialogItem name="Егор" message="И Human Interface" time="22:28" messageCount="2"}}}
        {{{ DialogItem name="Егор" message="И Human Interface" time="22:28" messageCount="2"}}}
        {{{ DialogItem name="Егор" message="И Human Interface" time="22:28" messageCount="2"}}}
        {{{ DialogItem name="Егор" message="И Human Interface" time="22:28" messageCount="2"}}}
        {{{ DialogItem name="Егор" message="И Human Interface" time="22:28" messageCount="2"}}}
        {{{ DialogItem name="Егор" message="И Human Interface" time="22:28" messageCount="2"}}}
    </ul>
  </div>
  <div class="chats__current">
    <div class="chats__current-heading">
      <div class="chats__current-avatar"></div>
      <span class="chats__current-name">Егор</span>
      <button class="chats__options-button"></button>
    </div>
    <div class="chats__dialog">
      Пока что тут заглушка
    </div>
    <div class="chats__handling">
      <button class="chats__clip-button"></button>
      <input class="chats__input-message" name="message" type="text" placeholder="Сообщение">
      <button class="chats__send-button"></button>
    </div>
  </div>
</div>

`;
