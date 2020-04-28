import Highlight from '../models/Highlight';
import * as uuidv4 from 'uuid/v4';
import { IObservableArray, action, observable } from 'mobx';
import { serializable, list, object } from 'serializr';

class HighlightStore {
  @serializable(list(object(Highlight)))
  @observable
  highlights: IObservableArray<Highlight> = observable.array()

  @action
  add(highlight: Highlight) {
    highlight.id = uuidv4();
    this.highlights.push(highlight);
  }

  find(id: string) {
    return this.highlights.find(i => i.id === id);
  }

  @action
  update() {
    this.highlights.push(new Highlight());
    this.highlights.pop();
  }

  @action
  delete(highlight: Highlight) {
    this.highlights.splice(this.highlights.findIndex(i => i.id === highlight.id), 1);
  }
}

export default new HighlightStore();
