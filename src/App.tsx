import { CssBaseline } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HighlightsProvider } from './contexts/HighlightsContext';
import { SchoolProvider } from './contexts/SchoolContext';
import CartePage from './pages/CartePage';
import FeedbackPage from './pages/FeedbackPage';
import HighlightEdit from './pages/HighlightEdit';
import HighlightsPage from './pages/HighlightsPage';
import InfoPage from './pages/InfoPage';
import SchoolsPage from './pages/SchoolsPage';

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
