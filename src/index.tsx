import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { configure } from 'mobx';
import 'core-js/fn/array/find';
import 'core-js/fn/array/find-index';
import 'core-js/fn/array/from';
import 'url-search-params-polyfill';

configure({
  enforceActions: true,
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
registerServiceWorker();
