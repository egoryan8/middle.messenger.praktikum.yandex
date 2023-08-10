import { LoginPage } from './login';
import { registerComponent } from '../../utils/registerComponent';
import { InputWithLabel } from '../../components/input-with-label';
import { Button } from '../../components/button';

const chai = require('chai');
chai.use(require('chai-dom'));

describe('Тест компонента LoginPage', () => {
  registerComponent(Button, 'Button');
  registerComponent(InputWithLabel, 'InputWithLabel');

  const authPage = new LoginPage();

  it('Компонент имеет класс login', () => {
    chai.expect(authPage.getContent()).to.have.class('login-page');
  });

  it('Компонент содержит элемент form с классом login-page__wrapper', () => {
    chai.expect(authPage.getContent()?.querySelector('form')).to.have.class('login-page__wrapper');
  });
});
