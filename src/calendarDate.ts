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
  available: boolean;
  selected: boolean;
}
