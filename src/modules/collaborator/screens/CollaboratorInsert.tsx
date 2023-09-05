import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
import Screen from '../../../shared/components/screen/Screen';
import { DisplayFlexJustifyRight } from '../../../shared/components/styles/display.styled';
import { LimitedContainer } from '../../../shared/components/styles/limited.styled';
import { useInsertCollaborator } from '../hooks/useInsertCollaborator';
import { CollaboratorRoutesEnum } from '../routes';
import { CollaboratorInsertContainer } from '../styles/collaboratorInsert.style';

const CollaboratorInsert = () => {
  const { collaborator, loading, disabledButton, onChangeInput, handleInsertCollaborator } =
    useInsertCollaborator();

  const navigate = useNavigate();

  const handleOnClickCancel = () => {
    navigate(CollaboratorRoutesEnum.COLLABORATOR);
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
            onChange={(event) => onChangeInput(event, 'nome')}
            value={collaborator.nome}
            margin="0px 0px 16px 0px"
            title="Nome"
            placeholder="Nome"
          />
          <Input
            onChange={(event) => onChangeInput(event, 'cpf')}
            value={collaborator.cpf}
            margin="0px 0px 16px 0px"
            title="CPF"
            placeholder="CPF"
          />
          <Input
            onChange={(event) => onChangeInput(event, 'telefone')}
            value={collaborator.telefone}
            margin="0px 0px 16px 0px"
            title="Telefone"
            placeholder="Telefone"
          />
          <Input
            onChange={(event) => onChangeInput(event, 'assinatura')}
            value={collaborator.assinatura}
            margin="0px 0px 16px 0px"
            title="Assinatura"
            placeholder="Assinatura"
          />
          <Input
            onChange={(event) => onChangeInput(event, 'observacao')}
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
              <Button
                loading={loading}
                disabled={disabledButton}
                onClick={handleInsertCollaborator}
                type="primary"
              >
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
