import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CartePage from './pages/CartePage';
import SchoolsPage from './pages/SchoolsPage';
import HighlightsPage from './pages/HighlightsPage';
import FeedbackPage from './pages/FeedbackPage';
import HighlightNew from './pages/HighlightNew';
import HighlightEdit from './pages/HighlightEdit';
import InfoPage from './pages/InfoPage';
import { CssBaseline } from '@material-ui/core';

export default function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter basename="/">
        <Switch>
          {/* <Route exact path="/" component={CartePage} />
        <Route exact path="/schools" component={SchoolsPage} />
        <Route exact path="/highlights" component={HighlightsPage} />
        <Route exact path="/highlights/new" component={HighlightNew} />
        <Route exact path="/highlights/:id/edit" component={HighlightEdit} /> */}
          <Route exact path="/info" component={InfoPage} />
          {/* <Route exact path="/feedback" component={FeedbackPage} /> */}
        </Switch>
      </BrowserRouter>
    </>
  );
}
