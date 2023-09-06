import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import transactionsFixture from '../fixtures/transactions.json';
import UsersPoints from './users-points';
import * as transactionsApi from '../api/transactions';
import { TransactionsProvider } from '../store/transactions';

describe('UsersPoints', () => {
  it('displays loading state when shouldDisplayLoader is true', async () => {
    jest.spyOn(transactionsApi, 'getTransactions').mockResolvedValue({
      ok: true,
      data: transactionsFixture,
    });

    render(
      <TransactionsProvider>
        <UsersPoints />
      </TransactionsProvider>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
  });

  it('displays the table', async () => {
    jest.spyOn(transactionsApi, 'getTransactions').mockResolvedValue({
      ok: true,
      data: transactionsFixture,
    });

    render(
      <TransactionsProvider>
        <UsersPoints />
      </TransactionsProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('User ID')).toBeInTheDocument();
    });

    const firstRow = screen.getByRole('row', {
      name: /User ID 2020-1 2020-2 2020-3 Total/,
    });
    expect(firstRow).toBeInTheDocument();

    const lastRow = screen.getByRole('row', { name: /5 0 264 264/ });
    expect(lastRow).toBeInTheDocument();

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('displays error message when API request fails', async () => {
    jest
      .spyOn(transactionsApi, 'getTransactions')
      .mockRejectedValue(new Error('API request failed'));

    render(
      <TransactionsProvider>
        <UsersPoints />
      </TransactionsProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText('Could not load transactions')
      ).toBeInTheDocument();
    });

    expect(screen.getByText('Load again')).toBeInTheDocument();

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
});
