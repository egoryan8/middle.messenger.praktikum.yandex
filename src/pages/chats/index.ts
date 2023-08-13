import { withStore } from '../../Store';
// eslint-disable-next-line import/no-cycle
import { ChatsPage } from './chats';

const withChats = withStore((state) => ({
  currentChatId: state.currentChatId,
  chatList: state.chatList || [],
  messageList: state.messageList || [],
}));

// @ts-ignore
export default withChats(ChatsPage);
