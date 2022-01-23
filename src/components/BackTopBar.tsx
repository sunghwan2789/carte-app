import { ArrowBack } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import React, { ReactNode } from 'react'
import { useHistory } from 'react-router-dom'

type BackTopBarProps = {
  children?: ReactNode
}

export default function BackTopBar({ children }: BackTopBarProps) {
  const { goBack } = useHistory()

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton color="inherit" onClick={goBack}>
          <ArrowBack />
        </IconButton>
        {children}
      </Toolbar>
    </AppBar>
  )
}
