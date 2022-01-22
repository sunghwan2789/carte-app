import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import React from 'react';

type NavigateButtonsProps = {
  handleBackward?: () => void;
  handleForward?: () => void;
};

export default function NavigateButtons({
  handleBackward,
  handleForward,
}: NavigateButtonsProps) {
  return (
    <Box sx={{ marginX: 1, display: 'flex' }}>
      <IconButton sx={{ width: 32, height: 32, color: 'inherit' }} onClick={handleBackward}>
        <ChevronLeft />
      </IconButton>
      <IconButton sx={{ width: 32, height: 32, color: 'inherit' }} onClick={handleForward}>
        <ChevronRight />
      </IconButton>
    </Box>
  );
}
