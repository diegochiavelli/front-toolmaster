import { Spin } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';
import { DashboardRoutesEnum } from '../../dashboard/routes';
import { LoginRoutesEnum } from '../../login/routes';

const FirstScreen = () => {
  const { user } = useGlobalReducer();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(DashboardRoutesEnum.DASHBOARD);
    } else {
      navigate(LoginRoutesEnum.LOGIN);
    }
  }, [user]);
  return <Spin />;
};

export default FirstScreen;
