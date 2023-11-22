import { useEffect } from 'react';

import { URL_LOAN_DETAIL_ID } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useLoanReducer } from '../../../store/reducers/loanReducer/useLoanReducer';

export const useLoanDetail = (loanId?: string) => {
  const { loan, setLoan } = useLoanReducer();
  const { request, loading } = useRequests();

  useEffect(() => {
    request(URL_LOAN_DETAIL_ID.replace('{emprestimosId}', loanId || ''), MethodsEnum.GET, setLoan);
  }, []);

  return {
    loan,
    loading,
  };
};
