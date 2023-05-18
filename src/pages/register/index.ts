import { renderDom } from '../../utils/renderDom';
import { RegisterPage } from './register';
import { registerComponent } from '../../utils/registerComponent';
import { InputWithLabel } from '../../components/input-with-label';
import { Button } from '../../components/button';
import { Input } from '../../components/input';

import './index.scss';

registerComponent(Button, 'Button');
registerComponent(Input, 'Input');
registerComponent(InputWithLabel, 'InputWithLabel');

const registerPage = new RegisterPage();

renderDom('#app', registerPage);
