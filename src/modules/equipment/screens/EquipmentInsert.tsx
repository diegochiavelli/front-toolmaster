import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
import Screen from '../../../shared/components/screen/Screen';
import { DisplayFlexJustifyRight } from '../../../shared/components/styles/display.styled';
import { LimitedContainer } from '../../../shared/components/styles/limited.styled';
import { DashboardRoutesEnum } from '../../dashboard/routes';
import { useInsertEquipment } from '../hooks/useInsertEquipment';
import { EquipmentRoutesEnum } from '../routes';
import { EquipmentInsertContainer } from '../styles/equipmentInsert.style';

const EquipmentInsert = () => {
  const { equipmentId } = useParams<{ equipmentId: string }>();

  const { equipment, loading, disabledButton, onChangeInput, handleInsertEquipment, isEdit } =
    useInsertEquipment(equipmentId);

  const navigate = useNavigate();

  const handleOnClickCancel = () => {
    navigate(EquipmentRoutesEnum.EQUIPMENT);
  };

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'HOME',
          navigateTo: DashboardRoutesEnum.DASHBOARD,
        },
        {
          name: 'EQUIPAMENTOS',
          navigateTo: EquipmentRoutesEnum.EQUIPMENT,
        },
        {
          name: 'ADICIONAR',
        },
      ]}
    >
      <EquipmentInsertContainer>
        <LimitedContainer width={400}>
          <Input
            onChange={(event) => onChangeInput(event, 'nome')}
            value={equipment.nome}
            margin="0px 0px 16px 0px"
            title="Nome"
            placeholder="Nome"
          />
          <Input
            onChange={(event) => onChangeInput(event, 'modelo')}
            value={equipment.modelo}
            margin="0px 0px 16px 0px"
            title="Modelo"
            placeholder="Modelo"
          />
          <Input
            onChange={(event) => onChangeInput(event, 'marca')}
            value={equipment.marca}
            margin="0px 0px 16px 0px"
            title="Marca"
            placeholder="Marca"
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
                onClick={handleInsertEquipment}
                type="primary"
              >
                {isEdit ? 'Salvar' : 'Adicionar'}
              </Button>
            </LimitedContainer>
          </DisplayFlexJustifyRight>
        </LimitedContainer>
      </EquipmentInsertContainer>
    </Screen>
  );
};

export default EquipmentInsert;
