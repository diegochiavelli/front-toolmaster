import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CollaboratorRoutesEnum } from '../../modules/collaborator/routes';
import { AuthType } from '../../modules/login/types/AuthType';
import { ERROR_INVALID_PASSWORD } from '../constants/errorsStatus';
import { URL_AUTH } from '../constants/urls';
import { setAuthorizationToken } from '../functions/connection/auth';
import ConnectionAPI, {
  connectionAPIPost,
  MethodType,
} from '../functions/connection/connectionAPI';
import { useGlobalContext } from './useGlobalContext';

export const useRequests = () => {
  const [loading, setLoading] = useState(false);
  const { setNotification, setUser } = useGlobalContext();

  const request = async <T>(
    url: string,
    method: MethodType,
    saveGlobal?: (object: T) => void,
    body?: unknown,
  ): Promise<T | undefined> => {
    setLoading(true);

    const returnObject: T | undefined = await ConnectionAPI.connect<T>(url, method, body)
      .then((result) => {
        // alert('PASSEI AQUI NO REQUEST COLLABORATOR 1');
        if (saveGlobal) {
          saveGlobal(result);
        }
        return result;
      })
      .catch((error: Error) => {
        setNotification(error.message, 'error');
        //  alert('PASSEI AQUI NO REQUEST ERROR CATCH COLLABORATOR 2 ');
        return undefined;
      });

    setLoading(false);
    return returnObject;
  };

  const authRequest = async (body: unknown): Promise<void> => {
    const navigate = useNavigate();
    // alert('AUTH REQUEST EM USE REQUESTS');
    setLoading(true);
    await connectionAPIPost<AuthType>(URL_AUTH, body)
      .then((result) => {
        //  alert('ENTREI NO THEN DO AUTH REQUEST');
        setUser(result.user);
        setAuthorizationToken(result.accessToken);
        navigate(CollaboratorRoutesEnum.COLLABORATOR);
        return result;
      })
      .catch(() => {
        //   alert('ERRO AUTH REQUEST');
        setNotification(ERROR_INVALID_PASSWORD, 'error');
        return undefined;
      });

    setLoading(false);
  };

  return {
    loading,
    authRequest,
    request,
  };
};
