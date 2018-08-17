import { observable, computed, reaction, action, runInAction, ObservableMap } from 'mobx';
import navigationStore from './navigationStore';
import Carte from '../models/Carte';
import * as dayjs from 'dayjs';
import schoolStore from './schoolStore';
import Meal from '../models/Meal';
import { find } from 'lodash';

export class CarteStore {

  @observable
  isLoading = true

  @observable
  cartes: ObservableMap<number, Carte> = observable.map();

  constructor() {
    // FIXME: MOVE THIS TO CARTE_PAGE
    reaction(() => schoolStore.selectedSchool, () => {
      this.cartes.clear();
    });
  }

  @computed
  get currentCartes(): Carte[] {
    // FIXME: ERROR AFTER MONTH CHANGE
    console.log('currentCartes', this.cartes);
    return navigationStore.currentDates.map(date => this.getCarte(date));
  }

  getCarte(date: dayjs.Dayjs): Carte {
    return this.cartes.get(date.unix())!;
  }

  @action
  loadCartes() {
    console.log('selectedSchool', schoolStore.selectedSchool);
    // FIXME: do not run at initialization
    if (typeof schoolStore.selectedSchool === 'undefined') {
      return;
    }
    console.log('loadCartes', schoolStore.selectedSchool.code);

    this.isLoading = true;

    const { domainCode, courseCode, code } = schoolStore.selectedSchool;
    const year = navigationStore.currentDate.year();
    const month = navigationStore.currentDate.month() + 1;
    fetch(`https://bloodcat.com/carte/api/v1/cartes/${domainCode}/${courseCode}/${code}/${year}/${month}`)
      .then(res => res.json())
      .then(action((data: any) => {
        console.log('loading complete', data);
        data.forEach((i: any) => {
          let carte = new Carte();
          carte.date = dayjs(i.date);
          carte.meals = i.meals.map((j: any) => j as Meal);
          this.cartes.set(carte.date.unix(), carte);
        });
        console.log('loading complete', this.cartes);
        this.isLoading = false;
      }));
  }
}

let carteStore = new CarteStore();

export default carteStore;
