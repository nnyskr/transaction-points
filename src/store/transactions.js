import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from 'react';
import * as transactionsApi from '../api/transactions';
import { getUsersPointsWithMonths } from './transactions.utils';

const initialState = {
  transactions: null,
  isLoadingTransactions: false,
  loadingTransactionsError: null,
};

const TransactionsContext = createContext(null);

const transactionsReducer = (state, action) => {
  switch (action.type) {
    case 'GET_TRANSACTIONS':
      return {
        ...state,
        isLoadingTransactions: true,
        loadingTransactionsError: null,
      };
    case 'GET_TRANSACTIONS_SUCCESS':
      return {
        ...state,
        isLoadingTransactions: false,
        transactions: action.payload,
      };
    case 'GET_TRANSACTIONS_FAILURE':
      return {
        ...state,
        isLoadingTransactions: false,
        loadingTransactionsError: action.error,
      };
    default:
      return state;
  }
};

export const TransactionsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionsReducer, initialState);

  const getTransactions = useCallback(async () => {
    dispatch({ type: 'GET_TRANSACTIONS' });
    try {
      const response = await transactionsApi.getTransactions();
      if (!response.ok) {
        throw new Error('API request getTransactions() failed');
      }
      dispatch({ type: 'GET_TRANSACTIONS_SUCCESS', payload: response.data });
    } catch (error) {
      console.error('actions[getTransactionsError]', error);
      dispatch({
        type: 'GET_TRANSACTIONS_FAILURE',
        error: 'Could not load transactions',
      });
    }
  }, []);

  const shouldDisplayLoader = useMemo(() => {
    if (state.isLoadingTransactions) {
      return true;
    }
    if (state.transactions === null && !state.loadingTransactionsError) {
      return true;
    }
    return false;
  }, [
    state.transactions,
    state.isLoadingTransactions,
    state.loadingTransactionsError,
  ]);

  const { usersPoints, months } = useMemo(() => {
    if (!state.transactions) {
      return { usersPoints: null, months: null };
    }

    return getUsersPointsWithMonths(state.transactions);
  }, [state.transactions]);

  return (
    <TransactionsContext.Provider
      value={{
        // Selectors
        transactions: state.transactions,
        isLoadingTransactions: state.isLoadingTransactions,
        loadingTransactionsError: state.loadingTransactionsError,
        shouldDisplayLoader,
        usersPoints,
        months,

        // Actions
        getTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error(
      'useTransactions must be used within a TransactionsProvider'
    );
  }
  return context;
};
