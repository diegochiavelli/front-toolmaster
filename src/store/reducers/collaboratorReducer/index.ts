import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CollaboratorType } from '../../../modules/collaborator/types/CollaboratorType';

interface CollaboratorState {
  collaborators: CollaboratorType[];
  collaborator?: CollaboratorType;
}

const initialState: CollaboratorState = {
  collaborators: [],
  collaborator: undefined,
};

export const counterSlice = createSlice({
  name: 'collaboratorReducer',
  initialState,
  reducers: {
    setCollaboratorsAction: (state, action: PayloadAction<CollaboratorType[]>) => {
      state.collaborators = action.payload;
    },
    setCollaboratorAction: (state, action: PayloadAction<CollaboratorType | undefined>) => {
      state.collaborator = action.payload;
    },
  },
});

export const { setCollaboratorsAction, setCollaboratorAction } = counterSlice.actions;

export default counterSlice.reducer;
