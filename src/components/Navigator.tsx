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
}

interface IPropsInjected extends IProps {
  dateNavigationStore: DateNavigationStore;
}

@inject('dateNavigationStore')
@observer
class Navigator extends React.Component<IProps> {
  @action
  handlePrevious = () => {
    this.injected.dateNavigationStore.backward();
  }

  @action
  handleNext = () => {
    this.injected.dateNavigationStore.forward();
  }

  get injected() {
    return this.props as IPropsInjected;
  }

  render() {
    const { classes } = this.props;
    const { dateNavigationStore } = this.injected;

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
          {dateNavigationStore.currentDate.format('YYYY년 M월 D일')}
        </Typography>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Navigator);
