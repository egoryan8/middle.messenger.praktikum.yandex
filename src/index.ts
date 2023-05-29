import Router from './utils/Router';
import { registerComponent } from './utils/registerComponent';
import { Button } from './components/button';
import { Input } from './components/input';
import { LoginPage } from './pages/login/login';
import { RegisterPage } from './pages/register/register';
import { Profile } from './pages/profile/profile';
import { ChatsPage } from './pages/chats/chats';
import { ErrorPage } from './components/error-page';
import { DialogItem } from './components/dialog-item';

registerComponent(Button, 'Button');
registerComponent(Input, 'Input');
registerComponent(DialogItem, 'DialogItem');

const router = new Router();

router.use('/', LoginPage)
  .use('/sign-up', RegisterPage)
  .use('/settings', Profile)
  .use('/messenger ', ChatsPage)
  .use('/error500', ErrorPage)
  .use('/error404', ErrorPage);

router.start();
