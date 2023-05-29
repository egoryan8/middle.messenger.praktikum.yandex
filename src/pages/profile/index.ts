import './index.scss';
import { registerComponent } from '../../utils/registerComponent';
import { Sidebar } from '../../components/sidebar';
import { Profile } from './profile';
import { renderDom } from '../../utils/renderDom';

registerComponent(Sidebar, 'Sidebar');

export const profiePage = new Profile({
  onClick: () => {},
});

renderDom('#app', profiePage);
