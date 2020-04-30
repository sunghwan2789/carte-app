import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginLeft: 8,
      marginRight: 8,
      display: 'flex',
    },
    btn: {
      width: 32,
      height: 32,
      padding: '0 12px',
      color: 'inherit',
    },
  }),
);

type NavigateButtonsProps = {
  handleBackward?: () => void;
  handleForward?: () => void;
};

export default function NavigateButtons({
  handleBackward,
  handleForward,
}: NavigateButtonsProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton className={classes.btn} onClick={handleBackward}>
        <ChevronLeft />
      </IconButton>
      <IconButton className={classes.btn} onClick={handleForward}>
        <ChevronRight />
      </IconButton>
    </div>
  );
}
