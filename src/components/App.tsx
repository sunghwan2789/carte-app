import * as React from 'react';
import { CssBaseline } from '@material-ui/core';
import { Switch, Route } from 'react-router';
import { HashRouter } from 'react-router-dom';
import CartePage from './CartePage';

export default () =>
<HashRouter>
  <React.Fragment>
    <CssBaseline />
    <Switch>
      <Route path="/" component={CartePage} />
    </Switch>
  </React.Fragment>
</HashRouter>;
