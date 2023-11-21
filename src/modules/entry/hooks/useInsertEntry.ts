import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_ENTRY, URL_ENTRY_ID } from '../../../shared/constants/urls';
import { InsertEntry } from '../../../shared/dtos/InsertEntry.dto';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useEntryReducer } from '../../../store/reducers/entryReducer/useEntryReducer';
import { EntryRoutesEnum } from '../routes';

const DEFAULT_ENTRY = {
  quantidade: 1,
  preco: 0,
  observacao: '',
  id_usuario: 1,
  id_equipamento: 1,
};

export const useInsertEntry = (entryId?: string) => {
  const navigate = useNavigate();
  const { request } = useRequests();
  const { entry: entryReducer, setEntry: setEntryReducer } = useEntryReducer();
  const [loading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [entry, setEntry] = useState<InsertEntry>(DEFAULT_ENTRY);

  useEffect(() => {
    if (entry.quantidade && entry.preco) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [entry]);

  useEffect(() => {
    if (entryReducer) {
      setEntry({
        preco: entryReducer.preco,
        quantidade: entryReducer.quantidade,
        observacao: entryReducer.observacao,
        id_usuario: entryReducer.id_usuario,
        id_equipamento: entryReducer.id_equipamento,
      });
    }
  }, [entryReducer]);

  useEffect(() => {
    if (entryId) {
      setIsEdit(true);
      request(URL_ENTRY_ID.replace('{entradasId}', entryId), MethodsEnum.GET, setEntryReducer);
    } else {
      setEntryReducer(undefined);
      setEntry(DEFAULT_ENTRY);
    }
  }, [entryId]);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    setEntry({
      ...entry,
      [nameObject]: event.target.value,
    });
  };

  const handleChangeSelectEquipment = (value: string) => {
    setEntry({
      ...entry,
      id_equipamento: Number(value),
    });
  };

  const handleInsertEntry = async () => {
    if (entryId) {
      await request(
        URL_ENTRY_ID.replace('{entradasId}', entryId),
        MethodsEnum.PUT,
        undefined,
        entry,
        'Entrada modificada!',
      );
    } else {
      await request(URL_ENTRY, MethodsEnum.POST, undefined, entry, 'Entrada adicionada!');
    }
    navigate(EntryRoutesEnum.ENTRY);
  };

  return {
    entry,
    loading,
    disabledButton,
    isEdit,
    onChangeInput,
    handleInsertEntry,
    handleChangeSelectEquipment,
  };
};
