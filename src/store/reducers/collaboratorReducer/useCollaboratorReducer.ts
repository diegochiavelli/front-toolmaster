import { useDispatch } from 'react-redux';

import { CollaboratorType } from '../../../modules/collaborator/types/CollaboratorType';
import { useAppSelector } from '../../hooks';
import { setCollaboratorAction, setCollaboratorsAction } from '.';

export const useCollaboratorReducer = () => {
  const dispatch = useDispatch();
  const { collaborators, collaborator } = useAppSelector((state) => state.collaboratorReducer);

  const setCollaborators = (currentCollaborators: CollaboratorType[]) => {
    dispatch(setCollaboratorsAction(currentCollaborators));
  };

  const setCollaborator = (currentCollaborator?: CollaboratorType) => {
    dispatch(setCollaboratorAction(currentCollaborator));
  };

  return {
    collaborator,
    collaborators,
    setCollaborators,
    setCollaborator,
  };
};
