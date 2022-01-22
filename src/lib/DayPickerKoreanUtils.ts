import dayjs from 'dayjs'
import { LocaleUtils } from 'react-day-picker'

const WEEKDAYS = '일월화수목금토'.split('')

const DayPickerKoreanUtils: LocaleUtils = {
  formatDate(date) {
    return dayjs(date).format('YYYY년 M월 D일')
  },
  formatDay(day) {
    return dayjs(day).format('YYYY년 M월 D일')
  },
  formatMonthTitle(month) {
    return dayjs(month).format('YYYY년 M월')
  },
  formatWeekdayShort(weekday) {
    return WEEKDAYS[weekday]
  },
  formatWeekdayLong(weekday) {
    return `${WEEKDAYS[weekday]}요일`
  },
  getFirstDayOfWeek() {
    return 0
  },
  getMonths() {
    return [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월'
    ]
  },
  parseDate(str) {
    return dayjs(str).toDate()
  }
}

export default DayPickerKoreanUtils
