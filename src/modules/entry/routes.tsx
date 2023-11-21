import { RouteObject } from 'react-router-dom';

import Entry from './screens/Entry';
import EntryInsert from './screens/EntryInsert';

export enum EntryRoutesEnum {
  ENTRY = '/entry',
  ENTRY_INSERT = '/entry/insert',
  ENTRY_EDIT = '/entry/:entryId',
}
export const entryScreens: RouteObject[] = [
  {
    path: EntryRoutesEnum.ENTRY,
    element: <Entry />,
  },
  {
    path: EntryRoutesEnum.ENTRY_INSERT,
    element: <EntryInsert />,
  },
  {
    path: EntryRoutesEnum.ENTRY_EDIT,
    element: <EntryInsert />,
  },
];
