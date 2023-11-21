import { NavigateFunction, redirect } from 'react-router-dom';

import { LoginRoutesEnum } from '../../../modules/login/routes';
import { UserType } from '../../../modules/login/types/UserType';
import { AUTHORIZATION_KEY } from '../../constants/authorizationConstants';
import { URL_USER } from '../../constants/urls';
import { connectionAPIGet } from './connectionAPI';
import { getItemStorage, removeItemStorage, setItemStorage } from './storageProxy';

export const unsetAuthorizationToken = () => removeItemStorage(AUTHORIZATION_KEY);

export const setAuthorizationToken = (token?: string) => {
  if (token) {
    setItemStorage(AUTHORIZATION_KEY, token);
  }
};

export const getAuthorizationToken = () => getItemStorage(AUTHORIZATION_KEY);

export const verifyLoggedIn = async () => {
  const token = getAuthorizationToken();
  if (!token) {
    // alert('Usuário não encontrado!');
    return redirect(LoginRoutesEnum.LOGIN);
  }
  const user = await connectionAPIGet<UserType>(URL_USER).catch(() => {
    unsetAuthorizationToken();
    // alert('Usuário não encontrado!');
  });

  if (!user) {
    // alert('Usuário não encontrado!');
    return redirect(LoginRoutesEnum.LOGIN);
  }
  return null;
};

export const logout = (navigate: NavigateFunction) => {
  unsetAuthorizationToken();
  navigate(LoginRoutesEnum.LOGIN);
};
