import { observable, flow, IObservableArray } from 'mobx';
import School from '../models/School';
import { persist, create } from 'mobx-persist';
import { serializable, object, reference } from 'serializr';
import { isDeepStrictEqual } from 'util';

export class SchoolStore {
  @observable
  isLoading: boolean = false;

  @serializable(object(School))
  @observable
  selectedSchool?: School;

  @observable
  schoolCount: number = 0;

  @observable
  schools: IObservableArray<School> = observable.array();

  query?: string;
  shouldFetch: boolean = false;

  setQuery(q: string) {
    if (this.query !== q) {
      this.shouldFetch = true;
      this.query = q;
    }
  }

  // FIXME: catch exception and toggle `isLoading`
  loadSchools = flow(function* (this: SchoolStore) {
    if (!this.shouldFetch || !this.query) {
      return;
    }

    this.shouldFetch = false;

    this.isLoading = true;

    try {
      let res = yield fetch(`https://bloodcat.com/carte/api/v1/schools?${new URLSearchParams({
        q: this.query,
      })}`);
      let data = yield res.json();

      this.schools.clear();
      data.forEach((i: any) => {
        let school = new School();
        school.code = i['school_code'];
        school.domainCode = i['domain_code'];
        school.courseCode = i['course_code'];
        school.name = i['name'];
        school.address = i['address'];
        this.schools.push(school);
      });
    } catch ($e) {}
    this.isLoading = false;
  })
};

export default new SchoolStore();
