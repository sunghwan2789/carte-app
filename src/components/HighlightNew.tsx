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
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import { List, ListItem, ListSubheader, Divider, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';

const styles = (theme: Theme) => createStyles({
  list: {
    backgroundColor: theme.palette.background.paper,
  },
});

@observer
class HighlightNew extends React.Component<RouteComponentProps<any> & WithStyles<typeof styles>> {
  @observable
  name: string

  @observable
  words: string[] = []

  @observable
  backgroundColor?: string

  @observable
  color?: string

  @observable
  fontWeight?: any

  get style(): React.CSSProperties {
    let ret: React.CSSProperties = {};
    this.backgroundColor && (ret.backgroundColor = this.backgroundColor);
    this.color && (ret.color = this.color);
    this.fontWeight && (ret.fontWeight = this.fontWeight);
    return ret;
  }

  handleSave = () => {
    let item = new Highlight();
    item.name = this.name;
    item.words = this.words;
    item.style = this.style;
    highlightStore.add(item);
  }

  @action
  toggleBold = () => {
    this.fontWeight = !this.fontWeight ? 'bold' : undefined;
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
        <List>
          <ListItem>
            <TextField label="이름" fullWidth />
          </ListItem>
          <ListItem divider>
            <TextField label="단어" multiline fullWidth />
          </ListItem>
        </List>
        <List subheader={<ListSubheader disableSticky>스타일</ListSubheader>}>
          <ListItem>
            <ListItemText primary="미리보기" primaryTypographyProps={{ style: this.style }} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="배경색" secondary={this.backgroundColor} />
            <ListItemSecondaryAction>
              <Switch checked={!!this.backgroundColor} />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem button>
            <ListItemText primary="글자색" secondary={this.color} />
            <ListItemSecondaryAction>
              <Switch checked={!!this.color} />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem button onClick={this.toggleBold}>
            <ListItemText primary="굵게" />
            <ListItemSecondaryAction>
              <Switch checked={this.fontWeight === 'bold'}
                onClick={this.toggleBold} />
            </ListItemSecondaryAction>
          </ListItem>
        </List>

      </form>
    );
  }
}

export default withStyles(styles)(withRouter(HighlightNew));
