import { renderDom } from '../../utils/renderDom';
import { ErrorPage } from '../../components/error-page';
import './index.scss';

export const NotFoundPage = new ErrorPage({
  errorCode: '404',
  message: 'Не туда попали',
  backLink: '/messenger',
});

renderDom('#app', NotFoundPage);
