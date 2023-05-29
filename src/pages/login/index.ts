import { renderDom } from '../../utils/renderDom';
import { LoginPage } from './login';
import { registerComponent } from '../../utils/registerComponent';
import { InputWithLabel } from '../../components/input-with-label';
import { Button } from '../../components/button';
import { Input } from '../../components/input';

import './index.scss';

registerComponent(Button, 'Button');
registerComponent(Input, 'Input');
registerComponent(InputWithLabel, 'InputWithLabel');

export const loginPage = new LoginPage();

renderDom('#app', loginPage);
