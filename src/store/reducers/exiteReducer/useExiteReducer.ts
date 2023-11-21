import { useDispatch } from 'react-redux';

import { ExiteType } from '../../../modules/exite/types/ExiteType';
import { useAppSelector } from '../../hooks';
import { setExiteAction, setExitesAction } from '.';

export const useExiteReducer = () => {
  const dispatch = useDispatch();
  const { exites, exite } = useAppSelector((state) => state.exiteReducer);

  const setExites = (currentExites: ExiteType[]) => {
    dispatch(setExitesAction(currentExites));
  };

  const setExite = (currentExite?: ExiteType) => {
    dispatch(setExiteAction(currentExite));
  };

  return {
    exite,
    exites,
    setExites,
    setExite,
  };
};
