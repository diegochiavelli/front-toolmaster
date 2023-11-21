import { RouteObject } from 'react-router-dom';

import User from './screens/User';
import UserInsert from './screens/UserInsert';

export enum UserRoutesEnum {
  USER = '/user',
  USER_INSERT = '/user/insert',
  USER_EDIT = '/user/:userId',
}
export const userScreens: RouteObject[] = [
  {
    path: UserRoutesEnum.USER,
    element: <User />,
  },
  {
    path: UserRoutesEnum.USER_INSERT,
    element: <UserInsert />,
  },
  {
    path: UserRoutesEnum.USER_EDIT,
    element: <UserInsert />,
  },
];
