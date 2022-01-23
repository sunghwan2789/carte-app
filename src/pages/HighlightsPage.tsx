import { Add, Delete } from '@mui/icons-material'
import {
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BackTopBar from '../components/BackTopBar'
import { useHighlights } from '../contexts/HighlightsContext'

export default function HighlightsPage() {
  const [highlights, dispatch] = useHighlights()
  const navigate = useNavigate()

  return (
    <>
      <BackTopBar>
        <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
          하이라이트
        </Typography>
      </BackTopBar>
      <main>
        <List
          sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
        >
          {highlights.map((highlight) => (
            <ListItem
              button
              divider
              key={highlight.id}
              onClick={() => navigate(`edit/${highlight.id}`)}
            >
              <ListItemText
                primary={<span style={highlight.style}>{highlight.name}</span>}
                secondary={highlight.words.join(', ')}
              />
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => dispatch({ type: 'DELETE', highlight })}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </main>
      <Fab
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          marginBottom: 2,
          marginRight: 2
        }}
        color="secondary"
        onClick={() => navigate('edit')}
      >
        <Add />
      </Fab>
    </>
  )
}
