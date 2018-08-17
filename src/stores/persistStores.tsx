import { observable, action } from 'mobx';
import { create } from 'mobx-persist';

import schoolStore from './schoolStore';
import carteStore from './carteStore';

class PersistStores {
  @observable
  isLoading: boolean = true
}

const persistStores = new PersistStores();

export default persistStores;

const prefix = 'carte-v1-';
const hydrate = create();

let done = 0;
const stores = [
  schoolStore,
  carteStore,
];

for (let store of stores) {
  hydrate(`${prefix}${store.constructor.name}`, store)
    .then(action(() => {
      if (++done == stores.length) {
        persistStores.isLoading = false;
      }
    }));
}
