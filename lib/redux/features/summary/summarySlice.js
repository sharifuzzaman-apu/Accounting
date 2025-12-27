import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dailySummaries: {},
};

if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('summary');
  if (saved) {
    const parsedData = JSON.parse(saved);
    Object.assign(initialState, {
      dailySummaries: parsedData.dailySummaries || {},
    });
  }
}

const summarySlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {
    calculateDailySummary: (state, action) => {
      const {
        bkashTransactions = [],
        cashTransactions = [],
        expenses = [],
      } = action.payload;

      const summaryByDate = {};

      // Process bKash transactions
      bkashTransactions.forEach((transaction) => {
        const date = transaction.date;
        if (!summaryByDate[date]) {
          summaryByDate[date] = {
            income: {
              totalBkashReceived: 0,
              totalBankAmount: 0,
              totalBkashCharge: 0,
              totalCash: 0,
            },
            totalExpense: 0,
            balance: {
              bank: 0,
              cash: 0,
              total: 0,
            },
          };
        }

        summaryByDate[date].income.totalBkashReceived +=
          transaction.amount || 0;
        summaryByDate[date].income.totalBankAmount +=
          transaction.bankAmount || 0;
        summaryByDate[date].income.totalBkashCharge += transaction.charge || 0;
      });

      // Process cash transactions (only income)
      cashTransactions.forEach((transaction) => {
        if (transaction.type === 'income') {
          const date = transaction.date;
          if (!summaryByDate[date]) {
            summaryByDate[date] = {
              income: {
                totalBkashReceived: 0,
                totalBankAmount: 0,
                totalBkashCharge: 0,
                totalCash: 0,
              },
              totalExpense: 0,
              balance: {
                bank: 0,
                cash: 0,
                total: 0,
              },
            };
          }

          summaryByDate[date].income.totalCash += transaction.amount || 0;
        }
      });

      // Process expenses
      expenses.forEach((expense) => {
        const date = expense.date;
        if (!summaryByDate[date]) {
          summaryByDate[date] = {
            income: {
              totalBkashReceived: 0,
              totalBankAmount: 0,
              totalBkashCharge: 0,
              totalCash: 0,
            },
            totalExpense: 0,
            balance: {
              bank: 0,
              cash: 0,
              total: 0,
            },
          };
        }

        summaryByDate[date].totalExpense += expense.amount || 0;
      });

      // Calculate balances
      Object.keys(summaryByDate).forEach((date) => {
        const summary = summaryByDate[date];

        summary.balance.bank = summary.income.totalBankAmount;
        summary.balance.cash = summary.income.totalCash - summary.totalExpense;
        summary.balance.total = summary.balance.bank + summary.balance.cash;
      });

      state.dailySummaries = summaryByDate;

      if (typeof window !== 'undefined') {
        localStorage.setItem('summary', JSON.stringify(state));
      }
    },

    clearSummaries: (state) => {
      state.dailySummaries = {};

      if (typeof window !== 'undefined') {
        localStorage.setItem('summary', JSON.stringify(state));
      }
    },
  },
});

export const { calculateDailySummary, clearSummaries } = summarySlice.actions;

export default summarySlice.reducer;
