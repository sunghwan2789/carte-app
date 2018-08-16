import { observable } from "mobx";
import School from "../models/School";
import { persist, create } from 'mobx-persist';

export class SchoolsStore {
  @observable
  isLoading: boolean = false;

  @persist('object')
  @observable
  selectedSchool?: School;

  @observable
  schoolCount: number = 0;

  @observable
  schools: School[] = [];
};

const schoolStore = new SchoolsStore();

export default schoolStore;

create()('carte-v1-schools', schoolStore);
