import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
  totalCash: 0,
};

if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('cash');
  if (saved) {
    const parsedData = JSON.parse(saved);
    Object.assign(initialState, {
      transactions: parsedData.transactions || [],
      totalCash: parsedData.totalCash || 0,
    });
  }
}

const cashSlice = createSlice({
  name: 'cash',
  initialState,
  reducers: {
    addCashTransaction: (state, action) => {
      const { date, receivedFrom, amount, note } = action.payload;

      const transaction = {
        id: Date.now().toString(),
        date,
        receivedFrom,
        amount,
        note,
        type: 'income',
        createdAt: new Date().toISOString(),
      };

      state.transactions.push(transaction);
      state.totalCash += amount;

      if (typeof window !== 'undefined') {
        localStorage.setItem('cash', JSON.stringify(state));
      }
    },

    deductCash: (state, action) => {
      const { date, paidTo, amount, note, expenseId } = action.payload;

      const transaction = {
        id: expenseId || Date.now().toString(),
        date,
        receivedFrom: `Expense:  ${paidTo}`,
        amount: -amount,
        note,
        type: 'expense',
        createdAt: new Date().toISOString(),
      };

      state.transactions.push(transaction);
      state.totalCash -= amount;

      if (typeof window !== 'undefined') {
        localStorage.setItem('cash', JSON.stringify(state));
      }
    },

    addCashBack: (state, action) => {
      const { expenseId, amount } = action.payload;

      state.transactions = state.transactions.filter((t) => t.id !== expenseId);
      state.totalCash += amount;

      if (typeof window !== 'undefined') {
        localStorage.setItem('cash', JSON.stringify(state));
      }
    },

    deleteCashTransaction: (state, action) => {
      const transaction = state.transactions.find(
        (t) => t.id === action.payload
      );
      if (transaction) {
        state.totalCash -= transaction.amount;
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.payload
        );

        if (typeof window !== 'undefined') {
          localStorage.setItem('cash', JSON.stringify(state));
        }
      }
    },

    clearCashTransactions: (state) => {
      state.transactions = [];
      state.totalCash = 0;

      if (typeof window !== 'undefined') {
        localStorage.setItem('cash', JSON.stringify(state));
      }
    },
  },
});

export const {
  addCashTransaction,
  deductCash,
  addCashBack,
  deleteCashTransaction,
  clearCashTransactions,
} = cashSlice.actions;

export default cashSlice.reducer;
