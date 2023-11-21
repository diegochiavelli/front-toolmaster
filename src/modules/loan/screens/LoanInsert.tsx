import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
import Screen from '../../../shared/components/screen/Screen';
import Select from '../../../shared/components/selects/select/Select';
import { DisplayFlexJustifyRight } from '../../../shared/components/styles/display.styled';
import { LimitedContainer } from '../../../shared/components/styles/limited.styled';
import { useCollaborator } from '../../collaborator/hooks/useCollaborator';
import { CollaboratorType } from '../../collaborator/types/CollaboratorType';
import { DashboardRoutesEnum } from '../../dashboard/routes';
import { useEquipment } from '../../equipment/hooks/useEquipment';
import { EquipmentType } from '../../equipment/type/EquipmentType';
import { useInsertLoan } from '../hooks/useInsertLoan';
import { LoanRoutesEnum } from '../routes';
import { LoanInsertContainer } from '../styles/loanInsert.style';

const LoanInsert = () => {
  const { loanId } = useParams<{ loanId: string }>();

  const {
    loan,
    loanEquipment,
    loading,
    disabledButton,
    onChangeInput,
    onChangeInputLoanEquipment,
    handleInsertLoan,
    handleChangeSelectStatus,
    handleChangeSelectCollaborator,
    handleChangeSelectEquipment,
    isEdit,
  } = useInsertLoan(loanId);

  const { collaboratorsFiltered } = useCollaborator();
  const { equipmentsFiltered } = useEquipment();

  const navigate = useNavigate();

  const handleOnClickCancel = () => {
    navigate(LoanRoutesEnum.LOAN);
  };

  const statusSelect = ['Pendente', 'Concluído', 'Vencido']; // COLOCAR O VENCIDO DINÂMICO

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'HOME',
          navigateTo: DashboardRoutesEnum.DASHBOARD,
        },
        {
          name: 'EMPRÉSTIMOS',
          navigateTo: LoanRoutesEnum.LOAN,
        },
        {
          name: 'ADICIONAR',
        },
      ]}
    >
      <LoanInsertContainer>
        <LimitedContainer width={400}>
          <Select
            title="Equipamento"
            margin="0px 0px 16px 0px"
            onChange={handleChangeSelectEquipment}
            options={equipmentsFiltered.map((e: EquipmentType) => ({
              value: `${e.id}`,
              label: `${e.id} - ${e.nome}`,
            }))}
          />

          <Input
            type="number"
            margin="0px 0px 16px 0px"
            onChange={(event) => onChangeInputLoanEquipment(event, 'quantidade')}
            value={loanEquipment.quantidade}
            title="Quantidade"
            placeholder="Quantidade do equipamento para empréstimo"
          />

          <Input
            type="date"
            onChange={(event) => onChangeInput(event, 'dataSaida')}
            value={loan.dataSaida}
            margin="0px 0px 16px 0px"
            title="Data saída"
          />

          <Input
            type="date"
            onChange={(event) => onChangeInput(event, 'dataDevolucao')}
            value={loan.dataDevolucao}
            margin="0px 0px 16px 0px"
            title="Data devolução"
          />

          <Input
            onChange={(event) => onChangeInput(event, 'observacao')}
            value={loan.observacao}
            margin="0px 0px 16px 0px"
            title="Observações"
            placeholder="Informações úteis"
          />

          <Select
            title="ID Colaborador"
            margin="0px 0px 16px 0px"
            onChange={handleChangeSelectCollaborator}
            options={collaboratorsFiltered.map((e: CollaboratorType) => ({
              value: `${e.id}`,
              label: `${e.id} - ${e.nome}`,
            }))}
          />

          <Select
            defaultValue={`${loan.status}`}
            title="Status"
            margin="0px 0px 32px 0px"
            onChange={handleChangeSelectStatus}
            options={statusSelect.map((statusValores) => ({
              value: `${statusValores}`,
              label: `${statusValores}`,
            }))}
          />

          <DisplayFlexJustifyRight>
            <LimitedContainer margin="0px 8px" width={120}>
              <Button danger onClick={handleOnClickCancel}>
                Cancelar
              </Button>
            </LimitedContainer>
            <LimitedContainer width={120}>
              <Button
                loading={loading}
                disabled={disabledButton}
                onClick={handleInsertLoan}
                type="primary"
              >
                {isEdit ? 'Salvar' : 'Adicionar'}
              </Button>
            </LimitedContainer>
          </DisplayFlexJustifyRight>
        </LimitedContainer>
      </LoanInsertContainer>
    </Screen>
  );
};

export default LoanInsert;
