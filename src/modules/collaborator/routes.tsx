import { RouteObject } from 'react-router-dom';

import Collaborator from './screens/Collaborator';
import CollaboratorInsert from './screens/CollaboratorInsert';

export enum CollaboratorRoutesEnum {
  COLLABORATOR = '/collaborator',
  COLLABORATOR_INSERT = '/collaborator/insert',
  COLLABORATOR_EDIT = '/collaborator/:collaboratorId',
}
export const collaboratorScreens: RouteObject[] = [
  {
    path: CollaboratorRoutesEnum.COLLABORATOR,
    element: <Collaborator />,
  },
  {
    path: CollaboratorRoutesEnum.COLLABORATOR_INSERT,
    element: <CollaboratorInsert />,
  },
  {
    path: CollaboratorRoutesEnum.COLLABORATOR_EDIT,
    element: <CollaboratorInsert />,
  },
];
