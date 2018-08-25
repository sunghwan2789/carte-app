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
import { List, ListItem, ListSubheader, Divider, ListItemSecondaryAction, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import { CompactPicker, ColorResult } from 'react-color';
import { DialogProps } from '@material-ui/core/Dialog';

interface IColorPickDialogProps {
  title: string
  name: string
  handleClose: (value?: string) => void
}

class ColorPickDialog extends React.Component<IColorPickDialogProps & DialogProps> {
  value: string

  handleChange = (color: ColorResult) => {
    this.value = color.hex;
  }

  handleCancel = () => {
    this.props.handleClose();
  }

  handleOk = () => {
    this.props.handleClose(this.value);
  }

  render() {
    const { title, name, ...other } = this.props;

    return (
      <Dialog {...other}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent><CompactPicker onChangeComplete={this.handleChange} /></DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">취소</Button>
          <Button onClick={this.handleOk} color="primary">확인</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

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

  handleSave = (e: any) => {
    e.preventDefault();
    let item = new Highlight();
    item.name = e.target.name.value;
    item.words = e.target.words.value.split('\n').map((i: string) => i.trim()).filter((i: string) => i.length);
    item.style = this.style;
    highlightStore.add(item);
    this.props.history.goBack();
  }

  @action
  toggleBold = () => {
    this.fontWeight = !this.fontWeight ? 'bold' : undefined;
  }

  @observable
  colorPickerTitle: string
  @observable
  colorPickerName: string
  @observable
  colorPickerPicking: boolean = false

  @action
  pickColor(title: string, name: string) {
    this.colorPickerPicking = true;
    this.colorPickerTitle = title;
    this.colorPickerName = name;
  }

  @action
  handleColorChange = (color?: string) => {
    this.colorPickerPicking = false;
    if (typeof color === 'undefined') {
      return;
    }

    switch (this.colorPickerName) {
      case 'backgroundColor':
        this.backgroundColor = color;
        break;
      case 'color':
        this.color = color;
        break;
    }
  }

  @action
  toggleBackgroundColor = () => {
    if (this.backgroundColor) {
      this.backgroundColor = undefined;
    }
  }

  @action
  toggleColor = () => {
    if (this.color) {
      this.color = undefined;
    }
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
            <TextField name="name" label="이름" fullWidth />
          </ListItem>
          <ListItem divider>
            <TextField name="words" label="단어" multiline fullWidth />
          </ListItem>
        </List>
        <List subheader={<ListSubheader disableSticky>스타일</ListSubheader>}>
          <ListItem>
            <ListItemText primary="미리보기" primaryTypographyProps={{ style: { ...this.style, display: 'inline' } }} />
          </ListItem>
          <ListItem button onClick={() => this.pickColor('배경색 선택', 'backgroundColor')}>
            <ListItemText primary="배경색" secondary={this.backgroundColor} />
            <ListItemSecondaryAction>
              <Switch checked={!!this.backgroundColor}
                onClick={() => !this.backgroundColor ? this.pickColor('배경색 선택', 'backgroundColor') : this.toggleBackgroundColor()}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem button onClick={() => this.pickColor('글자색 선택', 'color')}>
            <ListItemText primary="글자색" secondary={this.color} />
            <ListItemSecondaryAction>
              <Switch checked={!!this.color}
                onClick={() => !this.color ? this.pickColor('글자색 선택', 'color') : this.toggleColor()}
              />
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
        <ColorPickDialog
          open={this.colorPickerPicking}
          title={this.colorPickerTitle}
          name={this.colorPickerName}
          handleClose={this.handleColorChange}
        />
      </form>
    );
  }
}

export default withStyles(styles)(withRouter(HighlightNew));
