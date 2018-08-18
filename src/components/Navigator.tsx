import * as React from 'react';
import { Typography } from '@material-ui/core';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import * as dayjs from 'dayjs';
import { observer } from 'mobx-react';

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
  getShortDayName() {
    const { currentDate } = this.props;
    const names = '일월화수목금토';
    return names.charAt(currentDate.day());
  }

  formatDate() {
    const { navigateUnit, currentDate } = this.props;

    switch (navigateUnit) {
      case 'day':
        return `${currentDate.format('YYYY년 M월 D일')} (${this.getShortDayName()})`;
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
