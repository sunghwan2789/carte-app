import * as dayjs from 'dayjs';
import Meal from './Meal';
import { serializable, identifier, reference, list, object, date, custom, PropSchema } from 'serializr';

// TODO: WATCH serializr date schema
class dayjsSchema implements PropSchema {
  serializer(obj: dayjs.Dayjs) {
    return obj.valueOf();
  }

  deserializer(jsonValue: any, done: (err: any, targetPropertyValue: any) => void) {
    done(null, dayjs(jsonValue));
  }
}

export default class Carte {
  @serializable(new dayjsSchema())
  date: dayjs.Dayjs
  @serializable(list(object(Meal)))
  meals: Meal[]
}
