import { useDispatch } from 'react-redux';

import { LoanType } from '../../../modules/loan/types/LoanType';
import { useAppSelector } from '../../hooks';
import { setLoanAction, setLoansAction } from '.';

export const useLoanReducer = () => {
  const dispatch = useDispatch();
  const { loans, loan } = useAppSelector((state) => state.loanReducer);

  const setLoans = (currentLoans: LoanType[]) => {
    dispatch(setLoansAction(currentLoans));
  };

  const setLoan = (currentLoan?: LoanType) => {
    dispatch(setLoanAction(currentLoan));
  };

  return {
    loan,
    loans,
    setLoans,
    setLoan,
  };
};
