import * as React from 'react';
import { IconButton } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

const styles = createStyles({
  root: {
    marginLeft: 8,
    marginRight: 8,
  },
  btn: {
    width: 32,
    height: 32,
    color: "inherit",
  },
});

interface IProps extends WithStyles<typeof styles> {
  handleBackward?: () => void;
  handleForward?: () => void;
}

class NavigateButtons extends React.Component<IProps> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <IconButton className={classes.btn}
          onClick={this.props.handleBackward}>
          <ChevronLeft />
        </IconButton>
        <IconButton className={classes.btn}
          onClick={this.props.handleForward}>
          <ChevronRight />
        </IconButton>
      </div>
    );
  }
}

export default withStyles(styles)(NavigateButtons);
