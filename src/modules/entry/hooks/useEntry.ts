import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_ENTRY, URL_ENTRY_ID } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useEntryReducer } from '../../../store/reducers/entryReducer/useEntryReducer';
import { EntryRoutesEnum } from '../routes';
import { EntryType } from '../types/EntryType';

export const useEntry = () => {
  const [entryIdDelete, setEntryIdDelete] = useState<number | undefined>();
  const { entrys, setEntrys } = useEntryReducer();
  const [entrysFiltered, setEntrysFiltered] = useState<EntryType[]>([]);
  const { request } = useRequests();
  const navigate = useNavigate();

  useEffect(() => {
    setEntrysFiltered([...entrys]);
  }, [entrys]);

  useEffect(() => {
    request<EntryType[]>(URL_ENTRY, MethodsEnum.GET, setEntrys);
  }, []);

  const handleOnClickInsert = () => {
    navigate(EntryRoutesEnum.ENTRY_INSERT);
  };

  const onSearch = (value: string) => {
    if (!value) {
      setEntrysFiltered([...entrys]);
    } else {
      setEntrysFiltered([
        ...entrysFiltered.filter((entry) => entry.id.toString().includes(value)),
        ...entrysFiltered.filter((entry) => entry.id_equipamento.toString().includes(value)),
      ]);
    }
  };

  const handleDeleteEntry = async () => {
    await request(
      URL_ENTRY_ID.replace('{entradasId}', `${entryIdDelete}`),
      MethodsEnum.DELETE,
      undefined,
      undefined,
      'Entrada excluída!',
    );
    await request<EntryType[]>(URL_ENTRY, MethodsEnum.GET, setEntrys);
    setEntryIdDelete(undefined);
  };

  const handleEditEntry = async (entryId: number) => {
    navigate(EntryRoutesEnum.ENTRY_EDIT.replace(':entryId', `${entryId}`));
  };

  const handleCloseModalDelete = () => {
    setEntryIdDelete(undefined);
  };
  const handleOpenModalDelete = (entryId: number) => {
    setEntryIdDelete(entryId);
  };

  return {
    entrysFiltered,
    openModalDelete: !!entryIdDelete,
    handleOnClickInsert,
    onSearch,
    handleDeleteEntry,
    handleEditEntry,
    handleCloseModalDelete,
    handleOpenModalDelete,
  };
};
