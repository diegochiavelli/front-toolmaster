import { DeleteOutlined, EditOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Input, Modal } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';

import Button from '../../../shared/components/buttons/button/Button';
import Screen from '../../../shared/components/screen/Screen';
import Table from '../../../shared/components/table/Table';
import { DashboardRoutesEnum } from '../../dashboard/routes';
import { useEquipment } from '../hooks/useEquipment';
import equipmentPDF from '../reports/equipmentReport';
import { BoxButtons, LimiteSizeButton, LimiteSizeInput } from '../styles/equipment.style';
import { EquipmentType } from '../type/EquipmentType';

const { Search } = Input;

const Equipment = () => {
  const {
    equipmentsFiltered,
    openModalDelete,
    handleOnClickInsert,
    onSearch,
    handleDeleteEquipment,
    handleEditEquipment,
    handleCloseModalDelete,
    handleOpenModalDelete,
  } = useEquipment();
  const columns: ColumnsType<EquipmentType> = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Nome',
        dataIndex: 'nome',
        key: 'nome',
        sorter: (a, b) => a.nome.localeCompare(b.nome),
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Modelo',
        dataIndex: 'modelo',
        key: 'modelo',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Marca',
        dataIndex: 'marca',
        key: 'marca',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Quant.',
        dataIndex: 'quantidade',
        key: 'quantidade',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Ação',
        dataIndex: '',
        key: 'x',
        render: (_, equipment) => (
          <>
            <Button
              margin="0px 16px 0px 0px"
              onClick={() => handleEditEquipment(equipment.id)}
              icon={<EditOutlined />}
            ></Button>
            <Button
              danger
              onClick={() => handleOpenModalDelete(equipment.id)}
              icon={<DeleteOutlined />}
            ></Button>
          </>
        ),
      },
    ],
    [],
  );

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'HOME',
          navigateTo: DashboardRoutesEnum.DASHBOARD,
        },
        {
          name: 'EQUIPAMENTOS',
        },
      ]}
    >
      <Modal
        title="Atenção"
        open={openModalDelete}
        onOk={handleDeleteEquipment}
        onCancel={handleCloseModalDelete}
        okText="Sim"
        cancelText="Cancelar"
      >
        <p>Tem certeza que deseja excluir este equipamento?</p>
      </Modal>
      <BoxButtons>
        <LimiteSizeInput>
          <Search placeholder="Buscar equipamento" onSearch={onSearch} enterButton />
        </LimiteSizeInput>
        <LimiteSizeButton>
          <Button
            type="primary"
            onClick={() => equipmentPDF(equipmentsFiltered)}
            icon={<FilePdfOutlined />}
          >
            Gerar PDF
          </Button>
        </LimiteSizeButton>
        <LimiteSizeButton>
          <Button type="primary" onClick={handleOnClickInsert}>
            Adicionar
          </Button>
        </LimiteSizeButton>
      </BoxButtons>
      <Table columns={columns} dataSource={equipmentsFiltered} />
    </Screen>
  );
};

export default Equipment;
