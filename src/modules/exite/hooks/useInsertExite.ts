import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_EXITE, URL_EXITE_ID } from '../../../shared/constants/urls';
import { InsertExite } from '../../../shared/dtos/InsertExite.dto';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useExiteReducer } from '../../../store/reducers/exiteReducer/useExiteReducer';
import { ExiteRoutesEnum } from '../routes';

const DEFAULT_EXITE = {
  quantidade: 0,
  observacao: '',
  id_usuario: 1,
  id_equipamento: 0,
};

export const useInsertExite = (exiteId?: string) => {
  const navigate = useNavigate();
  const { request } = useRequests();
  const { exite: exiteReducer, setExite: setExiteReducer } = useExiteReducer();
  const [loading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [exite, setExite] = useState<InsertExite>(DEFAULT_EXITE);

  useEffect(() => {
    if (exite.id_equipamento && exite.quantidade) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [exite]);

  useEffect(() => {
    if (exiteReducer) {
      setExite({
        quantidade: exiteReducer.quantidade,
        observacao: exiteReducer.observacao,
        id_usuario: exiteReducer.id_usuario,
        id_equipamento: exiteReducer.id_equipamento,
      });
    }
  }, [exiteReducer]);

  useEffect(() => {
    if (exiteId) {
      setIsEdit(true);
      request(URL_EXITE_ID.replace('{saidasId}', exiteId), MethodsEnum.GET, setExiteReducer);
    } else {
      setExiteReducer(undefined);
      setExite(DEFAULT_EXITE);
    }
  }, [exiteId]);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    setExite({
      ...exite,
      [nameObject]: event.target.value,
    });
  };

  const handleChangeSelectEquipment = (value: string) => {
    setExite({
      ...exite,
      id_equipamento: Number(value),
    });
  };

  const handleInsertExite = async () => {
    if (exiteId) {
      await request(
        URL_EXITE_ID.replace('{saidasId}', exiteId),
        MethodsEnum.PUT,
        undefined,
        exite,
        'Saída modificada!',
      );
    } else {
      await request(URL_EXITE, MethodsEnum.POST, undefined, exite, 'Saída adicionada!');
    }
    navigate(ExiteRoutesEnum.EXITE);
  };

  return {
    exite,
    loading,
    disabledButton,
    isEdit,
    onChangeInput,
    handleInsertExite,
    handleChangeSelectEquipment,
  };
};
