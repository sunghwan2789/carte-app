import * as React from 'react';
import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import { RouteComponentProps, withRouter } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import Highlight from '../models/Highlight';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Delete from '@material-ui/icons/Delete';

const styles = (theme: Theme) => createStyles({
  list: {
    backgroundColor: theme.palette.background.paper,
  },
});

class HighlightsPage extends React.Component<RouteComponentProps<any> & WithStyles<typeof styles>> {
  render() {
    let hi = new Highlight();
    hi.name = '가리는 거';
    hi.words = ['오징어', '가지'];
    hi.style = { color: 'red', backgroundColor: '#f99' };
    const { classes } = this.props;
    return (
      <React.Fragment>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton color="inherit" onClick={this.props.history.goBack}>
              <ArrowBack />
            </IconButton>
            <Typography variant="title" color="inherit" style={{flexGrow:1}}>하이라이트</Typography>
          </Toolbar>
        </AppBar>
        <main>
          <List className={classes.list}>
            <ListItem button divider>
              <ListItemText primary={hi.name} secondary={hi.words.join(', ')}
                primaryTypographyProps={{ style: {...hi.style, display: 'inline' } }} />
              <ListItemSecondaryAction>
                <IconButton>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(HighlightsPage));
