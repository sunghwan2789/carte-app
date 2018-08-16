import { observable } from "mobx";
import School from "../models/School";

export class SchoolsStore {
  @observable
  isLoading: boolean = false;

  @observable
  selectedSchool?: School;

  @observable
  schoolCount: number = 0;

  @observable
  schools: School[] = [];
};

export default new SchoolsStore();
