import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoanEquipmentType } from '../../../modules/loan/types/LoanEquipmentType';

interface LoanEquipmentState {
  loanEquipments: LoanEquipmentType[];
  loanEquipment?: LoanEquipmentType;
}

const initialState: LoanEquipmentState = {
  loanEquipments: [],
  loanEquipment: undefined,
};

export const counterSlice = createSlice({
  name: 'loanEquipmentReducer',
  initialState,
  reducers: {
    setLoanEquipmentsAction: (state, action: PayloadAction<LoanEquipmentType[]>) => {
      state.loanEquipments = action.payload;
    },
    setLoanEquipmentAction: (state, action: PayloadAction<LoanEquipmentType | undefined>) => {
      state.loanEquipment = action.payload;
    },
  },
});

export const { setLoanEquipmentsAction, setLoanEquipmentAction } = counterSlice.actions;

export default counterSlice.reducer;
