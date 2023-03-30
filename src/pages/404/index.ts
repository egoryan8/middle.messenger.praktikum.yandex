import { renderDom } from '../../utils/renderDom';
import { ErrorPage } from '../../components/error-page';
import './index.scss';

const NotFoundPage = new ErrorPage({
  errorCode: '404',
  message: 'Не туда попали',
  backLink: '/#',
});

renderDom('#app', NotFoundPage);
