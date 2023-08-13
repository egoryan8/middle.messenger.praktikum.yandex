// eslint-disable-next-line import/no-extraneous-dependencies
import { expect } from 'chai';
import { REGEXP_LOGIN } from './regexps';
import { validateInput } from './validation';

// eslint-disable-next-line import/no-extraneous-dependencies
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

describe('Проверка функции валидации', () => {
  it('Валидация должна проходить, ожидаем validationOK true', () => {
    global.document = new JSDOM('<input id="login-auth" value="Alex" />').window.document;
    expect(validateInput('login-auth', REGEXP_LOGIN).validationOK).to.be.equal(true);
  });

  it('Валидация не должна проходить, ожидаем validationOK false', () => {
    global.document = new JSDOM('<input id="login-auth" value="A" />').window.document;
    expect(validateInput('login-auth', REGEXP_LOGIN).validationOK).to.be.equal(false);
  });

  it('В объекте возвращаемого значения долно быть поле inputValue', () => {
    global.document = new JSDOM('<input id="login-auth" value="some value" />').window.document;
    expect(validateInput('login-auth', REGEXP_LOGIN).inputValue).to.be.equal('some value');
  });

  it('В объекте возвращаемого значения долно быть поле inputName', () => {
    global.document = new JSDOM('<input id="login-auth" value="some value" name="input_name"/>').window.document;
    expect(validateInput('login-auth', REGEXP_LOGIN).inputName).to.be.equal('input_name');
  });
});
