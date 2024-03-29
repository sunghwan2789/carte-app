import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material'
import dayjs, { Dayjs, OpUnitType } from 'dayjs'
import React, { useState } from 'react'
import DayPicker from 'react-day-picker'
import DayPickerKoreanUtils from '../lib/DayPickerKoreanUtils'

type NavigatorProps = {
  date: Dayjs
  unit: OpUnitType
  onChange?: (date: Dayjs) => void
}

export default function Navigator({ date, unit, onChange }: NavigatorProps) {
  const [isDayPicking, setIsDayPicking] = useState(false)

  function toggleDayPicker() {
    setIsDayPicking(!isDayPicking)
  }

  function formatDate() {
    function getWeekNumberOfMonth() {
      const startDateOfStartWeekOfMonth = date.startOf('month').startOf('week')
      return date.diff(startDateOfStartWeekOfMonth, 'week') + 1
    }

    function getShortDayName() {
      const names = '일월화수목금토'
      return names.charAt(date.day())
    }

    switch (unit) {
      case 'day': {
        return `${date.format('M월 D일')} (${getShortDayName()})`
      }
      case 'week': {
        return `${date.format('M월')} ${getWeekNumberOfMonth()}주`
      }
      case 'month': {
        return date.format('YYYY년 M월')
      }
      default: {
        return ''
      }
    }
  }

  function handleDayPick(day: Date) {
    toggleDayPicker()
    onChange?.(dayjs(day).startOf('day'))
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
        <Typography variant="h6">{formatDate()}</Typography>
      </Button>
      <Dialog open={isDayPicking} onClose={toggleDayPicker}>
        <DialogTitle>식단표 기준 날짜 선택</DialogTitle>
        <DialogContent>
          <DayPicker
            selectedDays={date.toDate()}
            initialMonth={date.toDate()}
            fixedWeeks
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
  )
}
