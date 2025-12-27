import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loans: [],
  totalLoanTaken: 0,
  totalLoanPaid: 0,
  totalLoanRemaining: 0,
};

if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('loan');
  if (saved) {
    const parsedData = JSON.parse(saved);
    Object.assign(initialState, {
      loans: parsedData.loans || [],
      totalLoanTaken: parsedData.totalLoanTaken || 0,
      totalLoanPaid: parsedData.totalLoanPaid || 0,
      totalLoanRemaining: parsedData.totalLoanRemaining || 0,
    });
  }
}

const loanSlice = createSlice({
  name: 'loan',
  initialState,
  reducers: {
    addLoan: (state, action) => {
      const { date, receivedFrom, amount, note } = action.payload;

      const loan = {
        id: Date.now().toString(),
        date,
        receivedFrom,
        amount,
        paidAmount: 0,
        remainingAmount: amount,
        note,
        payments: [],
        createdAt: new Date().toISOString(),
      };

      state.loans.push(loan);
      state.totalLoanTaken += amount;
      state.totalLoanRemaining += amount;

      if (typeof window !== 'undefined') {
        localStorage.setItem('loan', JSON.stringify(state));
      }
    },

    repayLoan: (state, action) => {
      const { loanId, date, amount, note } = action.payload;
      const loan = state.loans.find((l) => l.id === loanId);

      if (loan) {
        loan.payments.push({
          id: Date.now().toString(),
          date,
          amount,
          note,
          createdAt: new Date().toISOString(),
        });

        loan.paidAmount += amount;
        loan.remainingAmount -= amount;

        state.totalLoanPaid += amount;
        state.totalLoanRemaining -= amount;

        if (typeof window !== 'undefined') {
          localStorage.setItem('loan', JSON.stringify(state));
        }
      }
    },

    deleteLoan: (state, action) => {
      const loan = state.loans.find((l) => l.id === action.payload);
      if (loan) {
        state.totalLoanTaken -= loan.amount;
        state.totalLoanPaid -= loan.paidAmount;
        state.totalLoanRemaining -= loan.remainingAmount;
        state.loans = state.loans.filter((l) => l.id !== action.payload);

        if (typeof window !== 'undefined') {
          localStorage.setItem('loan', JSON.stringify(state));
        }
      }
    },

    clearLoans: (state) => {
      state.loans = [];
      state.totalLoanTaken = 0;
      state.totalLoanPaid = 0;
      state.totalLoanRemaining = 0;

      if (typeof window !== 'undefined') {
        localStorage.setItem('loan', JSON.stringify(state));
      }
    },
  },
});

export const { addLoan, repayLoan, deleteLoan, clearLoans } = loanSlice.actions;

export default loanSlice.reducer;
