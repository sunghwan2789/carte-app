import * as React from 'react';
import { Typography, Button, ButtonBase, Icon, Popper, Paper } from '@material-ui/core';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { ExpandLess, ExpandMore, ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import * as dayjs from 'dayjs';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import DayPicker from 'react-day-picker';

const styles = createStyles({
  date: {
    color: 'inherit',
  },
});

interface IProps extends WithStyles<typeof styles> {
  currentDate: dayjs.Dayjs;
  navigateUnit: dayjs.UnitType;
  handleDateChange?: (date: dayjs.Dayjs) => void;
}

@observer
class Navigator extends React.Component<IProps> {

  @observable
  isDayPicking: boolean = false

  @action
  toggleDayPicker = () => {
    this.isDayPicking = !this.isDayPicking;
  }

  handleDayPick = (day: Date) => {
    this.toggleDayPicker();
    if (this.props.handleDateChange) {
      this.props.handleDateChange(dayjs(day).startOf('day'));
    }
  }

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
        return `${currentDate.format('M월 D일')} (${this.getShortDayName()})`;
      case 'week':
        return `${currentDate.format('M월')} ${this.getWeekNumberOfMonth()}주`;
      case 'month':
        return currentDate.format('YYYY년 M월');
    }
    return '';
  }

  anchorEl: any;

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Button
          buttonRef={node => this.anchorEl = node}
          fullWidth
          color="inherit"
          style={{justifyContent:'start',padding:0}}
          onClick={this.toggleDayPicker}
        >
          <Typography variant="title" className={classes.date}>
            {this.formatDate()}
          </Typography>
          <Icon /*color="secondary"*/>
            {this.isDayPicking
              ? <ArrowDropUp />
              : <ArrowDropDown />
            }
          </Icon>
        </Button>
        <Popper
          open={this.isDayPicking}
          anchorEl={this.anchorEl}
          placement="bottom-start"
          modifiers={{
            flip: {
              enabled: false,
            },
          }}
        >
          <Paper>
            <DayPicker
              selectedDays={this.props.currentDate.toDate()}
              initialMonth={this.props.currentDate.toDate()}
              onDayClick={this.handleDayPick} />
          </Paper>
        </Popper>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Navigator);
