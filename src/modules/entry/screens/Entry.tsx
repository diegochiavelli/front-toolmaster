import { DeleteOutlined, EditOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Input, Modal } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';

import Button from '../../../shared/components/buttons/button/Button';
import Screen from '../../../shared/components/screen/Screen';
import Table from '../../../shared/components/table/Table';
import { DashboardRoutesEnum } from '../../dashboard/routes';
import { useEntry } from '../hooks/useEntry';
import entryPDF from '../reports/entryReport';
import { BoxButtons, LimiteSizeButton, LimiteSizeInput } from '../styles/entry.style';
import { EntryType } from '../types/EntryType';

const { Search } = Input;

const Entry = () => {
  const {
    entrysFiltered,
    openModalDelete,
    handleOnClickInsert,
    onSearch,
    handleDeleteEntry,
    handleEditEntry,
    handleCloseModalDelete,
    handleOpenModalDelete,
  } = useEntry();

  const columns: ColumnsType<EntryType> = useMemo(
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
        title: 'Preço',
        dataIndex: 'preco',
        key: 'preco',
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
        render: (_, entry) => (
          <>
            <Button
              margin="0px 16px 0px 0px"
              onClick={() => handleEditEntry(entry.id)}
              icon={<EditOutlined />}
            ></Button>
            <Button
              danger
              onClick={() => handleOpenModalDelete(entry.id)}
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
          name: 'ENTRADAS',
        },
      ]}
    >
      <Modal
        title="Atenção"
        open={openModalDelete}
        onOk={handleDeleteEntry}
        onCancel={handleCloseModalDelete}
        okText="Sim"
        cancelText="Cancelar"
      >
        <p>Tem certeza que deseja excluir está entrada ?</p>
      </Modal>
      <BoxButtons>
        <LimiteSizeInput>
          <Search placeholder="Buscar entrada" onSearch={onSearch} enterButton />
        </LimiteSizeInput>
        <LimiteSizeButton>
          <Button
            type="primary"
            onClick={() => entryPDF(entrysFiltered)}
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
      <Table columns={columns} dataSource={entrysFiltered} />
    </Screen>
  );
};

export default Entry;
