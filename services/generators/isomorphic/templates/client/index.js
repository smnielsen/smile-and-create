import render from './client';
import logger from '../lib/logger';

const debug = logger('index');

render();

if (module.hot) {
  module.hot.accept('./client', () => {
    debug('Accepting the updated App module!');
    render();
  });
}