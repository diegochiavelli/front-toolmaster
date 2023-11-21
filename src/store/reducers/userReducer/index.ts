import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserType } from '../../../modules/user/types/UserType';

interface UserState {
  users: UserType[];
  user?: UserType;
}

const initialState: UserState = {
  users: [],
  user: undefined,
};

export const counterSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setUsersAction: (state, action: PayloadAction<UserType[]>) => {
      state.users = action.payload;
    },
    setUserAction: (state, action: PayloadAction<UserType | undefined>) => {
      state.user = action.payload;
    },
  },
});

export const { setUsersAction, setUserAction } = counterSlice.actions;

export default counterSlice.reducer;
