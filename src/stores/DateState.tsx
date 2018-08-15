import { observable } from "mobx";
import * as dayjs from "dayjs";

class DateState {
  @observable
  currentDate: dayjs.Dayjs = dayjs();
}

export default DateState;
