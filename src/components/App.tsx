import * as React from 'react';
import { CssBaseline } from '@material-ui/core';
import { Switch, Route } from 'react-router';
import CartePage from './CartePage';

export default () => (
  <React.Fragment>
    <CssBaseline />
    <Switch>
      <Route path="/" component={CartePage} />
    </Switch>
  </React.Fragment>
);
