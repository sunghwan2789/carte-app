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
}

@observer
class Navigator extends React.Component<IProps> {
  render() {
    const { classes } = this.props;

    return (
      <Typography variant="title" className={classes.date}>
        {this.props.currentDate.format('YYYY년 M월 D일')}
      </Typography>
    );
  }
}

export default withStyles(styles)(Navigator);
