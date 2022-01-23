import { Done } from '@mui/icons-material'
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Switch,
  TextField,
  Typography
} from '@mui/material'
import React, { useMemo, useReducer } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackTopBar from '../components/BackTopBar'
import ColorPickerDialog from '../components/ColorPickerDialog'
import { useHighlight } from '../contexts/HighlightsContext'

type EditState = {
  name?: string
  words: string[]
  style: React.CSSProperties
  colorPickerTarget?: 'backgroundColor' | 'color'
}
type EditAction =
  | { type: 'SET_NAME'; name: string }
  | { type: 'SET_WORDS'; words: string }
  | { type: 'TOGGLE_FONT_WEIGHT_BOLD' }
  | { type: 'TOGGLE_BACKGROUND_COLOR'; forceSet?: boolean }
  | { type: 'TOGGLE_COLOR'; forceSet?: boolean }
  | { type: 'SET_COLORPICKER_RESULT'; color?: string }

function reducer(state: EditState, action: EditAction): EditState {
  switch (action.type) {
    case 'SET_NAME': {
      const { name } = action

      return { ...state, name }
    }
    case 'SET_WORDS': {
      const { words } = action

      return { ...state, words: words.split('\n') }
    }
    case 'TOGGLE_FONT_WEIGHT_BOLD': {
      const { fontWeight, ...style } = state.style

      if (!fontWeight) {
        return {
          ...state,
          style: {
            ...style,
            fontWeight: 'bold'
          }
        }
      }

      return { ...state, style }
    }
    case 'TOGGLE_BACKGROUND_COLOR': {
      const { backgroundColor, ...style } = state.style

      if (action.forceSet || !backgroundColor) {
        return { ...state, colorPickerTarget: 'backgroundColor' }
      }

      return { ...state, style }
    }
    case 'TOGGLE_COLOR': {
      const { color, ...style } = state.style

      if (action.forceSet || !color) {
        return { ...state, colorPickerTarget: 'color' }
      }

      return { ...state, style }
    }
    case 'SET_COLORPICKER_RESULT': {
      const { style, colorPickerTarget, ...newState } = state
      const { color } = action

      if (!colorPickerTarget) {
        throw new Error('ColorPickerTarget not set')
      }

      if (!color) {
        return { ...newState, style }
      }

      return { ...newState, style: { ...style, [colorPickerTarget]: color } }
    }
    default: {
      throw new Error('Unhandled action type')
    }
  }
}

export default function HighlightEdit() {
  const { id } = useParams()
  const [highlight, dispatchHighlight] = useHighlight(id)

  const [{ name, words, style, colorPickerTarget }, dispatch] = useReducer(
    reducer,
    {
      name: highlight?.name,
      words: highlight?.words ?? [],
      style: highlight?.style ?? {}
    }
  )

  const colorPickerTitle = useMemo(() => {
    switch (colorPickerTarget) {
      case 'backgroundColor': {
        return '배경색 선택'
      }
      case 'color': {
        return '글자색 선택'
      }
      default: {
        return colorPickerTarget
      }
    }
  }, [colorPickerTarget])

  const navigate = useNavigate()

  function handleSave(e: any) {
    e.preventDefault()
    if (!highlight) {
      dispatchHighlight({
        type: 'CREATE',
        highlight: {
          name,
          words,
          style
        }
      })
    } else {
      dispatchHighlight({
        type: 'UPDATE',
        highlight: {
          ...highlight,
          name,
          words,
          style
        }
      })
    }
    navigate(-1)
  }

  return (
    <form onSubmit={handleSave}>
      <BackTopBar>
        <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }} />
        <IconButton color="inherit" type="submit">
          <Done />
        </IconButton>
      </BackTopBar>
      <List>
        <ListItem>
          <TextField
            variant="standard"
            name="name"
            label="이름"
            fullWidth
            value={name}
            onChange={(e) =>
              dispatch({ type: 'SET_NAME', name: e.target.value })
            }
          />
        </ListItem>
        <ListItem>
          <TextField
            variant="standard"
            name="words"
            label="단어"
            helperText="줄바꿈으로 여러 단어를 사용할 수 있습니다."
            multiline
            fullWidth
            value={words.join('\n')}
            onChange={(e) =>
              dispatch({ type: 'SET_WORDS', words: e.target.value })
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
          onClick={() =>
            dispatch({ type: 'TOGGLE_BACKGROUND_COLOR', forceSet: true })
          }
        >
          <ListItemText primary="배경색" secondary={style.backgroundColor} />
          <ListItemSecondaryAction>
            <Switch
              checked={Boolean(style.backgroundColor)}
              onClick={() => dispatch({ type: 'TOGGLE_BACKGROUND_COLOR' })}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem
          button
          onClick={() => dispatch({ type: 'TOGGLE_COLOR', forceSet: true })}
        >
          <ListItemText primary="글자색" secondary={style.color} />
          <ListItemSecondaryAction>
            <Switch
              checked={Boolean(style.color)}
              onClick={() => dispatch({ type: 'TOGGLE_COLOR' })}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem
          button
          onClick={() => dispatch({ type: 'TOGGLE_FONT_WEIGHT_BOLD' })}
        >
          <ListItemText primary="굵게" />
          <ListItemSecondaryAction>
            <Switch
              checked={Boolean(style.fontWeight)}
              onClick={() => dispatch({ type: 'TOGGLE_FONT_WEIGHT_BOLD' })}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <ColorPickerDialog
        open={Boolean(colorPickerTarget)}
        title={colorPickerTitle}
        handleClose={(color) =>
          dispatch({ type: 'SET_COLORPICKER_RESULT', color })
        }
      />
    </form>
  )
}
