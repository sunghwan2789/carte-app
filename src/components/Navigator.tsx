import * as React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import * as dayjs from 'dayjs';
import { reaction, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import DateState from '../stores/DateState';
import { DateNavigationStore } from '../stores/dateNavigationStore';

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

interface IProps extends WithStyles<typeof styles> {
  currentDate: dayjs.Dayjs;
  handleBackward?: () => void;
  handleForward?: () => void;
}

@observer
class Navigator extends React.Component<IProps> {
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
        <Typography variant="title" className={classes.date}>
          {this.props.currentDate.format('YYYY년 M월 D일')}
        </Typography>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Navigator);
