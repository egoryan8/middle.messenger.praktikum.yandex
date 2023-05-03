export default `
<div class="dialog">
  <div class="dialog__avatar"></div>
  <div class="dialog__message-wrapper">
    <h3 class="dialog__name">{{name}}</h3>
    <p class="dialog__message">{{message}}</p>
  </div>
  <div class="dialog__info">
    <span class="dialog__time">{{time}}</span>
    <div class="dialog__message-count">{{messageCount}}</div>
  </div>
</div>
`;
