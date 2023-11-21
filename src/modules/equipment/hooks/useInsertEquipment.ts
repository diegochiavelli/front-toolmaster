import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_EQUIPMENT, URL_EQUIPMENT_ID } from '../../../shared/constants/urls';
import { InsertEquipment } from '../../../shared/dtos/InsertEquipment.dto';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useEquipmentReducer } from '../../../store/reducers/equipmentReducer/useEquipmentReducer';
import { EquipmentRoutesEnum } from '../routes';

const DEFAULT_EQUIPMENT = {
  nome: '',
  modelo: '',
  marca: '',
  quantidade: 0,
};

export const useInsertEquipment = (equipmentId?: string) => {
  const navigate = useNavigate();
  const { request } = useRequests();
  const { equipment: equipmentReducer, setEquipment: setEquipmentReducer } = useEquipmentReducer();
  const [loading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [equipment, setEquipment] = useState<InsertEquipment>(DEFAULT_EQUIPMENT);

  console.log('EQUIPAMENTOS', equipmentReducer);

  useEffect(() => {
    if (equipment.nome && equipment.modelo && equipment.marca) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [equipment]);

  useEffect(() => {
    if (equipmentReducer) {
      setEquipment({
        nome: equipmentReducer.nome,
        modelo: equipmentReducer.marca,
        marca: equipmentReducer.modelo,
        quantidade: equipmentReducer.quantidade,
      });
    }
  }, [equipmentReducer]);

  useEffect(() => {
    if (equipmentId) {
      setIsEdit(true);
      request(
        URL_EQUIPMENT_ID.replace('{equipamentosId}', equipmentId),
        MethodsEnum.GET,
        setEquipmentReducer,
      );
    } else {
      setEquipmentReducer(undefined);
      setEquipment(DEFAULT_EQUIPMENT);
    }
  }, [equipmentId]);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    setEquipment({
      ...equipment,
      [nameObject]: event.target.value,
    });
  };

  const handleInsertEquipment = async () => {
    if (equipmentId) {
      await request(
        URL_EQUIPMENT_ID.replace('{equipamentosId}', equipmentId),
        MethodsEnum.PUT,
        undefined,
        equipment,
        'Equipamento modificado!',
      );
    } else {
      await request(
        URL_EQUIPMENT,
        MethodsEnum.POST,
        undefined,
        equipment,
        'Equipamento adicionado!',
      );
    }
    navigate(EquipmentRoutesEnum.EQUIPMENT);
  };

  return {
    equipment,
    loading,
    disabledButton,
    isEdit,
    onChangeInput,
    handleInsertEquipment,
  };
};
