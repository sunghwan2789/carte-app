import * as React from 'react';
import { CssBaseline } from '@material-ui/core';
import { HashRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import CartePage from './CartePage';
import SchoolsPage from './SchoolsPage';

import { observer } from 'mobx-react';
import persistStores from '../stores/persistStores';
import LoadingPage from './LoadingPage';
import InquiryPage from './InquiryPage';

export default observer(() => (
  <React.Fragment>
    <CssBaseline />
    {
      persistStores.isLoading
      ? (
        <LoadingPage />
      ) : (
        <HashRouter>
          <Switch>
            <Route exact path="/" component={CartePage} />
            <Route path="/schools" component={SchoolsPage} />
            <Route path="/inquiry" component={InquiryPage} />
          </Switch>
        </HashRouter>
      )
    }
  </React.Fragment>
))
