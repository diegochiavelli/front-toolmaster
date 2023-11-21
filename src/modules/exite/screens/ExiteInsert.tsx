import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
import Screen from '../../../shared/components/screen/Screen';
import Select from '../../../shared/components/selects/select/Select';
import { DisplayFlexJustifyRight } from '../../../shared/components/styles/display.styled';
import { LimitedContainer } from '../../../shared/components/styles/limited.styled';
import { DashboardRoutesEnum } from '../../dashboard/routes';
import { useEquipment } from '../../equipment/hooks/useEquipment';
import { EquipmentType } from '../../equipment/type/EquipmentType';
import { useInsertExite } from '../hooks/useInsertExite';
import { ExiteRoutesEnum } from '../routes';
import { ExiteInsertContainer } from '../styles/exiteInsert.style';

const ExiteInsert = () => {
  const { exiteId } = useParams<{ exiteId: string }>();
  const {
    exite,
    loading,
    disabledButton,
    isEdit,
    onChangeInput,
    handleInsertExite,
    handleChangeSelectEquipment,
  } = useInsertExite(exiteId);
  const { equipmentsFiltered } = useEquipment();
  const navigate = useNavigate();

  const handleOnClickCancel = () => {
    navigate(ExiteRoutesEnum.EXITE);
  };

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'HOME',
          navigateTo: DashboardRoutesEnum.DASHBOARD,
        },
        {
          name: 'SAÍDAS',
          navigateTo: ExiteRoutesEnum.EXITE,
        },
        {
          name: 'ADICIONAR',
        },
      ]}
    >
      <ExiteInsertContainer>
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
            onChange={(event) => onChangeInput(event, 'quantidade')}
            value={exite.quantidade}
            margin="0px 0px 16px 0px"
            title="Quantidade"
            placeholder="Quantidade"
          />
          <Input
            onChange={(event) => onChangeInput(event, 'observacao')}
            value={exite.observacao}
            margin="0px 0px 16px 0px"
            title="Obsercação"
            placeholder="Obsercação"
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
                onClick={handleInsertExite}
                type="primary"
              >
                {isEdit ? 'Salvar' : 'Adicionar'}
              </Button>
            </LimitedContainer>
          </DisplayFlexJustifyRight>
        </LimitedContainer>
      </ExiteInsertContainer>
    </Screen>
  );
};

export default ExiteInsert;
