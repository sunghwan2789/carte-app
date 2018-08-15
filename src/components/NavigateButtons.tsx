import * as React from 'react';
import { IconButton } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

const styles = createStyles({
  navigator: {
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
      <React.Fragment>
        <IconButton className={classes.navigator}
          onClick={this.props.handleBackward}>
          <ChevronLeft />
        </IconButton>
        <IconButton className={classes.navigator}
          onClick={this.props.handleForward}>
          <ChevronRight />
        </IconButton>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(NavigateButtons);
