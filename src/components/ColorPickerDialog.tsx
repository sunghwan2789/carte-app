import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { CompactPicker, ColorResult } from 'react-color';
import { DialogProps } from '@material-ui/core/Dialog';

type ColorPickDialogProps = {
  title?: string;
  handleClose: (value?: string) => void;
};

export default function ColorPickDialog({
  title,
  handleClose,
  ...props
}: ColorPickDialogProps & DialogProps) {
  const [color, setColor] = useState<string>();

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
        <CompactPicker color={color} onChangeComplete={handleChange} />
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
