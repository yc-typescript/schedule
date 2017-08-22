import * as moment from 'moment';
import { Calendar, CalendarDate, ICalendarHour, ICalendarItem } from './';

export class Schedule {
  public rules: IRules;
  public events: IEvent[];
  constructor(rules: IRules, events?: IEvent[]) {
    this.rules = rules;
    this.events = events || [];
  }

  public presentCurrentMonth() {
    return this.presentMonth(new Date());
  }

  public presentMonth(date: Date | moment.Moment | string) {
    const m = moment(date).hour(0).minute(0).second(0).millisecond(0);
    const year = m.year();
    const month = m.month();
    const currentDates = m.daysInMonth();
    const prevDates = moment(m).date(1).day();
    const nextDates = 42 - currentDates - prevDates;
    const prevItems: ICalendarItem[] = Array(prevDates)
      .fill(0)
      .map((x, y) => x + y)
      .map((x: number): ICalendarItem => {
        return {
          date: moment(m).date(-x),
          available: false,
          type: 'prev',
          selected: false,
        };
      })
      .reverse();
    const currentItems: ICalendarItem[] = Array(currentDates)
      .fill(1)
      .map((x, y) => x + y)
      .map((x: number): ICalendarItem => {
        return {
          date: moment(m).date(x),
          available: false,
          type: 'current',
          selected: false,
        };
      });
    const nextItems: ICalendarItem[] = Array(nextDates)
      .fill(1)
      .map((x, y) => x + y)
      .map((x: number): ICalendarItem => {
        return {
          date: moment(m).add(1, 'month').date(x),
          available: false,
          type: 'next',
          selected: false,
        };
      });
    const items: ICalendarItem[] = [].concat(
      prevItems,
      currentItems,
      nextItems
    );
    if (this.rules.daily) {
      const available = this.rules.daily.some(x => x.available);
      for (const item of items) {
        item.available = available;
      }
    }
    if (this.rules.weekly) {
      let index = 0;
      for (const week of this.rules.weekly) {
        const available = week.some(x => x.available);
        Array(6)
          .fill(index)
          .map((x, y) => x + y * 7)
          .map(x => items[x])
          .forEach(x => (x.available = available));
        index++;
      }
    }
    if (this.rules.date) {
      const start = moment(items[0].date).subtract(1, 'millisecond');
      const end = moment(items[items.length - 1].date).add(1, 'day');
      this.rules.date
        .filter(x => {
          const d = moment(x.date);
          return d.isAfter(start) && d.isBefore(end);
        })
        .forEach(x => {
          const item = items.find(y => y.date.isSame(x.date, 'day'));
          if (item) item.available = x.rule.some(x => x.available);
        });
    }
    for (let item of items) {
      item.events = this.events.filter(x => x.date.isSame(item.date, 'date'));
    }
    return new Calendar(items);
  }

  public presentCurrentDate() {
    return this.presentDate(new Date());
  }

  public presentDate(date: Date | moment.Moment | string) {
    const m = moment(date).hour(0).minute(0).second(0).millisecond(0);
    const hours: ICalendarHour[] = Array(24).fill(0)
    .map((x, y) => x + y)
    .map((x: number): ICalendarHour => {
      return {
        date: moment(m).hour(x),
        available: false,
        selected: false,
      };
    });
    if (this.rules.daily) {
      for (let i = 0; i < hours.length; i++) {
        hours[i].available = this.rules.daily[i].available;
      }
    }
    if (this.rules.weekly) {
      const week = this.rules.weekly[m.day()];
      for (let i = 0; i < hours.length; i++) {
        hours[i].available = week[i].available;
      }
    }
    if (this.rules.date) {
      const date = this.rules.date.find(x => x.date.isSame(m, 'date'));
      if (date) {
        for (let i = 0; i < hours.length; i++) {
          hours[i].available = date.rule[i].available;
        }
      }
    }
    for (let hour of hours) {
      hour.event = this.events.find(x => x.date.isSame(hour.date, 'hour'));
    }
    return new CalendarDate(hours);
  }
}

export interface IRules {
  daily?: IDailyRule;
  weekly?: IWeeklyRule;
  date?: IDateRule;
}

export interface IRuleItem {
  available: boolean;
  meta?: any;
}

export type IDailyRule = IRuleItem[];

export type IWeeklyRule = IDailyRule[];

export type IDateRule = IDateRuleItem[];

export interface IDateRuleItem {
  date: moment.Moment;
  rule: IDailyRule;
}

export interface IEvent {
  date: moment.Moment;
  name: string;
  detail?: string;
}
