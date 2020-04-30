import React, { useState, useMemo } from 'react';
import {
  WithStyles,
  Theme,
  createStyles,
  withStyles,
  makeStyles,
} from '@material-ui/core/styles';
import { RouteComponentProps, withRouter, useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Done from '@material-ui/icons/Done';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { CompactPicker, ColorResult } from 'react-color';
import { DialogProps } from '@material-ui/core/Dialog';
import { useHighlights } from '../contexts/HighlightsContext';

type ColorPickDialogProps = {
  title: string;
  name: string;
  handleClose: (value?: string) => void;
};

function ColorPickDialog({
  title,
  name,
  handleClose,
  ...props
}: ColorPickDialogProps & DialogProps) {
  const [color, setColor] = useState('');

  function handleChange(color: ColorResult) {
    setColor(color.hex);
  }

  function handleCancel() {
    handleClose();
  }

  function handleOk() {
    handleClose(color);
  }

  return (
    <Dialog {...props}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <CompactPicker onChangeComplete={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          취소
        </Button>
        <Button onClick={handleOk} color="primary">
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function HighlightNew() {
  const [_, dispatch] = useHighlights();
  const [name, setName] = useState('');
  const [words, setWords] = useState<string[]>([]);
  const [style, setStyle] = useState<React.CSSProperties>();
  const history = useHistory();
  const [colorPickerTitle, setColorPickerTitle] = useState('');
  const [colorPickerName, setColorPickerName] = useState('');
  const [isColorPickerPicking, setIsColorPickerPicking] = useState(false);
  const classes = useStyles();

  function handleSave(e: any) {
    e.preventDefault();
    dispatch({
      type: 'CREATE',
      highlight: {
        name,
        words,
        style,
      },
    });
    history.goBack();
  }

  function toggleBold() {
    if (style?.fontWeight) {
      const { fontWeight, ...newStyle } = style;
      setStyle(newStyle);
    } else {
      setStyle({ ...style, fontWeight: 'bold' });
    }
  }

  function pickColor(title: string, name: string) {
    setColorPickerTitle(title);
    setColorPickerName(name);
    setIsColorPickerPicking(true);
  }

  function handleColorChange(color?: string) {
    setIsColorPickerPicking(false);
    if (color) {
      setStyle({ ...style, [colorPickerName]: color });
    }
  }

  function toggleBackgroundColor() {
    if (style?.backgroundColor) {
      const { backgroundColor, ...newStyle } = style;
      setStyle(newStyle);
    }
  }

  function toggleColor() {
    if (style?.color) {
      const { color, ...newStyle } = style;
      setStyle(newStyle);
    }
  }

  return (
    <form onSubmit={handleSave}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton color="inherit" onClick={history.goBack}>
            <ArrowBack />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            style={{ flexGrow: 1 }}
          ></Typography>
          <IconButton color="inherit" type="submit">
            <Done />
          </IconButton>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem>
          <TextField
            name="name"
            label="이름"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </ListItem>
        <ListItem>
          <TextField
            name="words"
            label="단어"
            helperText="줄바꿈으로 여러 단어를 사용할 수 있습니다."
            multiline
            fullWidth
            value={words}
            onChange={(e) =>
              setWords(
                e.target.value
                  .split('\n')
                  .map((i: string) => i.trim())
                  .filter((i: string) => i.length)
              )
            }
          />
        </ListItem>
        <Divider />
      </List>
      <List subheader={<ListSubheader disableSticky>스타일</ListSubheader>}>
        <ListItem>
          <ListItemText primary={<span style={style}>미리보기</span>} />
        </ListItem>
        <ListItem
          button
          onClick={() => pickColor('배경색 선택', 'backgroundColor')}
        >
          <ListItemText primary="배경색" secondary={style?.backgroundColor} />
          <ListItemSecondaryAction>
            <Switch
              checked={!!style?.backgroundColor}
              onClick={() =>
                !style?.backgroundColor
                  ? pickColor('배경색 선택', 'backgroundColor')
                  : toggleBackgroundColor()
              }
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button onClick={() => pickColor('글자색 선택', 'color')}>
          <ListItemText primary="글자색" secondary={style?.color} />
          <ListItemSecondaryAction>
            <Switch
              checked={!!style?.color}
              onClick={() =>
                !style?.color
                  ? pickColor('글자색 선택', 'color')
                  : toggleColor()
              }
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button onClick={toggleBold}>
          <ListItemText primary="굵게" />
          <ListItemSecondaryAction>
            <Switch
              checked={style?.fontWeight === 'bold'}
              onClick={toggleBold}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <ColorPickDialog
        open={isColorPickerPicking}
        title={colorPickerTitle}
        name={colorPickerName}
        handleClose={handleColorChange}
      />
    </form>
  );
}

const useStyles = makeStyles((theme) =>
  createStyles({
    list: {
      backgroundColor: theme.palette.background.paper,
    },
  })
);
