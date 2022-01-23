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
  open: DialogProps['open']
  title?: string
  onClose?: (value?: string) => void
}

export default function ColorPickDialog({
  open,
  title,
  onClose
}: ColorPickDialogProps) {
  const [color, setColor] = useState<string>()

  function handleChange(newColor: ColorResult) {
    setColor(newColor.hex)
  }

  function handleCancel() {
    onClose?.()
  }

  function handleOk() {
    onClose?.(color)
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
