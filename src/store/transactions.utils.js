export function getUsersPointsWithMonths(transactions) {
  if (!Array.isArray(transactions)) {
    throw new Error('Transactions must be an array.');
  }

  const usersPointsMap = {};
  const monthsMap = {};

  for (const { userId, cost, date } of transactions) {
    const transactionDate = new Date(date);
    const month = transactionDate.getMonth() + 1;
    const year = transactionDate.getFullYear();
    const monthYearKey = `${year}-${month}`;
    const points = getPointsForCost(cost);

    monthsMap[monthYearKey] = true;

    if (!usersPointsMap[userId]) {
      usersPointsMap[userId] = {
        total: 0,
      };
    }

    if (!usersPointsMap[userId][monthYearKey]) {
      usersPointsMap[userId][monthYearKey] = 0;
    }

    usersPointsMap[userId][monthYearKey] += points;
    usersPointsMap[userId].total += points;
  }

  const usersPoints = Object.entries(usersPointsMap).map(
    ([userId, userData]) => ({ userId: Number(userId), ...userData })
  );

  const months = Object.keys(monthsMap).sort(sortMonthYearKeys);

  return { usersPoints, months };
}

export function getPointsForCost(cost) {
  if (typeof cost !== 'number' || isNaN(cost)) {
    throw new Error('Cost must be a valid number.');
  }

  let points = 0;

  if (cost > 100) {
    points += Math.floor(cost - 100) * 2;
  }

  if (cost > 50) {
    points += Math.floor(Math.min(cost - 50, 50));
  }

  return points;
}

export function sortMonthYearKeys(a, b) {
  const [yearA, monthA] = a.split('-');
  const [yearB, monthB] = b.split('-');

  if (yearA !== yearB) {
    return yearA - yearB;
  }

  return monthA - monthB;
}
