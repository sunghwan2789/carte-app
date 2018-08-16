import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'mobx-react';
import navigationStore from './stores/navigationStore';
import { HashRouter } from 'react-router-dom';

const stores = {
  navigationStore,
}

ReactDOM.render(
  <Provider {...stores}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
