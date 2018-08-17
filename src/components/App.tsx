import * as React from 'react';
import { CssBaseline } from '@material-ui/core';
import { Switch, Route } from 'react-router';
import CartePage from './CartePage';
import SchoolsPage from './SchoolsPage';

import persistStores from '../stores/persistStores';
import { observer } from 'mobx-react';
import LoadingPage from './LoadingPage';

export default observer(() => (
  <React.Fragment>
    <CssBaseline />
    {
      persistStores.isLoading
      ? (
        <LoadingPage />
      ) : (
        <Switch>
          <Route exact path="/" component={CartePage} />
          <Route path="/schools" component={SchoolsPage} />
        </Switch>
      )
    }
  </React.Fragment>
));
