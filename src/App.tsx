import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import React from 'react'
import { useRoutes } from 'react-router-dom'
import { HighlightsProvider } from './contexts/HighlightsContext'
import CartePage from './pages/CartePage'
import FeedbackPage from './pages/FeedbackPage'
import HighlightEdit from './pages/HighlightEdit'
import HighlightsPage from './pages/HighlightsPage'
import InfoPage from './pages/InfoPage'
import SchoolsPage from './pages/SchoolsPage'

const theme = createTheme()

export default function App() {
  const routes = useRoutes([
    { index: true, element: <CartePage /> },
    { path: 'schools', element: <SchoolsPage /> },
    {
      path: 'highlights',
      children: [
        { index: true, element: <HighlightsPage /> },
        { path: 'edit', element: <HighlightEdit /> },
        { path: 'edit/:id', element: <HighlightEdit /> }
      ]
    },
    { path: 'info', element: <InfoPage /> },
    { path: 'feedback', element: <FeedbackPage /> }
  ])

  return (
    <ThemeProvider theme={theme}>
      <HighlightsProvider>
        <CssBaseline />
        {routes}
      </HighlightsProvider>
    </ThemeProvider>
  )
}
