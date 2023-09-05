import { Spin } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../../../shared/hooks/useGlobalContext';
import { CollaboratorRoutesEnum } from '../../collaborator/routes';

const FirstScreen = () => {
  const { user } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(CollaboratorRoutesEnum.COLLABORATOR);
    }
  }, [user]);
  return <Spin />;
};

export default FirstScreen;
