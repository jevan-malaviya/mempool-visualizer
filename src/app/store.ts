import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from '../transactions/transactions-slice';

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;