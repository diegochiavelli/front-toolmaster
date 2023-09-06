import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_COLLABORATOR } from '../../../shared/constants/urls';
import { InsertCollaborator } from '../../../shared/dtos/InsertCollaborator.dto';
import { connectionAPIPost } from '../../../shared/functions/connection/connectionAPI';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';
import { CollaboratorRoutesEnum } from '../routes';

export const useInsertCollaborator = () => {
  const navigate = useNavigate();
  const { setNotification } = useGlobalReducer();
  const [loading, setLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [collaborator, setCollaborator] = useState<InsertCollaborator>({
    nome: '',
    cpf: '',
    telefone: '',
    assinatura: '',
    observacao: '',
  });

  useEffect(() => {
    if (collaborator.nome && collaborator.cpf && collaborator.telefone && collaborator.assinatura) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [collaborator]);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    setCollaborator({
      ...collaborator,
      [nameObject]: event.target.value,
    });
  };

  const handleInsertCollaborator = async () => {
    setLoading(true);
    await connectionAPIPost(URL_COLLABORATOR, collaborator)
      .then(() => {
        setNotification('Sucesso!', 'success', 'Colaborador adicionado!');
        navigate(CollaboratorRoutesEnum.COLLABORATOR);
      })
      .catch((error: Error) => {
        setNotification(error.message, 'error');
      });
    setLoading(false);
  };

  return {
    collaborator,
    loading,
    disabledButton,
    onChangeInput,
    handleInsertCollaborator,
  };
};
