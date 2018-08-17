import * as React from 'react';
import { CssBaseline } from '@material-ui/core';
import { HashRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import CartePage from './CartePage';
import SchoolsPage from './SchoolsPage';

import { observer } from 'mobx-react';
import persistStores from '../stores/persistStores';
import LoadingPage from './LoadingPage';

export default observer(() => (
  <CssBaseline>
    {
      persistStores.isLoading
      ? (
        <LoadingPage />
      ) : (
        <HashRouter>
          <Switch>
            <Route exact path="/" component={CartePage} />
            <Route path="/schools" component={SchoolsPage} />
          </Switch>
        </HashRouter>
      )
    }
  </CssBaseline>
))
