import { serializable, primitive, serializeAll } from 'serializr';

@serializeAll
export default class Highlight {
  id: string
  name: string
  words: string[] = []
  style: object = {}
}
