import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_EXITE, URL_EXITE_ID } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useExiteReducer } from '../../../store/reducers/exiteReducer/useExiteReducer';
import { ExiteRoutesEnum } from '../routes';
import { ExiteType } from '../types/ExiteType';

export const useExite = () => {
  const [exiteIdDelete, setExiteIdDelete] = useState<number | undefined>();
  const { exites, setExites } = useExiteReducer();
  const [exitesFiltered, setExitesFiltered] = useState<ExiteType[]>([]);
  const { request } = useRequests();
  const navigate = useNavigate();

  useEffect(() => {
    setExitesFiltered([...exites]);
  }, [exites]);

  useEffect(() => {
    request<ExiteType[]>(URL_EXITE, MethodsEnum.GET, setExites);
  }, []);

  const handleOnClickInsert = () => {
    navigate(ExiteRoutesEnum.EXITE_INSERT);
  };

  const onSearch = (value: string) => {
    if (!value) {
      setExitesFiltered([...exites]);
    } else {
      setExitesFiltered([
        ...exitesFiltered.filter((exite) => exite.id.toString().includes(value)),
        ...exitesFiltered.filter((exite) => exite.id_equipamento.toString().includes(value)),
      ]);
    }
  };

  const handleDeleteExite = async () => {
    await request(
      URL_EXITE_ID.replace('{saidasId}', `${exiteIdDelete}`),
      MethodsEnum.DELETE,
      undefined,
      undefined,
      'Saída excluída!',
    );
    await request<ExiteType[]>(URL_EXITE, MethodsEnum.GET, setExites);
    setExiteIdDelete(undefined);
  };

  const handleEditExite = async (exiteId: number) => {
    navigate(ExiteRoutesEnum.EXITE_EDIT.replace(':exiteId', `${exiteId}`));
  };

  const handleCloseModalDelete = () => {
    setExiteIdDelete(undefined);
  };
  const handleOpenModalDelete = (exiteId: number) => {
    setExiteIdDelete(exiteId);
  };

  return {
    exitesFiltered,
    openModalDelete: !!exiteIdDelete,
    handleOnClickInsert,
    onSearch,
    handleDeleteExite,
    handleEditExite,
    handleCloseModalDelete,
    handleOpenModalDelete,
  };
};
