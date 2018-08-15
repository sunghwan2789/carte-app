import * as React from 'react';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';

const styles = createStyles({
  small: {
    width: 32,
    height: 32,
    '& svg': {
      fontSize: 18,
    },
  },
  medium: {
    width: 48,
    height: 48,
    '& svg': {
      fontSize: 24,
    },
  },
  large: {
    width: 64,
    height: 64,
    '& svg': {
      fontSize: 32,
    },
  },
});

interface IProps extends WithStyles<typeof styles> {
  size: 'small' | 'medium' | 'large',
}

const ResizableIconButton = withStyles(styles)<IconButtonProps & IProps>(({ classes, size, ...props }) => (
  <IconButton
    className={classes[size]}
    {...props}
  />
));

export default ResizableIconButton;
