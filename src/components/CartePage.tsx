import * as React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import NavigatorContainer from '../containers/NavigatorContainer';

export default class CartePage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AppBar position="sticky">
          <Toolbar disableGutters>
            <NavigatorContainer />
          </Toolbar>
        </AppBar>
        <main>
          <Button variant="contained" color="primary">OK</Button>
        </main>
      </React.Fragment>
    );
  }
}
