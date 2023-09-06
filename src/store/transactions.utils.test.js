const {
  getPointsForCost,
  getUsersPointsWithMonths,
  sortMonthYearKeys,
} = require('./transactions.utils');

describe('getPointsForCost', () => {
  test('calculates 0 points for cost under or equal to 50', () => {
    expect(getPointsForCost(-30)).toBe(0);
    expect(getPointsForCost(0)).toBe(0);
    expect(getPointsForCost(49.99)).toBe(0);
    expect(getPointsForCost(50)).toBe(0);
  });

  test('calculates points correctly for cost between 50 and 100', () => {
    expect(getPointsForCost(51.98)).toBe(1);
    expect(getPointsForCost(75)).toBe(25);
    expect(getPointsForCost(90)).toBe(40);
    expect(getPointsForCost(99.5)).toBe(49);
    expect(getPointsForCost(100)).toBe(50);
  });

  test('calculates points correctly for cost over 100', () => {
    expect(getPointsForCost(100.99)).toBe(50);
    expect(getPointsForCost(120)).toBe(90);
    expect(getPointsForCost(150)).toBe(150);
  });

  test('throws an error for non-numeric cost', () => {
    expect(() => getPointsForCost('invalid')).toThrowError(
      'Cost must be a valid number.'
    );
    expect(() => getPointsForCost(null)).toThrowError(
      'Cost must be a valid number.'
    );
  });
});

describe('getUsersPoints', () => {
  test('calculates user points correctly from transactions', () => {
    const transactions = [
      { userId: 1, cost: 120, date: '2020-01-01' },
      { userId: 1, cost: 90, date: '2020-01-01' },
      { userId: 1, cost: 75, date: '2020-02-02' },
      { userId: 1, cost: 200, date: '2020-03-15' },

      { userId: 2, cost: 40, date: '2020-01-05' },
      { userId: 2, cost: 70, date: '2020-01-05' },
      { userId: 2, cost: 60, date: '2020-03-20' },
    ];

    const expectedUserPoints = [
      { '2020-1': 130, '2020-2': 25, '2020-3': 250, total: 405, userId: 1 },
      { '2020-1': 20, '2020-3': 10, total: 30, userId: 2 },
    ];

    const { usersPoints } = getUsersPointsWithMonths(transactions);
    expect(usersPoints).toEqual(expectedUserPoints);
  });

  test('throws an error for non-array transactions', () => {
    expect(() => getUsersPointsWithMonths(null)).toThrowError(
      'Transactions must be an array.'
    );
    expect(() => getUsersPointsWithMonths('invalid')).toThrowError(
      'Transactions must be an array.'
    );
    expect(() => getUsersPointsWithMonths({})).toThrowError(
      'Transactions must be an array.'
    );
  });
});

describe('Sort month-year strings', () => {
  test('sorts month-year strings from early to late', () => {
    const months = ['2020-1', '2020-3', '2020-2'];
    const sortedMonths = months.sort(sortMonthYearKeys);

    expect(sortedMonths).toEqual(['2020-1', '2020-2', '2020-3']);
  });

  test('sorts month-year strings with different years', () => {
    const months = ['2022-2', '2020-3', '2021-1'];
    const sortedMonths = months.sort(sortMonthYearKeys);
    expect(sortedMonths).toEqual(['2020-3', '2021-1', '2022-2']);
  });

  test('handles single-digit months and years', () => {
    const months = ['2020-10', '2021-11', '2020-9'];
    const sortedMonths = months.sort(sortMonthYearKeys);
    expect(sortedMonths).toEqual(['2020-9', '2020-10', '2021-11']);
  });

  test('handles already sorted array', () => {
    const months = ['2020-1', '2020-2', '2020-3'];
    const sortedMonths = months.sort(sortMonthYearKeys);

    expect(sortedMonths).toEqual(['2020-1', '2020-2', '2020-3']);
  });

  test('handles an empty array', () => {
    const months = [];
    const sortedMonths = months.sort(sortMonthYearKeys);

    expect(sortedMonths).toEqual([]);
  });
});
