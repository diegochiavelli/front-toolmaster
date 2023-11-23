import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_COLLABORATOR, URL_COLLABORATOR_ID } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useCollaboratorReducer } from '../../../store/reducers/collaboratorReducer/useCollaboratorReducer';
import { CollaboratorRoutesEnum } from '../routes';
import { CollaboratorType } from '../types/CollaboratorType';

export const useCollaborator = () => {
  const [collaboratorIdDelete, setCollaboratorIdDelete] = useState<number | undefined>();
  const { collaborators, setCollaborators } = useCollaboratorReducer();
  const [collaboratorsFiltered, setCollaboratorsFiltered] = useState<CollaboratorType[]>([]);
  const { request } = useRequests();
  const navigate = useNavigate();

  useEffect(() => {
    setCollaboratorsFiltered([...collaborators]);
  }, [collaborators]);

  useEffect(() => {
    request<CollaboratorType[]>(URL_COLLABORATOR, MethodsEnum.GET, setCollaborators);
  }, []);

  const handleOnClickInsert = () => {
    navigate(CollaboratorRoutesEnum.COLLABORATOR_INSERT);
  };

  const onSearch = (value: string) => {
    if (!value) {
      setCollaboratorsFiltered([...collaborators]);
    } else {
      setCollaboratorsFiltered([
        ...collaboratorsFiltered.filter((collaborator) =>
          collaborator.nome.toUpperCase().includes(value.toUpperCase()),
        ),
        ...collaboratorsFiltered.filter((collaborator) =>
          collaborator.id.toString().includes(value),
        ),
      ]);
    }
  };

  const handleDeleteCollaborator = async () => {
    await request(
      URL_COLLABORATOR_ID.replace('{funcionariosId}', `${collaboratorIdDelete}`),
      MethodsEnum.DELETE,
      undefined,
      undefined,
      'Colaborador excluído!',
    );
    await request<CollaboratorType[]>(URL_COLLABORATOR, MethodsEnum.GET, setCollaborators);
    setCollaboratorIdDelete(undefined);
  };

  const handleEditCollaborator = async (collaboratorId: number) => {
    navigate(
      CollaboratorRoutesEnum.COLLABORATOR_EDIT.replace(':collaboratorId', `${collaboratorId}`),
    );
  };

  const handleCloseModalDelete = () => {
    setCollaboratorIdDelete(undefined);
  };
  const handleOpenModalDelete = (collaboratorId: number) => {
    setCollaboratorIdDelete(collaboratorId);
  };

  return {
    collaboratorsFiltered,
    openModalDelete: !!collaboratorIdDelete,
    handleOnClickInsert,
    onSearch,
    handleDeleteCollaborator,
    handleEditCollaborator,
    handleCloseModalDelete,
    handleOpenModalDelete,
  };
};
