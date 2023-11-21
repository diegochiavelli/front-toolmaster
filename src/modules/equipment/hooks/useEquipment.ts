import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_EQUIPMENT, URL_EQUIPMENT_ID } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useEquipmentReducer } from '../../../store/reducers/equipmentReducer/useEquipmentReducer';
import { EquipmentRoutesEnum } from '../routes';
import { EquipmentType } from '../type/EquipmentType';

export const useEquipment = () => {
  const [equipmentIdDelete, setEquipmentIdDelete] = useState<number | undefined>();
  const { equipments, setEquipments } = useEquipmentReducer();
  const [equipmentsFiltered, setEquipmentsFiltered] = useState<EquipmentType[]>([]);
  const { request } = useRequests();
  const navigate = useNavigate();

  useEffect(() => {
    setEquipmentsFiltered([...equipments]);
  }, [equipments]);

  useEffect(() => {
    request<EquipmentType[]>(URL_EQUIPMENT, MethodsEnum.GET, setEquipments);
  }, []);

  const handleOnClickInsert = () => {
    navigate(EquipmentRoutesEnum.EQUIPMENT_INSERT);
  };

  const onSearch = (value: string) => {
    if (!value) {
      setEquipmentsFiltered([...equipments]);
    } else {
      setEquipmentsFiltered([
        ...equipmentsFiltered.filter((equipment) => equipment.nome.includes(value)),
        ...equipmentsFiltered.filter((equipment) => equipment.id.toString().includes(value)),
      ]);
    }
  };

  const handleDeleteEquipment = async () => {
    await request(
      URL_EQUIPMENT_ID.replace('{equipamentosId}', `${equipmentIdDelete}`),
      MethodsEnum.DELETE,
      undefined,
      undefined,
      'Equipamento excluído!',
    );
    await request<EquipmentType[]>(URL_EQUIPMENT, MethodsEnum.GET, setEquipments);
    setEquipmentIdDelete(undefined);
  };

  const handleEditEquipment = async (equipmentId: number) => {
    navigate(EquipmentRoutesEnum.EQUIPMENT_EDIT.replace(':equipmentId', `${equipmentId}`));
  };

  const handleCloseModalDelete = () => {
    setEquipmentIdDelete(undefined);
  };

  const handleOpenModalDelete = (equipmentId: number) => {
    setEquipmentIdDelete(equipmentId);
  };

  return {
    equipmentsFiltered,
    openModalDelete: !!equipmentIdDelete,
    handleOnClickInsert,
    onSearch,
    handleDeleteEquipment,
    handleEditEquipment,
    handleCloseModalDelete,
    handleOpenModalDelete,
  };
};
