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
  date: {
    color: "inherit",
  },
});

interface IProps extends WithStyles<typeof styles> {
  currentDate: dayjs.Dayjs;
  navigateUnit: dayjs.UnitType;
}

@observer
class Navigator extends React.Component<IProps> {

  getWeekNumberOfMonth() {
    const { currentDate } = this.props;
    const startDateOfStartWeekOfMonth = currentDate.startOf('month').startOf('week');
    return currentDate.diff(startDateOfStartWeekOfMonth, 'week') + 1;
  }

  formatDate() {
    const { navigateUnit, currentDate } = this.props;

    switch (navigateUnit) {
      case 'day':
        return currentDate.format('YYYY년 M월 D일');
      case 'week':
        return `${currentDate.format('YYYY년 M월')} ${this.getWeekNumberOfMonth()}주`;
      case 'month':
        return currentDate.format('YYYY년 M월');
    }
    return '';
  }

  render() {
    const { classes } = this.props;

    return (
      <Typography variant="title" className={classes.date}>
        {this.formatDate()}
      </Typography>
    );
  }
}

export default withStyles(styles)(Navigator);
