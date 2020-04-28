import { list, primitive, serializable } from 'serializr';

export default class Meal {
  @serializable(primitive())
  name: string
  @serializable(list(primitive()))
  foods: string[]
}
