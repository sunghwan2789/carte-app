import { observable, action } from "mobx";
import * as dayjs from "dayjs";

export class NavigationStore {
  @observable
  currentDate: dayjs.Dayjs = dayjs();

  @observable
  navigationUnit: dayjs.UnitType = "day";

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
