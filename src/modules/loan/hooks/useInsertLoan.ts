import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  URL_LOAN,
  URL_LOAN_EQUIPMENT,
  URL_LOAN_EQUIPMENT_ID,
  URL_LOAN_ID,
  URL_LOANEQUIPMENT_ID,
} from '../../../shared/constants/urls';
import { InsertLoan } from '../../../shared/dtos/InsertLoan.dto';
import { InsertLoanEquipment } from '../../../shared/dtos/InsertLoanEquipment.dto';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useLoanEquipmentReducer } from '../../../store/reducers/loanEquipmentReducer/useLoanEquipmentReducer';
import { useLoanReducer } from '../../../store/reducers/loanReducer/useLoanReducer';
import { LoanRoutesEnum } from '../routes';
import { LoanType } from '../types/LoanType';

const DEFAULT_LOAN = {
  dataSaida: '',
  dataDevolucao: '',
  observacao: '',
  status: 'Pendente',
  id_usuario: 1,
  id_funcionario: 0,
};

const DEFAULT_LOANEQUIPMENT = {
  quantidade: 1,
  id_emprestimo: 0,
  id_equipamento: 0,
};

export const useInsertLoan = (loanId?: string) => {
  const navigate = useNavigate();
  const { request, loading: loadingRequest } = useRequests();

  const [isEdit, setIsEdit] = useState(false);
  const [loading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);

  const { loan: loanReducer, setLoan: setLoanReducer } = useLoanReducer();
  const { loanEquipment: loanEquipmentReducer, setLoanEquipment: setLoanEquipmentReducer } =
    useLoanEquipmentReducer();

  const [loan, setLoan] = useState<InsertLoan>(DEFAULT_LOAN);
  const [loanEquipment, setLoanEquipment] = useState<InsertLoanEquipment>(DEFAULT_LOANEQUIPMENT);

  useEffect(() => {
    if (
      loan.dataSaida &&
      loan.dataDevolucao &&
      loan.id_funcionario &&
      loan.status &&
      loanEquipment.quantidade &&
      loanEquipment.id_equipamento
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [loan, loanEquipment]);

  useEffect(() => {
    if (loanReducer) {
      setLoan({
        dataSaida: loanReducer.dataSaida,
        dataDevolucao: loanReducer.dataDevolucao,
        observacao: loanReducer.observacao,
        status: loanReducer.status,
        id_usuario: loanReducer.id_usuario,
        id_funcionario: loanReducer.id_funcionario,
      });
    }
  }, [loanReducer]);

  useEffect(() => {
    if (loanEquipmentReducer) {
      setLoanEquipment({
        quantidade: loanEquipmentReducer.quantidade,
        id_emprestimo: loanEquipmentReducer.id_emprestimo,
        id_equipamento: loanEquipmentReducer.id_equipamento,
      });
    }
  }, [loanEquipmentReducer]);

  useEffect(() => {
    if (loanId) {
      setIsEdit(true);
      request(URL_LOAN_ID.replace('{emprestimosId}', loanId), MethodsEnum.GET, setLoanReducer);
      request(
        URL_LOANEQUIPMENT_ID.replace('{emprestimosId}', loanId),
        MethodsEnum.GET,
        setLoanEquipmentReducer,
      );
    } else {
      setLoanReducer(undefined);
      setLoan(DEFAULT_LOAN);
    }
  }, [loanId]);

  //EMPEQUIPAMENTO
  const onChangeInputLoanEquipment = (
    event: React.ChangeEvent<HTMLInputElement>,
    nameObject: string,
  ) => {
    setLoanEquipment({
      ...loanEquipment,
      [nameObject]: event.target.value,
    });
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    setLoan({
      ...loan,
      [nameObject]: event.target.value,
    });
  };

  const handleChangeSelectStatus = (value: string) => {
    setLoan({
      ...loan,
      status: value,
    });
  };

  const handleChangeSelectCollaborator = (value: string) => {
    setLoan({
      ...loan,
      id_funcionario: Number(value),
    });
  };

  const handleChangeSelectEquipment = (value: string) => {
    setLoanEquipment({
      ...loanEquipment,
      id_equipamento: Number(value),
    });
  };

  const handleInsertLoan = async () => {
    if (loanId) {
      await request(
        URL_LOAN_ID.replace('{emprestimosId}', loanId),
        MethodsEnum.PUT,
        undefined,
        loan,
      );
      await request(
        URL_LOAN_EQUIPMENT_ID.replace('{emprestimosId}', loanId),
        MethodsEnum.PUT,
        undefined,
        loanEquipment,
        'Empréstimo modificado!',
      );
    } else {
      const loanEquipmentBd = <LoanType>await request(URL_LOAN, MethodsEnum.POST, undefined, loan);

      loanEquipment.id_emprestimo = loanEquipmentBd.id;

      if (loanEquipmentBd && loanEquipment.id_emprestimo != 0) {
        await request(
          URL_LOAN_EQUIPMENT,
          MethodsEnum.POST,
          undefined,
          loanEquipment,
          'Empréstimo adicionado!',
        );
      }
    }
    navigate(LoanRoutesEnum.LOAN);
  };

  return {
    loan,
    loanEquipment,
    loading,
    loadingRequest,
    disabledButton,
    isEdit,
    onChangeInput,
    onChangeInputLoanEquipment,
    handleChangeSelectEquipment,
    handleInsertLoan,
    handleChangeSelectStatus,
    handleChangeSelectCollaborator,
  };
};
