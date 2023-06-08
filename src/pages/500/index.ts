import { renderDom } from '../../utils/renderDom';
import { ErrorPage } from '../../components/error-page';
import './index.scss';

export const ServerErrorPage = new ErrorPage({
  errorCode: '500',
  message: 'Мы уже фиксим',
  backLink: '/messenger',
});

renderDom('#app', ServerErrorPage);
