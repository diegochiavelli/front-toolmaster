import { useState } from 'react';

import Button from '../../../shared/components/buttons/button/Button';
import SVGLogo from '../../../shared/components/icons/SVGLogo';
import Input from '../../../shared/components/inputs/input/Input';
import { useGlobalContext } from '../../../shared/hooks/useGlobalContext';
import { useRequests } from '../../../shared/hooks/useRequests';
import {
  BackgroundImage,
  ContainerLogin,
  ContainerLoginScreen,
  LimitedContainer,
  TitleLogin,
} from '../styles/loginScreen.styles';

const LoginScreen = () => {
  const { accessToken, setAccessToken } = useGlobalContext();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { postRequest, loading } = useRequests();

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSenha(event.target.value);
  };

  const handleLogin = () => {
    setAccessToken('novo token');
    postRequest('http://localhost:3000/auth/login', {
      email: email,
      senha: senha,
    });

    console.log('email', `${email}`, 'senha', `${senha}`);
  };

  return (
    <ContainerLoginScreen>
      <ContainerLogin>
        <LimitedContainer>
          <SVGLogo fill="gray" />
          <TitleLogin level={2} type="secondary">
            LOGIN ({accessToken})
          </TitleLogin>
          <Input title="USUÁRIO" margin="32px 0px 0px" onChange={handleEmail} value={email} />
          <Input
            type="password"
            title="SENHA"
            margin="32px 0px 0px"
            onChange={handlePassword}
            value={senha}
          />
          <Button loading={loading} type="primary" margin="64px 0px 16px 0px" onClick={handleLogin}>
            ENTRAR
          </Button>
        </LimitedContainer>
      </ContainerLogin>
      <BackgroundImage src="./background2.svg" />
    </ContainerLoginScreen>
  );
};

export default LoginScreen;
