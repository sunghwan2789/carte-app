import { observable, computed } from 'mobx';
import navigationStore from './navigationStore';
import Carte from '../models/Carte';
import { Dayjs } from 'dayjs';

export class CarteStore {
  @computed
  get currentCartes(): Carte[] {
    return navigationStore.currentDates.map(date => this.getCarte(date));
  }

  getCarte(date: Dayjs): Carte {
    return {
      date,
      meals: [
        {
          name: '[조식]',
          foods: [
            '엔 고기',
          ],
        },
        {
          name: '[석식]',
          foods: [
            '은 고기고기',
          ],
        },
      ],
    };
  }
}

let carteStore = new CarteStore();

export default carteStore;
