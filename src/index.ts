import Router from './utils/Router';
import { registerComponent } from './utils/registerComponent';
import { Button } from './components/button';
import { Input } from './components/input';
import { LoginPage } from './pages/login/login';
import { RegisterPage } from './pages/register/register';
import ProfilePage from './pages/profile';
import ChatsPage from './pages/chats';
import PasswordEdit from './pages/password-edit';
import { DialogItem } from './components/dialog-item';
import { InputWithLabel } from './components/input-with-label';
import { ServerErrorPage } from './pages/500';
import { NotFoundPage } from './pages/404';
import { WS } from './utils/WebSockets';
import { SendMessageButton } from './components/send-message-button';
import { Message } from './components/message';
import { InputProfile } from './components/input-profile/input-profile';
import { Sidebar } from './components/sidebar';
import { ProfileAvatar } from './components/profile-avatar';

registerComponent(Button, 'Button');
registerComponent(ProfileAvatar, 'ProfileAvatar');
registerComponent(Sidebar, 'Sidebar');
registerComponent(InputProfile, 'InputProfile');
registerComponent(SendMessageButton, 'SendMessageButton');
registerComponent(Message, 'Message');
registerComponent(Input, 'Input');
registerComponent(DialogItem, 'DialogItem');
registerComponent(InputWithLabel, 'InputWithLabel');

const router = new Router();
export const ws = new WS();

router.use('/', LoginPage)
  .use('/sign-up', RegisterPage)
  .use('/settings', ProfilePage)
  .use('/password-edit', PasswordEdit)
  .use('/messenger', ChatsPage)
  .use('/error500', ServerErrorPage)
  .use('/error404', NotFoundPage);

router.start();
