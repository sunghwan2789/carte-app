import { serializable, primitive, serializeAll, serialize, list, custom, map } from 'serializr';

export default class Highlight {
  @serializable(primitive())
  id: string
  @serializable(primitive())
  name: string
  @serializable(list(primitive()))
  words: string[] = []
  @serializable(map(primitive()))
  style: any = {}
}
