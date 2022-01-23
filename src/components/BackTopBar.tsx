import { ArrowBack } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import React, { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

type BackTopBarProps = {
  children?: ReactNode
}

export default function BackTopBar({ children }: BackTopBarProps) {
  const navigate = useNavigate()

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton color="inherit" onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        {children}
      </Toolbar>
    </AppBar>
  )
}
