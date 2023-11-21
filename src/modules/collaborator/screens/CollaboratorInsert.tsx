import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
import Screen from '../../../shared/components/screen/Screen';
import { DisplayFlexJustifyRight } from '../../../shared/components/styles/display.styled';
import { LimitedContainer } from '../../../shared/components/styles/limited.styled';
import { DashboardRoutesEnum } from '../../dashboard/routes';
import { useInsertCollaborator } from '../hooks/useInsertCollaborator';
import { CollaboratorRoutesEnum } from '../routes';
import { CollaboratorInsertContainer } from '../styles/collaboratorInsert.style';

const CollaboratorInsert = () => {
  const { collaboratorId } = useParams<{ collaboratorId: string }>();
  const { collaborator, loading, disabledButton, isEdit, onChangeInput, handleInsertCollaborator } =
    useInsertCollaborator(collaboratorId);

  const navigate = useNavigate();

  const handleOnClickCancel = () => {
    navigate(CollaboratorRoutesEnum.COLLABORATOR);
  };

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'HOME',
          navigateTo: DashboardRoutesEnum.DASHBOARD,
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
            type="number"
            onChange={(event) => onChangeInput(event, 'cpf')}
            value={collaborator.cpf}
            margin="0px 0px 16px 0px"
            title="CPF"
            placeholder="CPF"
          />
          <Input
            type="number"
            onChange={(event) => onChangeInput(event, 'telefone')}
            value={collaborator.telefone}
            margin="0px 0px 16px 0px"
            title="Telefone"
            placeholder="Telefone"
          />
          <Input
            onChange={(event) => onChangeInput(event, 'cargo')}
            value={collaborator.cargo}
            margin="0px 0px 16px 0px"
            title="Cargo"
            placeholder="Cargo"
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
                {isEdit ? 'Salvar' : 'Adicionar'}
              </Button>
            </LimitedContainer>
          </DisplayFlexJustifyRight>
        </LimitedContainer>
      </CollaboratorInsertContainer>
    </Screen>
  );
};

export default CollaboratorInsert;
