// eslint-disable-next-line import/no-extraneous-dependencies
import { expect } from 'chai';
// eslint-disable-next-line import/no-extraneous-dependencies
import { beforeEach } from 'mocha';
import Router from './Router';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

const router = new Router();

describe('Проверяем Router.ts', () => {
  beforeEach(() => {
    router.use('/root', LoginPage).use('/root/reg', RegisterPage);
    router.start();
  });

  it('Начальная инициализация работает', () => {
    expect(window.location.pathname).to.eq('/');
  });

  it('Метод router.go работает', () => {
    router.go('/reg');
    expect(window.location.pathname).to.eq('/reg');
  });
});
