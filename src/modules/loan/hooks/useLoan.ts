import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_LOAN, URL_LOAN_CONCLUDE, URL_LOAN_ID } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useLoanReducer } from '../../../store/reducers/loanReducer/useLoanReducer';
import { LoanRoutesEnum } from '../routes';
import { LoanType } from '../types/LoanType';

export const useLoan = () => {
  const [loanIdDelete, setLoanIdDelete] = useState<number | undefined>();
  const { loans, setLoans } = useLoanReducer();
  const [loansFiltered, setLoansFiltered] = useState<LoanType[]>([]);
  const { request } = useRequests();
  const navigate = useNavigate();

  useEffect(() => {
    setLoansFiltered([...loans]);
  }, [loans]);

  useEffect(() => {
    request<LoanType[]>(URL_LOAN, MethodsEnum.GET, setLoans);
  }, []);

  const handleOnClickInsert = () => {
    navigate(LoanRoutesEnum.LOAN_INSERT);
  };

  const onSearch = (value: string) => {
    if (!value) {
      setLoansFiltered([...loans]);
    } else {
      setLoansFiltered([...loansFiltered.filter((loan) => loan.id.toString().includes(value))]);
    }
  };

  const handleDeleteLoan = async () => {
    await request(
      URL_LOAN_ID.replace('{emprestimosId}', `${loanIdDelete}`),
      MethodsEnum.DELETE,
      undefined,
      undefined,
      'Empréstimo excluído!',
    );
    await request<LoanType[]>(URL_LOAN, MethodsEnum.GET, setLoans);
    setLoanIdDelete(undefined);
  };

  const handleChangeStatusLoan = async (loanId: number) => {
    const checkLoan = { status: 'Concluído' };
    if (loanId) {
      await request(
        URL_LOAN_CONCLUDE.replace('{emprestimosId}', String(loanId)),
        MethodsEnum.PUT,
        undefined,
        checkLoan,
        'Empréstimo concluído!',
      );
      await request<LoanType[]>(URL_LOAN, MethodsEnum.GET, setLoans);
    }
  };

  const handleChangeStatusVencidoLoan = async (loanId: number) => {
    const checkLoan = { status: 'Vencido' };
    if (loanId) {
      await request(
        URL_LOAN_CONCLUDE.replace('{emprestimosId}', String(loanId)),
        MethodsEnum.PUT,
        undefined,
        checkLoan,
      );
      await request<LoanType[]>(URL_LOAN, MethodsEnum.GET, setLoans);
    }
  };

  const handleEditLoan = async (loanId: number) => {
    navigate(LoanRoutesEnum.LOAN_EDIT.replace(':loanId', `${loanId}`));
  };

  const handleCloseModalDelete = () => {
    setLoanIdDelete(undefined);
  };

  const handleOpenModalDelete = (loanId: number) => {
    setLoanIdDelete(loanId);
  };

  return {
    loansFiltered,
    openModalDelete: !!loanIdDelete,
    handleOnClickInsert,
    onSearch,
    handleDeleteLoan,
    handleEditLoan,
    handleCloseModalDelete,
    handleOpenModalDelete,
    handleChangeStatusLoan,
    handleChangeStatusVencidoLoan,
  };
};
