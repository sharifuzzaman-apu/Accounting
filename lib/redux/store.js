import { configureStore } from '@reduxjs/toolkit';
import bkashReducer from './features/bkash/bkashSlice';
import cashReducer from './features/cash/cashSlice';
import expenseReducer from './features/expense/expenseSlice';
import loanReducer from './features/loan/loanSlice';
import summaryReducer from './features/summary/summarySlice';

export const store = configureStore({
  reducer: {
    bkash: bkashReducer,
    cash: cashReducer,
    expense: expenseReducer,
    loan: loanReducer,
    summary: summaryReducer,
  },
});
