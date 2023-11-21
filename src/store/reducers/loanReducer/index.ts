import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoanType } from '../../../modules/loan/types/LoanType';

interface LoanState {
  loans: LoanType[];
  loan?: LoanType;
}

const initialState: LoanState = {
  loans: [],
  loan: undefined,
};

export const counterSlice = createSlice({
  name: 'loanReducer',
  initialState,
  reducers: {
    setLoansAction: (state, action: PayloadAction<LoanType[]>) => {
      state.loans = action.payload;
    },
    setLoanAction: (state, action: PayloadAction<LoanType | undefined>) => {
      state.loan = action.payload;
    },
  },
});

export const { setLoansAction, setLoanAction } = counterSlice.actions;

export default counterSlice.reducer;
