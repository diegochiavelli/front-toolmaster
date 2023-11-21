import { useDispatch } from 'react-redux';

import { UserType } from '../../../modules/user/types/UserType';
import { useAppSelector } from '../../hooks';
import { setUserAction, setUsersAction } from '.';

export const useUserReducer = () => {
  const dispatch = useDispatch();
  const { users, user } = useAppSelector((state) => state.userReducer);

  const setUsers = (currentUsers: UserType[]) => {
    dispatch(setUsersAction(currentUsers));
  };

  const setUser = (currentUser?: UserType) => {
    dispatch(setUserAction(currentUser));
  };

  return {
    user,
    users,
    setUsers,
    setUser,
  };
};
