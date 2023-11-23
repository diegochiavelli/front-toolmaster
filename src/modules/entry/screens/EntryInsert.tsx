import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
import Loading from '../../../shared/components/loading/Loading';
import Screen from '../../../shared/components/screen/Screen';
import Select from '../../../shared/components/selects/select/Select';
import {
  DisplayFlexJustifyCenter,
  DisplayFlexJustifyRight,
} from '../../../shared/components/styles/display.styled';
import { LimitedContainer } from '../../../shared/components/styles/limited.styled';
import { DashboardRoutesEnum } from '../../dashboard/routes';
import { useEquipment } from '../../equipment/hooks/useEquipment';
import { EquipmentType } from '../../equipment/type/EquipmentType';
import { useInsertEntry } from '../hooks/useInsertEntry';
import { EntryRoutesEnum } from '../routes';
import { EntryInsertContainer } from '../styles/entryInsert.style';

const EntryInsert = () => {
  const { entryId } = useParams<{ entryId: string }>();
  const {
    entry,
    loading,
    loadingRequest,
    disabledButton,
    isEdit,
    onChangeInput,
    handleInsertEntry,
    handleChangeSelectEquipment,
  } = useInsertEntry(entryId);
  const { equipmentsFiltered } = useEquipment();
  const navigate = useNavigate();

  const handleOnClickCancel = () => {
    navigate(EntryRoutesEnum.ENTRY);
  };

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'HOME',
          navigateTo: DashboardRoutesEnum.DASHBOARD,
        },
        {
          name: 'ENTRADAS',
          navigateTo: EntryRoutesEnum.ENTRY,
        },
        {
          name: 'ADICIONAR',
        },
      ]}
    >
      {loadingRequest ? (
        <DisplayFlexJustifyCenter>
          <Loading size="large" />
        </DisplayFlexJustifyCenter>
      ) : (
        <EntryInsertContainer>
          <LimitedContainer width={400}>
            <Select
              defaultValue={`${entry.id_equipamento}`}
              title="Equipamento"
              margin="0px 0px 16px 0px"
              onChange={handleChangeSelectEquipment}
              options={equipmentsFiltered.map((e: EquipmentType) => ({
                value: `${e.id}`,
                label: `${e.id} - ${e.nome}`,
              }))}
              disabled={isEdit ? true : false}
            />

            <Input
              type="number"
              onChange={(event) => onChangeInput(event, 'quantidade')}
              value={entry.quantidade}
              margin="0px 0px 16px 0px"
              title="Quantidade"
              placeholder="Quantidade"
              disabled={isEdit ? true : false}
            />
            <Input
              type="number"
              onChange={(event) => onChangeInput(event, 'preco')}
              value={entry.preco}
              margin="0px 0px 16px 0px"
              title="Preço"
              placeholder="Preço"
            />
            <Input
              onChange={(event) => onChangeInput(event, 'observacao')}
              value={entry.observacao}
              margin="0px 0px 16px 0px"
              title="Observação"
              placeholder="Observação"
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
                  onClick={handleInsertEntry}
                  type="primary"
                >
                  {isEdit ? 'Salvar' : 'Adicionar'}
                </Button>
              </LimitedContainer>
            </DisplayFlexJustifyRight>
          </LimitedContainer>
        </EntryInsertContainer>
      )}
    </Screen>
  );
};

export default EntryInsert;
