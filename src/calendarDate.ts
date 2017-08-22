import * as moment from 'moment';
import { IEvent } from './schedule';

export class CalendarDate {
  public selected: ICalendarHour;
  constructor(public hours: ICalendarHour[]) {}

  public select(hour: ICalendarHour): void {
    for (const i of this.hours) {
      i.selected = false;
    }
    hour.selected = true;
    this.selected = hour;
  }
}

export interface ICalendarHour {
  date: moment.Moment;
  available: boolean;
  selected: boolean;
  event?: IEvent;
}
