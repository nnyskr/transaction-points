export function createTransactionsFixture(length = 100) {
  const transactions = [];

  const userIds = [1, 2, 3, 4, 5];
  const startDate = new Date('2020-01-01');
  const endDate = new Date('2020-03-31');

  for (let i = 1; i <= length; i++) {
    const transaction = {
      id: i,
      userId: userIds[Math.floor(Math.random() * userIds.length)],
      date: new Date(
        startDate.getTime() +
          Math.random() * (endDate.getTime() - startDate.getTime())
      ),
      cost: parseFloat((40 + Math.random() * 210).toFixed(2)),
    };
    transactions.push(transaction);
  }
  return transactions;
}
