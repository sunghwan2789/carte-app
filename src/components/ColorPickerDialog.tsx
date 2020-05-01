import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useState } from 'react';
import { ColorResult, CompactPicker } from 'react-color';

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
        <Button onClick={handleCancel} color="secondary">
          취소
        </Button>
        <Button onClick={handleOk} color="primary">
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}
