require.extensions['.less'] = function () {
  return null;
};

// eslint-disable-next-line import/no-extraneous-dependencies
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const { window } = new JSDOM('<div id="app"></div>', { url: 'http://localhost' });
const { document } = window;
global.window = window;
global.document = document;
