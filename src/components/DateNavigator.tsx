import * as React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import * as dayjs from 'dayjs';

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
  state = {
    viewingDate: dayjs(),
  }

  handlePrevious() {
    const { viewingDate } = this.state;
    this.setState({
      ...this.state,
      // TODO: UnitType도 state로 관리
      // 일간/주간/월간 식단
      viewingDate: viewingDate.add(-1, 'day'),
    })
  }

  handleNext() {
    const { viewingDate } = this.state;
    this.setState({
      ...this.state,
      // TODO: UnitType도 state로 관리
      // 일간/주간/월간 식단
      viewingDate: viewingDate.add(1, 'day'),
    })
  }

  render() {
    const { classes } = this.props;
    const { viewingDate } = this.state;

    return (
      <React.Fragment>
        <IconButton className={classes.navigator}
          onClick={() => this.handlePrevious()}>
          <ChevronLeft />
        </IconButton>
        <IconButton className={classes.navigator}
          onClick={() => this.handleNext()}>
          <ChevronRight />
        </IconButton>
        <Typography variant="title" className={classes.date}>
          {viewingDate.format('YYYY년 M월 D일')}
        </Typography>
      </React.Fragment>
    );
  }
});
