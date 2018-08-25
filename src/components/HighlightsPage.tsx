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
import highlightStore from '../stores/highlightStore';
import { Button } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import { observer } from 'mobx-react';

const styles = (theme: Theme) => createStyles({
  list: {
    backgroundColor: theme.palette.background.paper,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  }
});

@observer
class HighlightsPage extends React.Component<RouteComponentProps<any> & WithStyles<typeof styles>> {

  deleteHighlight(highlight: Highlight) {
    highlightStore.delete(highlight);
  }

  render() {
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
            {highlightStore.highlights.map(i => (
              <ListItem button divider key={i.id}
                onClick={() => this.props.history.push(`/highlights/${i.id}/edit`)}
              >
                <ListItemText primary={i.name} secondary={i.words.join(', ')}
                  primaryTypographyProps={{ style: {...i.style, display: 'inline' } }} />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => this.deleteHighlight(i)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </main>
        <Button variant="fab" className={classes.fab} color="secondary"
          onClick={() => this.props.history.push('/highlights/new')}
        >
          <Add />
        </Button>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(HighlightsPage));
