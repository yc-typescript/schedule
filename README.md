[![Build Status](https://travis-ci.org/yc-typescript/schedule.svg?branch=master)](https://travis-ci.org/yc-typescript/schedule.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/yc-typescript/schedule/badge.svg?branch=master)](https://coveralls.io/github/yc-typescript/schedule?branch=master)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# Installation

```bash
npm i -S @yct/schedule
```

or

```bash
yarn add @yct/schedule
```

# Usage

```ts
import { 
  IEvent,
  IRules,
  Schedule 
} from '@yct/schedule';

const rules: IRules = ... // rules
const events: IEvent[] = ... // events
const schedule = new Schedule(rules, events);

```

## Rules
There are 3 different types of rules.

- daily rule
- weekly rule
- date rule

Priority: daily < weekly < date

> Daily rule example
available from 9am to 5pm
```ts
  const dailyRule: IDailyRule = Array(24).fill(0)
  .map((x, y) => x + y)
  .map(x: IRuleItem => {
    return {
      available: x >= 9 && x < 17,
    };
  });
  const rules: IRules = {
    daily: dailyRule,
  };
```

> Weekly rule example
weekdays available
```ts
  const nonAvailableDay = Array(24).fill({
    available: false
  });
  const weekdaysRule: IWeeklyRule = Array(5).fill(dailyRule);
  const weeklyRules: IWeeklyRule = [].concat(nonAvailableDay, weekdaysRule, nonAvailableDay)
  const rules: IRules = {
    weekly: weeklyRule,
  };
```

> Date rule example
bank holiday
```ts
import * as moment from 'moment';

const r: IRules = {
  date: [
    {
      date: moment('...'), // date of a bank holiday
      rule: Array(24).fill({
        available: false
      })
    }
  ]
};
```

## Events
```ts
import * as moment from 'moment';

const events: IEvent[] = [
  {
    date: moment().hour(0).minute(0).second(0).millisecond(0),
    name: 'test event',
    detail: 'just a test',
  },
  {
    date: moment().hour(1).minute(0).second(0).millisecond(0),
    name: 'another test event',
    detail: 'just a test',
  },
];
```

## Schedule methods and properties
```ts
public rules: IRules;
public events: IEvent[];

public presentCurrentMonth(): Calendar;
public presentMonth(date: Date | moment.Moment | string): Calendar;
public presentCurrentDate(): CalendarDate;
public presentDate(date: Date | moment.Moment | string): CalendarDate;
```

## Calendar methods and properties
```ts
public items: ICalendarItem[];
public selected: ICalendarItem;

public select(item: ICalendarItem): void;
```

## CalendarDate methods and properties
```ts
public hours: ICalendarHour[];
public selected: ICalendarHour;

public select(hour: ICalendarHour): void;
```
