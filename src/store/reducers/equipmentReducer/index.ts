import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EquipmentType } from '../../../modules/equipment/type/EquipmentType';

interface EquipmentState {
  equipments: EquipmentType[];
  equipment?: EquipmentType;
}

const initialState: EquipmentState = {
  equipments: [],
  equipment: undefined,
};

export const counterSlice = createSlice({
  name: 'equipmentReducer',
  initialState,
  reducers: {
    setEquipmentsAction: (state, action: PayloadAction<EquipmentType[]>) => {
      state.equipments = action.payload;
    },
    setEquipmentAction: (state, action: PayloadAction<EquipmentType | undefined>) => {
      state.equipment = action.payload;
    },
  },
});

export const { setEquipmentsAction, setEquipmentAction } = counterSlice.actions;

export default counterSlice.reducer;
