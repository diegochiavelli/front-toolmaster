import { RouteObject } from 'react-router-dom';

import Exite from './screens/Exite';
import ExiteInsert from './screens/ExiteInsert';

export enum ExiteRoutesEnum {
  EXITE = '/exite',
  EXITE_INSERT = '/exite/insert',
  EXITE_EDIT = '/exite/:exiteId',
}
export const exiteScreens: RouteObject[] = [
  {
    path: ExiteRoutesEnum.EXITE,
    element: <Exite />,
  },
  {
    path: ExiteRoutesEnum.EXITE_INSERT,
    element: <ExiteInsert />,
  },
  {
    path: ExiteRoutesEnum.EXITE_EDIT,
    element: <ExiteInsert />,
  },
];
