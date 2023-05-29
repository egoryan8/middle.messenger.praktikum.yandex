import Router from './utils/Router';
import { registerComponent } from './utils/registerComponent';
import { Button } from './components/button';
import { Input } from './components/input';
import { LoginPage } from './pages/login/login';
import { RegisterPage } from './pages/register/register';
import { Profile } from './pages/profile/profile';
import { ChatsPage } from './pages/chats/chats';
import { DialogItem } from './components/dialog-item';
import { InputWithLabel } from './components/input-with-label';
import { ServerErrorPage } from './pages/500';
import { NotFoundPage } from './pages/404';

registerComponent(Button, 'Button');
registerComponent(Input, 'Input');
registerComponent(DialogItem, 'DialogItem');
registerComponent(InputWithLabel, 'InputWithLabel');

const router = new Router();

router.use('/', LoginPage)
  .use('/sign-up', RegisterPage)
  .use('/settings', Profile)
  .use('/messenger', ChatsPage)
  .use('/error500', ServerErrorPage)
  .use('/error404', NotFoundPage);

router.start();
