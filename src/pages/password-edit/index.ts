import { renderDom } from '../../utils/renderDom';
import { registerComponent } from '../../utils/registerComponent';
import { Button } from '../../components/button';
import { PasswordEdit } from './password-edit';

import './index.scss';
import { Sidebar } from '../../components/sidebar';

registerComponent(Button, 'Button');
registerComponent(Sidebar, 'Sidebar');

const passwordEdit = new PasswordEdit();

renderDom('#app', passwordEdit);
