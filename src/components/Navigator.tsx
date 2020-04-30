import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import dayjs, { Dayjs, OpUnitType } from 'dayjs';
import DayPicker from 'react-day-picker';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DayPickerKoreanUtils from '../lib/DayPickerKoreanUtils';

type NavigatorProps = {
  currentDate: Dayjs;
  navigateUnit: OpUnitType;
  handleDateChange?: (date: Dayjs) => void;
};

const useStyles = makeStyles(() =>
  createStyles({
    date: {
      color: 'inherit',
    },
  })
);

export default function Navigator({
  currentDate,
  navigateUnit,
  handleDateChange,
}: NavigatorProps) {
  const [isDayPicking, setIsDayPicking] = useState(false);
  const classes = useStyles();

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
        fullWidth
        color="inherit"
        style={{ justifyContent: 'start', padding: 0 }}
        onClick={toggleDayPicker}
      >
        <Typography variant="h6" className={classes.date}>
          {formatDate()}
        </Typography>
      </Button>
      <Dialog open={isDayPicking}>
        <DialogTitle>식단표 기준 날짜 선택</DialogTitle>
        <DialogContent>
          <DayPicker
            selectedDays={currentDate.toDate()}
            initialMonth={currentDate.toDate()}
            localeUtils={DayPickerKoreanUtils}
            onDayClick={handleDayPick}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDayPicker} color="secondary">
            취소
          </Button>
          <Button
            onClick={() => handleDayPick(dayjs().toDate())}
            color="primary"
          >
            오늘
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
