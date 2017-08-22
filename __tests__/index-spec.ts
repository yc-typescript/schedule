import * as index from '../src/index';

test('Should have Schedule available', () => {
  expect(index.Schedule).toBeTruthy();
  expect(index.Calendar).toBeTruthy();
  expect(index.CalendarDate).toBeTruthy();
});
