import { serializable, primitive, serializeAll } from 'serializr';

@serializeAll
export default class Highlight {
  name: string
  words: string[]
  style: object
}
