import { observable, computed, reaction, action, runInAction, IObservableArray, flow } from 'mobx';
import Carte from '../models/Carte';
import * as dayjs from 'dayjs';
import schoolStore from './schoolStore';
import Meal from '../models/Meal';
import { find } from 'lodash';
import { persist } from 'mobx-persist';
import School from '../models/School';
import { isEqual } from 'lodash';
import { serializable, object, map, list, primitive, date, serialize, deserialize, reference } from 'serializr';
import * as _ from 'lodash';

export class CarteStore {
  @observable
  currentDate: dayjs.Dayjs = dayjs().startOf('day');

  @serializable(primitive())
  @observable
  navigationUnit: dayjs.UnitType = 'day';

  @observable
  isLoading: boolean = false

  @serializable(list(object(Carte)))
  @observable
  cartes: IObservableArray<Carte> = observable.array();

  @action
  clear() {
    this.cartes.clear();
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

  private get currentDates(): dayjs.Dayjs[] {
    const startDate = this.currentDate.startOf(this.navigationUnit);
    const endDate = this.currentDate.endOf(this.navigationUnit);
    let dates = [];
    for (let date = startDate; date.isBefore(endDate); date = date.add(1, 'day')) {
      dates.push(date);
    }
    return dates;
  }

  get currentCartes(): Carte[] {
    return this.currentDates.map(date => this.getCarte(date));
  }

  getCarte(date: dayjs.Dayjs): Carte {
    return this.cartes.find(i => i.date.isSame(date))!;
  }

  @serializable(object(School))
  private previousSchool?: School

  loadCartes = _.debounce(flow(function* (this: CarteStore) {
    const school = schoolStore.selectedSchool;

    if (!isEqual(this.previousSchool, school)) {
      this.clear();
      this.previousSchool = school;
    }

    if (typeof school === 'undefined') {
      return;
    }

    if (typeof this.getCarte(this.currentDate) !== 'undefined') {
      return;
    }

    this.isLoading = true;

    const { domainCode, courseCode, code } = school;
    const year = this.currentDate.year();
    const month = this.currentDate.month() + 1;
    try {
      let res: Response = yield fetch(`https://bloodcat.com/carte/api/v1/cartes/${domainCode}/${courseCode}/${code}?${new URLSearchParams({
        date: `${year}-${month}`,
      })}`);
      if (!res.ok) {
        throw res.status;
      }

      let json = yield res.json();

      // TODO: map(Carte.fromJSON(i))
      json.forEach((i: any) => {
        let carte = new Carte();
        carte.date = dayjs(i.date);
        carte.meals = i.meals.map((j: any) => j as Meal);
        this.cartes.push(carte);
      });
    } catch ($e) {
      // TODO: notify what happened
    } finally {
      this.isLoading = false;
    }
  }), 400)
}

let carteStore = new CarteStore();

export default carteStore;
