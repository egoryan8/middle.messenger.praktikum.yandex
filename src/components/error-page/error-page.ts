import template from './error-page.template';
import Block from '../../utils/Block';

interface ErrorPageProps {
  errorCode: string;
  message: string;
  backLink: string;
}

export class ErrorPage extends Block<ErrorPageProps> {
  constructor({
    errorCode, message, backLink,
  }: ErrorPageProps) {
    super({
      errorCode,
      message,
      backLink,
    });
  }

  render() {
    return template;
  }
}
