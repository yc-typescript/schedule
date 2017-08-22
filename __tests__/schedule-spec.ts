import {
  Schedule,
  IRules,
  IDateRule,
  IWeeklyRule,
  IDailyRule,
  IRuleItem,
  Calendar,
  CalendarDate,
} from '../src';
import * as moment from 'moment';

test('Should schedule with daily rule', () => {
  const dailyRule: IDailyRule = Array(24).fill(0).map((y: any): IRuleItem => {
    return {
      available: true,
    };
  });
  const rules: IRules = {
    daily: dailyRule,
  };
  const schedule = new Schedule(rules);
  const calendar: Calendar = schedule.presentCurrentMonth();
  expect(calendar.items.map(x => x.available)).toEqual(Array(42).fill(true));
  calendar.select(calendar.items[0]);
  expect(calendar.selected).toBe(calendar.items[0]);
  expect(calendar.selected.selected).toBe(true);
  const calendarDate: CalendarDate = schedule.presentCurrentDate();
  expect(calendarDate.hours.map(x => x.available)).toEqual(
    Array(24).fill(true)
  );
  calendarDate.select(calendarDate.hours[0]);
  expect(calendarDate.selected).toBe(calendarDate.hours[0]);
});

test('Should schedule with weekly rule', () => {
  const weeklyRule: IWeeklyRule = Array(7).fill(0).map((x: any): IDailyRule => {
    return Array(24).fill(0).map((y: any): IRuleItem => {
      return {
        available: true,
      };
    });
  });
  const rules: IRules = {
    weekly: weeklyRule,
  };
  const schedule = new Schedule(rules);
  const calendar: Calendar = schedule.presentCurrentMonth();
  expect(calendar.items.map(x => x.available)).toEqual(Array(42).fill(true));
  const calendarDate: CalendarDate = schedule.presentCurrentDate();
  expect(calendarDate.hours.map(x => x.available)).toEqual(
    Array(24).fill(true)
  );
});

test('Should schedule with a date rule', () => {
  const now = moment();
  const dateRule: IDateRule = [
    {
      date: now,
      rule: Array(24).fill(0).map((y: any): IRuleItem => {
        return {
          available: true,
        };
      }),
    },
  ];
  const rules: IRules = {
    date: dateRule,
  };
  const schedule = new Schedule(rules);
  const calendar: Calendar = schedule.presentCurrentMonth();
  const item = calendar.items.find(x => x.date.isSame(now, 'day'));
  expect(item).toBeTruthy();
  const toBe = Array(42).fill(false);
  const index = calendar.items.indexOf(item);
  toBe[index] = true;
  expect(calendar.items.map(x => x.available)).toEqual(toBe);
  const calendarDate: CalendarDate = schedule.presentCurrentDate();
  expect(calendarDate.hours.map(x => x.available)).toEqual(
    Array(24).fill(true)
  );
});
