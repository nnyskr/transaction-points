export function MonthsPointsCells({ userPoints, months }) {
  return (
    <>
      {months.map((month) => (
        <td key={month}>{userPoints[month]}</td>
      ))}
    </>
  );
}

export default function UsersPointsTableRow({ userPoints, months }) {
  return (
    <tr key={userPoints.userId}>
      <td>{userPoints.userId}</td>
      <MonthsPointsCells userPoints={userPoints} months={months} />
      <td>{userPoints.total}</td>
    </tr>
  );
}
