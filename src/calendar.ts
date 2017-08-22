import * as moment from 'moment';

export class Calendar {
  public selected: ICalendarItem;
  constructor(
    public items: ICalendarItem[]
  ) {

  }

  public select(item: ICalendarItem): void {
    for (let i of this.items) {
      i.selected = false;
    }
    item.selected = true;
    this.selected = item;
  }

}

export class CalendarDate {
  public selected: ICalendarHour;
  constructor(
    public hours: ICalendarHour[]
  ) {

  }

  public select(hour: ICalendarHour): void {
    for (let i of this.hours) {
      i.selected = false;
    }
    hour.selected = true;
    this.selected = hour;
  }
}

export interface ICalendarItem {
  date: moment.Moment;
  available: boolean;
  type: 'prev' | 'current' | 'next';
  selected: boolean;
}

export interface ICalendarHour {
  available: boolean;
  selected: boolean;
}

// export interface ICalendarEvent {
//   name: string;
//   detail?: string;
// }