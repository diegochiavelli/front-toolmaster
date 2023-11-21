import { useDispatch } from 'react-redux';

import { EquipmentType } from '../../../modules/equipment/type/EquipmentType';
import { useAppSelector } from '../../hooks';
import { setEquipmentAction, setEquipmentsAction } from '.';

export const useEquipmentReducer = () => {
  const dispatch = useDispatch();
  const { equipments, equipment } = useAppSelector((state) => state.equipmentReducer);

  const setEquipments = (currentEquipments: EquipmentType[]) => {
    dispatch(setEquipmentsAction(currentEquipments));
  };

  const setEquipment = (currentEquipment?: EquipmentType) => {
    dispatch(setEquipmentAction(currentEquipment));
  };

  return {
    equipment,
    equipments,
    setEquipments,
    setEquipment,
  };
};
