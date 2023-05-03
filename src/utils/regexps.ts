export const REGEXP_LOGIN = '^(?=.{3,20}$)([a-zA-Z0-9_-]*[a-zA-Z_-][a-zA-Z0-9_-]*)$';
export const REGEXP_PASSWORD = '^(?=.*?[A-ZА-ЯЁ])(?=.*?[0-9]).{8,40}$';
export const REGEXP_EMAIL = '^[a-zA-Z0-9_-]+@[a-zA-Z]+.[a-zA-Z]+$';
export const REGEXP_NAME = '^[A-ZА-ЯЁ][a-zA-Zа-яА-ЯёЁ]+$';
export const REGEXP_PHONE = '^\\+?\\d{10,15}$';
export const REGEXP_NICKNAME = '^.*\\S{3,}.*$';
export const REGEXP_MESSAGE = '^.*\\S.*$';
