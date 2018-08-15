import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles, createStyles, Theme } from '@material-ui/core';
import DateNavigator from './DateNavigator';
import DateState from '../stores/DateState';
import { observable } from 'mobx';

const styles = (theme: Theme) => createStyles({
  appBarSpacer: theme.mixins.toolbar,
});

const App = withStyles(styles)(({ classes }) =>
  <React.Fragment>
    <CssBaseline />
    <AppBar position="fixed">
      <Toolbar disableGutters>
        <DateNavigator />
      </Toolbar>
    </AppBar>
    <main>
      <div className={classes.appBarSpacer}></div>
      <Button variant="contained" color="primary">OK</Button>
    </main>
  </React.Fragment>
);

export default App;
