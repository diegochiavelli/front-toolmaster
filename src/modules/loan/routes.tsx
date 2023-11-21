import { RouteObject } from 'react-router-dom';

import Loan from './screens/Loan';
import LoanInsert from './screens/LoanInsert';

export enum LoanRoutesEnum {
  LOAN = '/loan',
  LOAN_INSERT = '/loan/insert',
  LOAN_EDIT = '/loan/:loanId',
}
export const loanScreens: RouteObject[] = [
  {
    path: LoanRoutesEnum.LOAN,
    element: <Loan />,
  },
  {
    path: LoanRoutesEnum.LOAN_INSERT,
    element: <LoanInsert />,
  },
  {
    path: LoanRoutesEnum.LOAN_EDIT,
    element: <LoanInsert />,
  },
];
