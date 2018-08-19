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

let tasks = [];

const hydrate = create();
const prefix = 'carte-v1-';
const stores = [
  { id: 'school-store', store: schoolStore },
  { id: 'carte-store',  store: carteStore },
];
for (let { id, store } of stores) {
  tasks.push(hydrate(`${prefix}${id}`, store));
}

Promise.all(tasks).then(action(() => persistStores.isLoading = false));
