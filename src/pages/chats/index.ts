import { withStore } from '../../Store';
// eslint-disable-next-line import/no-cycle
import { ChatsPage } from './chats';

const withChats = withStore((state) => ({
  chatList: state.chatList || [],
  currentChatId: state.currentChatId,
  messageList: state.messageList || [],
}));

export default withChats(ChatsPage);