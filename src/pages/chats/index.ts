import { renderDom } from '../../utils/renderDom';
import { registerComponent } from '../../utils/registerComponent';
import { DialogItem } from '../../components/dialog-item';
import { ChatsPage } from './chats';

import './index.scss';

registerComponent(DialogItem, 'DialogItem');

export const chatsPage = new ChatsPage();

renderDom('#app', chatsPage);
