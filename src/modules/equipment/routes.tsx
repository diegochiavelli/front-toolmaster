import { RouteObject } from 'react-router-dom';

import Equipment from './screens/Equipment';
import EquipmentInsert from './screens/EquipmentInsert';

export enum EquipmentRoutesEnum {
  EQUIPMENT = '/equipment',
  EQUIPMENT_INSERT = '/equipment/insert',
  EQUIPMENT_EDIT = '/equipment/:equipmentId',
}
export const equipmentScreens: RouteObject[] = [
  {
    path: EquipmentRoutesEnum.EQUIPMENT,
    element: <Equipment />,
  },
  {
    path: EquipmentRoutesEnum.EQUIPMENT_INSERT,
    element: <EquipmentInsert />,
  },
  {
    path: EquipmentRoutesEnum.EQUIPMENT_EDIT,
    element: <EquipmentInsert />,
  },
];
