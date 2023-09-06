import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CollaboratorType } from '../../../modules/collaborator/types/CollaboratorType';

interface CollaboratorState {
  collaborators: CollaboratorType[];
}

const initialState: CollaboratorState = {
  collaborators: [],
};

export const counterSlice = createSlice({
  name: 'collaboratorReducer',
  initialState,
  reducers: {
    setCollaboratorsAction: (state, action: PayloadAction<CollaboratorType[]>) => {
      state.collaborators = action.payload;
    },
  },
});

export const { setCollaboratorsAction } = counterSlice.actions;

export default counterSlice.reducer;
