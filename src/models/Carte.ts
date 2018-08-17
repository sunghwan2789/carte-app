import { Dayjs } from 'dayjs';
import Food from './Food';

export default class Carte {
  date: Dayjs
  breakfast?: Food[]
  lunch?: Food[]
  dinner?: Food[]
  tea?: Food[]
}
