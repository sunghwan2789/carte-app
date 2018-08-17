import { observable, action, computed } from "mobx";
import * as dayjs from "dayjs";
import { persist, create } from "mobx-persist";

export class NavigationStore {
  @observable
  currentDate: dayjs.Dayjs = dayjs();

  @persist
  @observable
  navigationUnit: dayjs.UnitType = "day";

  @computed
  get currentDates(): dayjs.Dayjs[] {
    const startDate = this.currentDate.startOf(this.navigationUnit);
    const endDate = this.currentDate.endOf(this.navigationUnit);
    let dates = [];
    for (let date = startDate; date.isBefore(endDate); date = date.add(1, 'day')) {
      dates.push(date);
    }
    return dates;
  }

  @action
  forward() {
    this.navigate(1);
  }

  @action
  backward() {
    this.navigate(-1);
  }

  @action
  private navigate(amount: number) {
    this.currentDate = this.currentDate.add(amount, this.navigationUnit);
  }
};

export default new NavigationStore();
