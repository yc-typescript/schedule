import * as moment from 'moment';

export class Calendar {
  public selected: ICalendarItem;
  constructor(public items: ICalendarItem[]) {}

  public select(item: ICalendarItem): void {
    for (const i of this.items) {
      i.selected = false;
    }
    item.selected = true;
    this.selected = item;
  }
}

export interface ICalendarItem {
  date: moment.Moment;
  available: boolean;
  type: 'prev' | 'current' | 'next';
  selected: boolean;
}

// export interface ICalendarEvent {
//   name: string;
//   detail?: string;
// }
