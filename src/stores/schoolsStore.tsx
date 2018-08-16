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
  schools: School[] = [
    {
      code: 'H100000675',
      name: '울산강남고등학교',
      address: '울산광역시 남구 팔등로 115',
      courseCode: '4',
      domainCode: 'H10',
    },
  ];
};

export default new SchoolsStore();
