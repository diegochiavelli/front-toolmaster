import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_COLLABORATOR, URL_COLLABORATOR_ID } from '../../../shared/constants/urls';
import { InsertCollaborator } from '../../../shared/dtos/InsertCollaborator.dto';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useCollaboratorReducer } from '../../../store/reducers/collaboratorReducer/useCollaboratorReducer';
import { CollaboratorRoutesEnum } from '../routes';

const DEFAULT_COLLABORATOR = {
  nome: '',
  cpf: '',
  telefone: '',
  cargo: '',
};

export const useInsertCollaborator = (collaboratorId?: string) => {
  const navigate = useNavigate();
  const { request } = useRequests();
  const { collaborator: collaboratorReducer, setCollaborator: setCollaboratorReducer } =
    useCollaboratorReducer();
  const [loading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [collaborator, setCollaborator] = useState<InsertCollaborator>(DEFAULT_COLLABORATOR);

  useEffect(() => {
    if (
      collaborator.nome &&
      collaborator.cpf.length >= 11 &&
      collaborator.telefone.length >= 10 &&
      collaborator.cargo
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [collaborator]);

  useEffect(() => {
    if (collaboratorReducer) {
      setCollaborator({
        nome: collaboratorReducer.nome,
        cpf: collaboratorReducer.cpf,
        telefone: collaboratorReducer.telefone,
        cargo: collaboratorReducer.cargo,
      });
    }
  }, [collaboratorReducer]);

  useEffect(() => {
    if (collaboratorId) {
      setIsEdit(true);
      request(
        URL_COLLABORATOR_ID.replace('{funcionariosId}', collaboratorId),
        MethodsEnum.GET,
        setCollaboratorReducer,
      );
    } else {
      setCollaboratorReducer(undefined);
      setCollaborator(DEFAULT_COLLABORATOR);
    }
  }, [collaboratorId]);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    setCollaborator({
      ...collaborator,
      [nameObject]: event.target.value,
    });
  };

  const handleInsertCollaborator = async () => {
    if (collaboratorId) {
      await request(
        URL_COLLABORATOR_ID.replace('{funcionariosId}', collaboratorId),
        MethodsEnum.PUT,
        undefined,
        collaborator,
        'Colaborador modificado!',
      );
    } else {
      await request(
        URL_COLLABORATOR,
        MethodsEnum.POST,
        undefined,
        collaborator,
        'Colaborador adicionado!',
      );
    }
    navigate(CollaboratorRoutesEnum.COLLABORATOR);
  };

  return {
    collaborator,
    loading,
    disabledButton,
    isEdit,
    onChangeInput,
    handleInsertCollaborator,
  };
};
