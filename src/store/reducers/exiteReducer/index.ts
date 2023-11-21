import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ExiteType } from '../../../modules/exite/types/ExiteType';

interface ExiteState {
  exites: ExiteType[];
  exite?: ExiteType;
}

const initialState: ExiteState = {
  exites: [],
  exite: undefined,
};

export const counterSlice = createSlice({
  name: 'exiteReducer',
  initialState,
  reducers: {
    setExitesAction: (state, action: PayloadAction<ExiteType[]>) => {
      state.exites = action.payload;
    },
    setExiteAction: (state, action: PayloadAction<ExiteType | undefined>) => {
      state.exite = action.payload;
    },
  },
});

export const { setExitesAction, setExiteAction } = counterSlice.actions;

export default counterSlice.reducer;
