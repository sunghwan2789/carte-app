import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle
} from '@mui/material'
import React, { useState } from 'react'
import { ColorResult, CompactPicker } from 'react-color'

type ColorPickDialogProps = {
  title?: string
  handleClose: (value?: string) => void
}

export default function ColorPickDialog({
  title,
  handleClose,
  open
}: ColorPickDialogProps & DialogProps) {
  const [color, setColor] = useState<string>()

  function handleChange(newColor: ColorResult) {
    setColor(newColor.hex)
  }

  function handleCancel() {
    handleClose()
  }

  function handleOk() {
    handleClose(color)
  }

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <CompactPicker color={color} onChangeComplete={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="secondary">
          취소
        </Button>
        <Button onClick={handleOk} color="primary">
          확인
        </Button>
      </DialogActions>
    </Dialog>
  )
}
