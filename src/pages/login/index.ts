import { renderDom } from '../../utils/renderDom';
import { LoginPage } from './login';
import { registerComponent } from '../../utils/registerComponent';
import { InputWithLabel } from '../../components/input-with-label';
import { Button } from '../../components/button';

import './index.scss';

registerComponent(Button, 'Button');
registerComponent(InputWithLabel, 'InputWithLabel');

const loginPage = new LoginPage();

renderDom('#app', loginPage);
