import { DeleteOutlined, EditOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Input, Modal } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';

import Button from '../../../shared/components/buttons/button/Button';
import Screen from '../../../shared/components/screen/Screen';
import Table from '../../../shared/components/table/Table';
import { DashboardRoutesEnum } from '../../dashboard/routes';
import { useUser } from '../hooks/useUser';
import userPDF from '../reports/userReport';
import { BoxButtons, LimiteSizeButton, LimiteSizeInput } from '../styles/user.style';
import { UserType } from '../types/UserType';

const { Search } = Input;

const User = () => {
  const {
    usersFiltered,
    openModalDelete,
    handleOnClickInsert,
    onSearch,
    handleDeleteUser,
    handleEditUser,
    handleCloseModalDelete,
    handleOpenModalDelete,
  } = useUser();

  const columns: ColumnsType<UserType> = useMemo(
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
        title: 'E-mail',
        dataIndex: 'email',
        key: 'email',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Ação',
        dataIndex: '',
        key: 'x',
        render: (_, user) => (
          <>
            <Button
              margin="0px 16px 0px 0px"
              onClick={() => handleEditUser(user.id)}
              icon={<EditOutlined />}
            ></Button>
            <Button
              danger
              onClick={() => handleOpenModalDelete(user.id)}
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
          name: 'USUÁRIOS',
        },
      ]}
    >
      <Modal
        title="Atenção"
        open={openModalDelete}
        onOk={handleDeleteUser}
        onCancel={handleCloseModalDelete}
        okText="Sim"
        cancelText="Cancelar"
      >
        <p>Tem certeza que deseja excluir este usuário?</p>
      </Modal>
      <BoxButtons>
        <LimiteSizeInput>
          <Search placeholder="Buscar usuario" onSearch={onSearch} enterButton />
        </LimiteSizeInput>
        <LimiteSizeButton>
          <Button type="primary" onClick={() => userPDF(usersFiltered)} icon={<FilePdfOutlined />}>
            Gerar PDF
          </Button>
        </LimiteSizeButton>
        <LimiteSizeButton>
          <Button type="primary" onClick={handleOnClickInsert}>
            Adicionar
          </Button>
        </LimiteSizeButton>
      </BoxButtons>
      <Table columns={columns} dataSource={usersFiltered} />
    </Screen>
  );
};

export default User;
