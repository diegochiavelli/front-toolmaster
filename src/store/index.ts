import { configureStore } from '@reduxjs/toolkit';

import collaboratorReducer from './reducers/collaboratorReducer';
import entryReducer from './reducers/entryReducer';
import equipmentReducer from './reducers/equipmentReducer';
import exiteReducer from './reducers/exiteReducer';
import globalReducer from './reducers/globalReducer';
import loanEquipmentReducer from './reducers/loanEquipmentReducer';
import loanReducer from './reducers/loanReducer';
import userReducer from './reducers/userReducer';

export const store = configureStore({
  reducer: {
    collaboratorReducer,
    equipmentReducer,
    entryReducer,
    exiteReducer,
    userReducer,
    loanReducer,
    loanEquipmentReducer,
    globalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
