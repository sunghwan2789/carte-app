import * as React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import * as dayjs from 'dayjs';
import { reaction, action } from 'mobx';
import { observer } from 'mobx-react';
import DateState from '../stores/DateState';

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
  dateState: DateState;
  navigationUnit: dayjs.UnitType;
}

@observer
class DateNavigator extends React.Component<IProps> {
  @action
  handlePrevious = () => {
    const { dateState, navigationUnit } = this.props;
    dateState.currentDate = dateState.currentDate.add(-1, navigationUnit);
  }

  @action
  handleNext = () => {
    const { dateState, navigationUnit } = this.props;
    dateState.currentDate = dateState.currentDate.add(1, navigationUnit);
  }

  render() {
    const { classes, dateState } = this.props;

    return (
      <React.Fragment>
        <IconButton className={classes.navigator}
          onClick={this.handlePrevious}>
          <ChevronLeft />
        </IconButton>
        <IconButton className={classes.navigator}
          onClick={this.handleNext}>
          <ChevronRight />
        </IconButton>
        <Typography variant="title" className={classes.date}>
          {dateState.currentDate.format('YYYY년 M월 D일')}
        </Typography>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(DateNavigator);
