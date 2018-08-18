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
  { id: 'school-store', store: schoolStore },
  { id: 'carte-store',  store: carteStore },
];
setTimeout(()=>{
for (let { id, store } of stores) {
  hydrate(`${prefix}${id}`, store)
    .then(action(() => {
      if (++done == stores.length) {
        persistStores.isLoading = false;
      }
    }));
}
},3000);
