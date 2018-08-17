import { observable, computed, reaction, action, runInAction } from 'mobx';
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
  cartes: Carte[] = []

  constructor() {
    // FIXME: MOVE THIS TO CARTE_PAGE
    reaction(() => schoolStore.selectedSchool, () => {
      this.cartes = [];
    });
  }

  @computed
  get currentCartes(): Carte[] {
    console.log('currentCartes', this.cartes);
    return navigationStore.currentDates.map(date => this.getCarte(date));
  }

  getCarte(date: dayjs.Dayjs): Carte {
    return find(this.cartes, i => i.date.isSame(date))!;
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
          this.cartes.push(carte);
        });
        console.log('loading complete', this.cartes);
        this.isLoading = false;
      }));
  }
}

let carteStore = new CarteStore();

export default carteStore;
