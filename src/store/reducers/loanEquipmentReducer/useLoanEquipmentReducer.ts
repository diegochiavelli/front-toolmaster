import { useDispatch } from 'react-redux';

import { LoanEquipmentType } from '../../../modules/loan/types/LoanEquipmentType';
import { useAppSelector } from '../../hooks';
import { setLoanEquipmentAction, setLoanEquipmentsAction } from '.';

export const useLoanEquipmentReducer = () => {
  const dispatch = useDispatch();

  const { loanEquipments, loanEquipment } = useAppSelector((state) => state.loanEquipmentReducer);

  const setLoanEquipments = (currentLoanEquipments: LoanEquipmentType[]) => {
    dispatch(setLoanEquipmentsAction(currentLoanEquipments));
  };

  const setLoanEquipment = (currentLoanEquipment?: LoanEquipmentType) => {
    dispatch(setLoanEquipmentAction(currentLoanEquipment));
  };

  return {
    loanEquipment,
    loanEquipments,
    setLoanEquipments,
    setLoanEquipment,
  };
};
