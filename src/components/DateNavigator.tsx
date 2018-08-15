import * as React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

const styles = createStyles({
  navigator: {
    width: 32,
    height: 32,
    color: "inherit",
  },
  date: {
    color: "inherit",
  },
});

interface IProps extends WithStyles<typeof styles> {}

export default withStyles(styles)(class extends React.Component<IProps> {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <IconButton className={classes.navigator}>
          <ChevronLeft />
        </IconButton>
        <IconButton className={classes.navigator}>
          <ChevronRight />
        </IconButton>
        <Typography variant="title" className={classes.date}>
          WWhat
        </Typography>
      </React.Fragment>
    );
  }
});
