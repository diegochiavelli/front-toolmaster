import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_USER_ID, URL_USERR } from '../../../shared/constants/urls';
import { InsertUser } from '../../../shared/dtos/InsertUser.dto';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useUserReducer } from '../../../store/reducers/userReducer/useUserReducer';
import { UserRoutesEnum } from '../routes';

const DEFAULT_USER = {
  nome: '',
  email: '',
  senha: '',
};

export const useInsertUser = (userId?: string) => {
  const navigate = useNavigate();
  const { request } = useRequests();
  const { user: userReducer, setUser: setUserReducer } = useUserReducer();
  const [loading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [user, setUser] = useState<InsertUser>(DEFAULT_USER);

  useEffect(() => {
    if (user.nome && user.email && user.senha) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [user]);

  useEffect(() => {
    if (userReducer) {
      setUser({
        nome: userReducer.nome,
        email: userReducer.email,
        senha: userReducer.senha,
        //tratar senha de usuario
      });
    }
  }, [userReducer]);

  useEffect(() => {
    if (userId) {
      setIsEdit(true);
      request(URL_USER_ID.replace('{usuariosId}', userId), MethodsEnum.GET, setUserReducer);
    } else {
      setUserReducer(undefined);
      setUser(DEFAULT_USER);
    }
  }, [userId]);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    setUser({
      ...user,
      [nameObject]: event.target.value,
    });
  };

  const handleInsertUser = async () => {
    if (userId) {
      await request(
        URL_USER_ID.replace('{usuariosId}', userId),
        MethodsEnum.PUT,
        undefined,
        user,
        'Usuário modificado!',
      );
    } else {
      await request(URL_USERR, MethodsEnum.POST, undefined, user, 'Usuário adicionado!');
    }
    navigate(UserRoutesEnum.USER);
  };

  return {
    user,
    loading,
    disabledButton,
    isEdit,
    onChangeInput,
    handleInsertUser,
  };
};
