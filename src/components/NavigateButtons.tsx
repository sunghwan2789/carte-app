import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import React from 'react'

type NavigateButtonsProps = {
  onBackward?: () => void
  onForward?: () => void
}

export default function NavigateButtons({
  onBackward,
  onForward
}: NavigateButtonsProps) {
  return (
    <Box sx={{ marginX: 1, display: 'flex' }}>
      <IconButton
        sx={{ width: 32, height: 32, color: 'inherit' }}
        onClick={onBackward}
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        sx={{ width: 32, height: 32, color: 'inherit' }}
        onClick={onForward}
      >
        <ChevronRight />
      </IconButton>
    </Box>
  )
}
