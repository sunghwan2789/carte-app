import React, { useState, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
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
import { useHighlights } from '../contexts/HighlightsContext';
import ColorPickDialog from '../components/ColorPickerDialog';

export default function HighlightEdit() {
  const { highlightId } = useParams();
  const [highlights, dispatch] = useHighlights();
  const highlight = useMemo(
    () => highlights?.find((highlight) => highlight.id === highlightId),
    [highlightId, highlights],
  );

  const [name, setName] = useState(highlight?.name);
  const [words, setWords] = useState(highlight?.words ?? []);
  const [style, setStyle] = useState(highlight?.style as React.CSSProperties);
  const history = useHistory();
  const [colorPickerTitle, setColorPickerTitle] = useState<string>();
  const [colorPickerName, setColorPickerName] = useState<string>();

  function handleSave(e: any) {
    e.preventDefault();
    if (!highlight) {
      dispatch({
        type: 'CREATE',
        highlight: {
          name,
          words,
          style,
        },
      });
    } else {
      dispatch({
        type: 'UPDATE',
        highlight: {
          ...highlight,
          name,
          words,
          style,
        },
      });
    }
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
  }

  function handleColorChange(color?: string) {
    if (color) {
      setStyle({ ...style, [colorPickerName!]: color });
    }
    setColorPickerName(undefined);
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
            value={words.join('\n')}
            onChange={(e) =>
              setWords(
                e.target.value
                  .split('\n')
                  .map((word) => word.trim())
                  .filter(Boolean),
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
              checked={Boolean(style?.backgroundColor)}
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
              checked={Boolean(style?.color)}
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
        open={Boolean(colorPickerName)}
        title={colorPickerTitle}
        handleClose={handleColorChange}
      />
    </form>
  );
}
