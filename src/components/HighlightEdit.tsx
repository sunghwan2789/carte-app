import * as React from 'react';
import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import { RouteComponentProps, withRouter } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Done from '@material-ui/icons/Done';
import Typography from '@material-ui/core/Typography';
import Highlight from '../models/Highlight';
import highlightStore from '../stores/highlightStore';

const styles = (theme: Theme) => createStyles({
  list: {
    backgroundColor: theme.palette.background.paper,
  },
});

class HighlightEdit extends React.Component<RouteComponentProps<any> & WithStyles<typeof styles>> {

  entity: Highlight = highlightStore.find(this.props.match.params.id)!;

  handleSave = () => {

  }

  render() {
    return (
      <form onSubmit={this.handleSave}>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton color="inherit" onClick={this.props.history.goBack}>
              <ArrowBack />
            </IconButton>
            <Typography variant="title" color="inherit" style={{flexGrow:1}}></Typography>
            <IconButton color="inherit" type="submit">
              <Done />
            </IconButton>
          </Toolbar>
        </AppBar>
        <main>

        </main>
      </form>
    );
  }
}

export default withStyles(styles)(withRouter(HighlightEdit));
