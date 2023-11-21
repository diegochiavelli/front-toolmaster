import { DeleteOutlined, EditOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Input, Modal } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';

import Button from '../../../shared/components/buttons/button/Button';
import Screen from '../../../shared/components/screen/Screen';
import Table from '../../../shared/components/table/Table';
import { DashboardRoutesEnum } from '../../dashboard/routes';
import { useExite } from '../hooks/useExite';
import exitePDF from '../reports/exiteReport';
import { BoxButtons, LimiteSizeButton, LimiteSizeInput } from '../styles/exite.style';
import { ExiteType } from '../types/ExiteType';

const { Search } = Input;

const Exite = () => {
  const {
    exitesFiltered,
    openModalDelete,
    handleOnClickInsert,
    onSearch,
    handleDeleteExite,
    handleEditExite,
    handleCloseModalDelete,
    handleOpenModalDelete,
  } = useExite();

  const columns: ColumnsType<ExiteType> = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'ID Equipamento',
        dataIndex: 'id_equipamento',
        key: 'id_equipamento',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Quant.',
        dataIndex: 'quantidade',
        key: 'quantidade',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Observação',
        dataIndex: 'observacao',
        key: 'observacao',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Ação',
        dataIndex: '',
        key: 'x',
        render: (_, exite) => (
          <>
            <Button
              margin="0px 16px 0px 0px"
              onClick={() => handleEditExite(exite.id)}
              icon={<EditOutlined />}
            ></Button>
            <Button
              danger
              onClick={() => handleOpenModalDelete(exite.id)}
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
          name: 'SAÍDAS',
        },
      ]}
    >
      <Modal
        title="Atenção"
        open={openModalDelete}
        onOk={handleDeleteExite}
        onCancel={handleCloseModalDelete}
        okText="Sim"
        cancelText="Cancelar"
      >
        <p>Tem certeza que deseja excluir está saída ?</p>
      </Modal>
      <BoxButtons>
        <LimiteSizeInput>
          <Search placeholder="Buscar saida" onSearch={onSearch} enterButton />
        </LimiteSizeInput>
        <LimiteSizeButton>
          <Button
            type="primary"
            onClick={() => exitePDF(exitesFiltered)}
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
      <Table columns={columns} dataSource={exitesFiltered} />
    </Screen>
  );
};

export default Exite;
