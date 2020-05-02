import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useHighlights } from '../contexts/HighlightsContext';
import BackTopBar from '../components/BackTopBar';

const useStyles = makeStyles((theme) => createStyles({
  list: {
    backgroundColor: theme.palette.background.paper,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function HighlightsPage() {
  const [highlights, dispatch] = useHighlights();
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <BackTopBar>
        <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
          하이라이트
        </Typography>
      </BackTopBar>
      <main>
        <List className={classes.list}>
          {highlights!.map((highlight) => (
            <ListItem
              button
              divider
              key={highlight.id}
              onClick={() => history.push(`/highlights/edit/${highlight.id}`)}
            >
              <ListItemText
                primary={<span style={highlight.style}>{highlight.name}</span>}
                secondary={highlight.words.join(', ')}
              />
              <ListItemSecondaryAction>
                <IconButton onClick={() => dispatch({ type: 'DELETE', highlight })}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </main>
      <Fab
        className={classes.fab}
        color="secondary"
        onClick={() => history.push('/highlights/edit')}
      >
        <Add />
      </Fab>
    </>
  );
}
