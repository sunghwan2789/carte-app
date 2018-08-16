import * as React from 'react';
import { CssBaseline } from '@material-ui/core';
import { Switch, Route } from 'react-router';
import CartePage from './CartePage';
import SchoolsPage from './SchoolsPage';

export default () => (
  <React.Fragment>
    <CssBaseline />
    <Switch>
      <Route exact path="/" component={CartePage} />
      <Route path="/schools" component={SchoolsPage} />
    </Switch>
  </React.Fragment>
);
