import React from 'react';
import { render, screen } from '@testing-library/react';
import UsersPointsTableRow, {
  MonthsPointsCells,
} from './users-points-table-row';

describe('UsersPointsTableRow component', () => {
  const userPoints = {
    userId: 1,
    total: 100,
    '2022-1': 20,
    '2022-2': 30,
    '2022-3': 50,
  };
  const months = ['2022-1', '2022-2', '2022-3'];

  it('renders a table row with user data', () => {
    render(
      <table>
        <tbody>
          <UsersPointsTableRow userPoints={userPoints} months={months} />
        </tbody>
      </table>
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });
});

describe('MonthsPointsCells component', () => {
  const userPoints = {
    userId: 1,
    total: 100,
    '2022-1': 20,
    '2022-2': 30,
    '2022-3': 50,
  };
  const months = ['2022-1', '2022-2', '2022-3'];

  it('renders table cells with user points for each month', () => {
    render(
      <table>
        <tbody>
          <tr>
            <MonthsPointsCells userPoints={userPoints} months={months} />
          </tr>
        </tbody>
      </table>
    );

    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.queryByText('100')).not.toBeInTheDocument();
  });
});
