import { useDispatch } from 'react-redux';

import { CollaboratorType } from '../../../modules/collaborator/types/CollaboratorType';
import { useAppSelector } from '../../hooks';
import { setCollaboratorsAction } from '.';

export const useCollaboratorReducer = () => {
  const dispatch = useDispatch();
  const { collaborators } = useAppSelector((state) => state.collaboratorReducer);

  const setCollaborators = (collaborators: CollaboratorType[]) => {
    dispatch(setCollaboratorsAction(collaborators));
  };

  return {
    collaborators,
    setCollaborators,
  };
};
