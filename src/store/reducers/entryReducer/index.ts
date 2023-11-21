import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EntryType } from '../../../modules/entry/types/EntryType';

interface EntryState {
  entrys: EntryType[];
  entry?: EntryType;
}

const initialState: EntryState = {
  entrys: [],
  entry: undefined,
};

export const counterSlice = createSlice({
  name: 'entryReducer',
  initialState,
  reducers: {
    setEntrysAction: (state, action: PayloadAction<EntryType[]>) => {
      state.entrys = action.payload;
    },
    setEntryAction: (state, action: PayloadAction<EntryType | undefined>) => {
      state.entry = action.payload;
    },
  },
});

export const { setEntrysAction, setEntryAction } = counterSlice.actions;

export default counterSlice.reducer;
