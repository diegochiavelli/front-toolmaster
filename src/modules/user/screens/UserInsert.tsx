import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
import Screen from '../../../shared/components/screen/Screen';
import { DisplayFlexJustifyRight } from '../../../shared/components/styles/display.styled';
import { LimitedContainer } from '../../../shared/components/styles/limited.styled';
import { useInsertUser } from '../hooks/useInsertUser';
import { UserRoutesEnum } from '../routes';
import { UserInsertContainer } from '../styles/userInsert.style';
import { DashboardRoutesEnum } from '../../dashboard/routes';

const UserInsert = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user, loading, disabledButton, isEdit, onChangeInput, handleInsertUser } =
    useInsertUser(userId);

  const navigate = useNavigate();
  const handleOnClickCancel = () => {
    navigate(UserRoutesEnum.USER);
  };

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'HOME',
          navigateTo: DashboardRoutesEnum.DASHBOARD,
        },
        {
          name: 'USUÁRIOS',
          navigateTo: UserRoutesEnum.USER,
        },
        {
          name: 'ADICIONAR',
        },
      ]}
    >
      <UserInsertContainer>
        <LimitedContainer width={400}>
          <Input
            onChange={(event) => onChangeInput(event, 'nome')}
            value={user.nome}
            margin="0px 0px 16px 0px"
            title="Nome"
            placeholder="Nome de usuário"
          />
          <Input
            onChange={(event) => onChangeInput(event, 'email')}
            value={user.email}
            margin="0px 0px 16px 0px"
            title="E-mail"
            placeholder="Informe seu E-mail favorito"
          />
          <Input
            type="password"
            onChange={(event) => onChangeInput(event, 'senha')}
            value={user.senha}
            margin="0px 0px 16px 0px"
            title="Senha"
            placeholder="Digite uma senha"
          />
          {/* <Input
            type="password"
            onChange={() => {
              if (user.senha != senha2){
                alert('As senhas digitadas não coincidem! Digite novamente.');
              }
            }}
            value={senha2}
            margin="0px 0px 16px 0px"
            title="Senha"
            placeholder="Confirme sua senha"
          /> */}
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
                onClick={handleInsertUser}
                type="primary"
              >
                {isEdit ? 'Salvar' : 'Adicionar'}
              </Button>
            </LimitedContainer>
          </DisplayFlexJustifyRight>
        </LimitedContainer>
      </UserInsertContainer>
    </Screen>
  );
};

export default UserInsert;
