import * as dayjs from 'dayjs';

const WEEKDAYS = '일월화수목금토'.split('');

export default {
  formatDay(day: Date) {
    return dayjs(day).format('YYYY년 M월 D일');
  },
  formatMonthTitle(day: Date) {
    return dayjs(day).format('YYYY년 M월');
  },
  formatWeekdayShort(i: number) {
    return WEEKDAYS[i];
  },
  formatWeekdayLong(i: number) {
    return WEEKDAYS[i] + '요일';
  },
  getFirstDayOfWeek() {
    return 0;
  },
  getMonths():[string,string,string,string,string,string,string,string,string,string,string,string] {
    return ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  }
}
