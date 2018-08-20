import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { HashRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import CartePage from './CartePage';
import SchoolsPage from './SchoolsPage';

import { observer } from 'mobx-react';
import persistStores from '../stores/persistStores';
import LoadingPage from './LoadingPage';
import FeedbackPage from './FeedbackPage';
import InfoPage from './InfoPage';

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
            <Route path="/info" component={InfoPage} />
            <Route path="/feedback" component={FeedbackPage} />
          </Switch>
        </HashRouter>
      )
    }
  </React.Fragment>
))
