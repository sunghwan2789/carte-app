import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import CartePage from './CartePage';
import SchoolsPage from './SchoolsPage';

import { observer } from 'mobx-react';
import persistStores from '../stores/persistStores';
import LoadingPage from './LoadingPage';
import HighlightsPage from './HighlightsPage';
import FeedbackPage from './FeedbackPage';
import InfoPage from './InfoPage';
import HighlightNew from './HighlightNew';
import HighlightEdit from './HighlightEdit';

export default observer(() => (
  <React.Fragment>
    <CssBaseline />
    {
      persistStores.isLoading
      ? (
        <LoadingPage />
      ) : (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path="/" component={CartePage} />
            <Route exact path="/schools" component={SchoolsPage} />
            <Route exact path="/highlights" component={HighlightsPage} />
            <Route exact path="/highlights/new" component={HighlightNew} />
            <Route exact path="/highlights/:id/edit" component={HighlightEdit} />
            <Route exact path="/info" component={InfoPage} />
            <Route exact path="/feedback" component={FeedbackPage} />
          </Switch>
        </BrowserRouter>
      )
    }
  </React.Fragment>
))
