import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
  totalBankAmount: 0,
  chargeRate: 1.85,
};

if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('bkash');
  if (saved) {
    const parsedData = JSON.parse(saved);
    Object.assign(initialState, {
      transactions: parsedData.transactions || [],
      totalBankAmount: parsedData.totalBankAmount || 0,
      chargeRate: parsedData.chargeRate || 1.85,
    });
  }
}

const bkashSlice = createSlice({
  name: 'bkash',
  initialState,
  reducers: {
    addBkashTransaction: (state, action) => {
      const { date, receivedFrom, amount, note } = action.payload;
      const charge = (amount * state.chargeRate) / 100;
      const bankAmount = amount - charge;

      const transaction = {
        id: Date.now().toString(),
        date,
        receivedFrom,
        amount,
        charge,
        bankAmount,
        note,
        createdAt: new Date().toISOString(),
      };

      state.transactions.push(transaction);
      state.totalBankAmount += bankAmount;

      if (typeof window !== 'undefined') {
        localStorage.setItem('bkash', JSON.stringify(state));
      }
    },

    deleteBkashTransaction: (state, action) => {
      const transaction = state.transactions.find(
        (t) => t.id === action.payload
      );
      if (transaction) {
        state.totalBankAmount -= transaction.bankAmount;
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.payload
        );

        if (typeof window !== 'undefined') {
          localStorage.setItem('bkash', JSON.stringify(state));
        }
      }
    },

    clearBkashTransactions: (state) => {
      state.transactions = [];
      state.totalBankAmount = 0;

      if (typeof window !== 'undefined') {
        localStorage.setItem('bkash', JSON.stringify(state));
      }
    },
  },
});

export const {
  addBkashTransaction,
  deleteBkashTransaction,
  clearBkashTransactions,
} = bkashSlice.actions;

export default bkashSlice.reducer;
