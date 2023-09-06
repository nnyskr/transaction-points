import { useEffect } from 'react';
import { useTransactions } from '../store/transactions';
import UsersPointsTableRow from './users-points-table-row';

export default function UsersPoints() {
  const {
    usersPoints,
    months,
    shouldDisplayLoader,
    loadingTransactionsError,
    getTransactions,
  } = useTransactions();

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  function handleReloadClick() {
    getTransactions();
  }

  const render = () => {
    if (shouldDisplayLoader) {
      return <progress max="100" />;
    }
    if (loadingTransactionsError) {
      return (
        <blockquote>
          <p>{loadingTransactionsError}</p>
          <footer>
            <button onClick={handleReloadClick}>Load again</button>
          </footer>
        </blockquote>
      );
    }
    if (!usersPoints?.length || !months?.length) {
      return (
        <blockquote>
          <p>No transaction data found</p>
          <footer>
            <button onClick={handleReloadClick}>Load again</button>
          </footer>
        </blockquote>
      );
    }
    return (
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            {months.map((month) => (
              <th key={month}>{month}</th>
            ))}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {usersPoints.map((userPoints) => (
            <UsersPointsTableRow
              key={userPoints.userId}
              userPoints={userPoints}
              months={months}
            />
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <section>
      <h2>Users points</h2>
      {render()}
    </section>
  );
}
