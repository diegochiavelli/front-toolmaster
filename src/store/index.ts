import { configureStore } from '@reduxjs/toolkit';

import collaboratorReducer from './reducers/collaboratorReducer';
import globalReducer from './reducers/globalReducer';

export const store = configureStore({
  reducer: {
    collaboratorReducer,
    globalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
