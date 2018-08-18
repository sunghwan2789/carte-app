import { observable } from 'mobx';
import School from '../models/School';
import { persist, create } from 'mobx-persist';
import { serializable, object, reference } from 'serializr';

export class SchoolStore {
  @observable
  isLoading: boolean = false;

  @serializable(object(School))
  @observable
  selectedSchool?: School;

  @observable
  schoolCount: number = 0;

  @observable
  schools: School[] = [];
};

export default new SchoolStore();
