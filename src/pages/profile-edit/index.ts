import { renderDom } from '../../utils/renderDom';
import { registerComponent } from '../../utils/registerComponent';
import { Button } from '../../components/button';
import { Sidebar } from '../../components/sidebar';
import { ProfileEdit } from './profile-edit';

import './index.scss';

registerComponent(Button, 'Button');
registerComponent(Sidebar, 'Sidebar');

const profileEdit = new ProfileEdit();

renderDom('#app', profileEdit);
