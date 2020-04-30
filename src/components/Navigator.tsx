import React, { useState, useRef } from 'react';
import {
  createStyles,
  WithStyles,
  withStyles,
  makeStyles,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import dayjs, { Dayjs, OpUnitType } from 'dayjs';
import DayPicker from 'react-day-picker';
import DayPickerKoreanUtils from '../lib/DayPickerKoreanUtils';

type NavigatorProps = {
  currentDate: Dayjs;
  navigateUnit: OpUnitType;
  handleDateChange?: (date: Dayjs) => void;
};

export default function Navigator({
  currentDate,
  navigateUnit,
  handleDateChange,
}: NavigatorProps) {
  const [isDayPicking, setIsDayPicking] = useState(false);
  const classes = useStyles();
  const dayPickerRef = useRef<HTMLElement>();

  function toggleDayPicker() {
    setIsDayPicking(!isDayPicking);
  }

  function formatDate() {
    function getWeekNumberOfMonth() {
      const startDateOfStartWeekOfMonth = currentDate
        .startOf('month')
        .startOf('week');
      return currentDate.diff(startDateOfStartWeekOfMonth, 'week') + 1;
    }

    function getShortDayName() {
      const names = '일월화수목금토';
      return names.charAt(currentDate.day());
    }

    switch (navigateUnit) {
      case 'day': {
        return `${currentDate.format('M월 D일')} (${getShortDayName()})`;
      }
      case 'week': {
        return `${currentDate.format('M월')} ${getWeekNumberOfMonth()}주`;
      }
      case 'month': {
        return currentDate.format('YYYY년 M월');
      }
      default: {
        return '';
      }
    }
  }

  function handleDayPick(day: Date) {
    toggleDayPicker();
    if (handleDateChange) {
      handleDateChange(dayjs(day).startOf('day'));
    }
  }

  // TODO: check popper pops up
  return (
    <>
      <Button
        buttonRef={dayPickerRef}
        fullWidth
        color="inherit"
        style={{ justifyContent: 'start', padding: 0 }}
        onClick={toggleDayPicker}
      >
        <Typography variant="h6" className={classes.date}>
          {formatDate()}
        </Typography>
        {isDayPicking ? <ArrowDropUp /> : <ArrowDropDown />}
      </Button>
      <Popper
        open={isDayPicking}
        anchorEl={dayPickerRef.current}
        placement="bottom-start"
        modifiers={{
          flip: {
            enabled: false,
          },
        }}
      >
        <Paper>
          <DayPicker
            selectedDays={currentDate.toDate()}
            initialMonth={currentDate.toDate()}
            localeUtils={DayPickerKoreanUtils}
            onDayClick={handleDayPick}
          />
        </Paper>
      </Popper>
    </>
  );
}

const useStyles = makeStyles((theme) =>
  createStyles({
    date: {
      color: 'inherit',
    },
  })
);
