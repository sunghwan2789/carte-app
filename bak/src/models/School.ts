import { serializable, primitive } from 'serializr';

export default class School {
  @serializable(primitive())
  code: string;
  @serializable(primitive())
  name: string;
  @serializable(primitive())
  address: string;
  @serializable(primitive())
  courseCode: string;
  @serializable(primitive())
  domainCode: string;
}
