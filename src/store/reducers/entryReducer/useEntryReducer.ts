import { useDispatch } from 'react-redux';

import { EntryType } from '../../../modules/entry/types/EntryType';
import { useAppSelector } from '../../hooks';
import { setEntryAction, setEntrysAction } from '.';

export const useEntryReducer = () => {
  const dispatch = useDispatch();
  const { entrys, entry } = useAppSelector((state) => state.entryReducer);

  const setEntrys = (currentEntrys: EntryType[]) => {
    dispatch(setEntrysAction(currentEntrys));
  };

  const setEntry = (currentEntry?: EntryType) => {
    dispatch(setEntryAction(currentEntry));
  };

  return {
    entry,
    entrys,
    setEntrys,
    setEntry,
  };
};
