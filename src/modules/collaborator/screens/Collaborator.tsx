import { DeleteOutlined, EditOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Input, Modal } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';

import Button from '../../../shared/components/buttons/button/Button';
import Screen from '../../../shared/components/screen/Screen';
import Table from '../../../shared/components/table/Table';
import { insertMaskInCpf } from '../../../shared/functions/cpf';
import { insertMaskInPhone } from '../../../shared/functions/phone';
import { DashboardRoutesEnum } from '../../dashboard/routes';
import { useCollaborator } from '../hooks/useCollaborator';
import collaboratorPDF from '../reports/collaboratorReport';
import { BoxButtons, LimiteSizeButton, LimiteSizeInput } from '../styles/collaborator.style';
import { CollaboratorType } from '../types/CollaboratorType';

const { Search } = Input;

const Collaborator = () => {
  const {
    collaboratorsFiltered,
    openModalDelete,
    handleOnClickInsert,
    onSearch,
    handleDeleteCollaborator,
    handleEditCollaborator,
    handleCloseModalDelete,
    handleOpenModalDelete,
  } = useCollaborator();

  const columns: ColumnsType<CollaboratorType> = useMemo(
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
        title: 'CPF',
        dataIndex: 'cpf',
        key: 'cpf',
        render: (_, collaborator) => <a>{insertMaskInCpf(collaborator.cpf)}</a>,
      },
      {
        title: 'Telefone',
        dataIndex: 'telefone',
        key: 'telefone',
        render: (_, collaborator) => <a>{insertMaskInPhone(collaborator.telefone)}</a>,
      },
      {
        title: 'Cargo',
        dataIndex: 'cargo',
        key: 'cargo',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Ação',
        dataIndex: '',
        key: 'x',
        render: (_, collaborator) => (
          <>
            <Button
              margin="0px 16px 0px 0px"
              onClick={() => handleEditCollaborator(collaborator.id)}
              icon={<EditOutlined />}
            ></Button>
            <Button
              danger
              onClick={() => handleOpenModalDelete(collaborator.id)}
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
          name: 'COLABORADORES',
        },
      ]}
    >
      <Modal
        title="Atenção"
        open={openModalDelete}
        onOk={handleDeleteCollaborator}
        onCancel={handleCloseModalDelete}
        okText="Sim"
        cancelText="Cancelar"
      >
        <p>Tem certeza que deseja excluir este colaborador?</p>
      </Modal>
      <BoxButtons>
        <LimiteSizeInput>
          <Search placeholder="Buscar colaborador" onSearch={onSearch} enterButton />
        </LimiteSizeInput>
        <LimiteSizeButton>
          <Button
            type="primary"
            onClick={() => collaboratorPDF(collaboratorsFiltered)}
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
      <Table columns={columns} dataSource={collaboratorsFiltered} />
    </Screen>
  );
};

export default Collaborator;
