import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import CartePage from './pages/CartePage';
import SchoolsPage from './pages/SchoolsPage';
import HighlightsPage from './pages/HighlightsPage';
import FeedbackPage from './pages/FeedbackPage';
import HighlightEdit from './pages/HighlightEdit';
import InfoPage from './pages/InfoPage';
import { SchoolProvider } from './contexts/SchoolContext';
import { HighlightsProvider } from './contexts/HighlightsContext';

export default function App() {
  return (
    <>
      <CssBaseline />
      <HighlightsProvider>
        <SchoolProvider>
          <BrowserRouter basename="/">
            <Switch>
              <Route exact path="/" component={CartePage} />
              <Route exact path="/schools" component={SchoolsPage} />
              <Route exact path="/highlights" component={HighlightsPage} />
              <Route exact path="/highlights/edit" component={HighlightEdit} />
              <Route
                exact
                path="/highlights/edit/:highlightId"
                component={HighlightEdit}
              />
              <Route exact path="/info" component={InfoPage} />
              <Route exact path="/feedback" component={FeedbackPage} />
            </Switch>
          </BrowserRouter>
        </SchoolProvider>
      </HighlightsProvider>
    </>
  );
}
