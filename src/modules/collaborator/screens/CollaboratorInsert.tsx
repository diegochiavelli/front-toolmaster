import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
import Screen from '../../../shared/components/screen/Screen';
import { DisplayFlexJustifyRight } from '../../../shared/components/styles/display.styled';
import { LimitedContainer } from '../../../shared/components/styles/limited.styled';
import { URL_COLLABORATOR } from '../../../shared/constants/urls';
import { InsertCollaborator } from '../../../shared/dtos/InsertCollaborator.dto';
import { connectionAPIPost } from '../../../shared/functions/connection/connectionAPI';
import { useGlobalContext } from '../../../shared/hooks/useGlobalContext';
import { CollaboratorRoutesEnum } from '../routes';
import { CollaboratorInsertContainer } from '../styles/collaboratorInsert.style';

const CollaboratorInsert = () => {
  const [collaborator, setCollaborator] = useState<InsertCollaborator>({
    nome: '',
    cpf: '',
    telefone: '',
    assinatura: '',
    observacao: '',
  });

  const { setNotification } = useGlobalContext();
  const navigate = useNavigate();

  const handleInsertCollaborator = async () => {
    await connectionAPIPost(URL_COLLABORATOR, collaborator)
      .then(() => {
        setNotification('Sucesso!', 'success', 'Colaborador adicionado!');
        navigate(CollaboratorRoutesEnum.COLLABORATOR);
      })
      .catch((error: Error) => {
        setNotification(error.message, 'error');
      });
  };

  const handleOnClickCancel = () => {
    navigate(CollaboratorRoutesEnum.COLLABORATOR);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    setCollaborator({
      ...collaborator,
      [nameObject]: event.target.value,
    });
  };

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'HOME',
        },
        {
          name: 'COLABORADORES',
          navigateTo: CollaboratorRoutesEnum.COLLABORATOR,
        },
        {
          name: 'ADICIONAR',
        },
      ]}
    >
      <CollaboratorInsertContainer>
        <LimitedContainer width={400}>
          <Input
            onChange={(event) => onChange(event, 'nome')}
            value={collaborator.nome}
            margin="0px 0px 16px 0px"
            title="Nome"
            placeholder="Nome"
          />
          <Input
            onChange={(event) => onChange(event, 'cpf')}
            value={collaborator.cpf}
            margin="0px 0px 16px 0px"
            title="CPF"
            placeholder="CPF"
          />
          <Input
            onChange={(event) => onChange(event, 'telefone')}
            value={collaborator.telefone}
            margin="0px 0px 16px 0px"
            title="Telefone"
            placeholder="Telefone"
          />
          <Input
            onChange={(event) => onChange(event, 'assinatura')}
            value={collaborator.assinatura}
            margin="0px 0px 16px 0px"
            title="Assinatura"
            placeholder="Assinatura"
          />
          <Input
            onChange={(event) => onChange(event, 'observacao')}
            value={collaborator.observacao}
            margin="0px 0px 16px 0px"
            title="Observação"
            placeholder="Observação"
          />
          <DisplayFlexJustifyRight>
            <LimitedContainer margin="0px 8px" width={120}>
              <Button danger onClick={handleOnClickCancel}>
                Cancelar
              </Button>
            </LimitedContainer>
            <LimitedContainer width={120}>
              <Button onClick={handleInsertCollaborator} type="primary">
                Adicionar
              </Button>
            </LimitedContainer>
          </DisplayFlexJustifyRight>
        </LimitedContainer>
      </CollaboratorInsertContainer>
    </Screen>
  );
};

export default CollaboratorInsert;
