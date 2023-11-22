import { CheckOutlined, DeleteOutlined, EditOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Input, Modal } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import Screen from '../../../shared/components/screen/Screen';
import Table from '../../../shared/components/table/Table';
import { DashboardRoutesEnum } from '../../dashboard/routes';
import { useLoan } from '../hooks/useLoan';
import loanPDF from '../reports/loanReport';
import { LoanRoutesEnum } from '../routes';
import { BoxButtons, LimiteSizeButton, LimiteSizeInput } from '../styles/loan.style';
import { LoanType } from '../types/LoanType';

const { Search } = Input;

const Loan = () => {
  const {
    loansFiltered,
    openModalDelete,
    handleOnClickInsert,
    onSearch,
    handleDeleteLoan,
    handleEditLoan,
    handleCloseModalDelete,
    handleOpenModalDelete,
    handleChangeStatusLoan,
  } = useLoan();

  const navigate = useNavigate();

  const columns: ColumnsType<LoanType> = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Saída',
        dataIndex: 'dataSaida',
        key: 'dataSaida',
        sorter: (a, b) => a.dataSaida.localeCompare(b.dataSaida),
        render: (_, loan) => <a>{moment(loan.dataSaida).format('DD-MM-YYYY')}</a>,
      },
      {
        title: 'Devolução',
        dataIndex: 'dataDevolucao',
        key: 'dataDevolucao',
        sorter: (a, b) => a.dataDevolucao.localeCompare(b.dataDevolucao),
        render: (_, loan) => <a>{moment(loan.dataDevolucao).format('DD-MM-YYYY')}</a>,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        sorter: (a, b) => a.status.localeCompare(b.status),
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Observação',
        dataIndex: 'observacao',
        key: 'observacao',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Colaborador',
        dataIndex: 'id_funcionario',
        key: 'id_funcionario',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Ação',
        dataIndex: '',
        key: 'x',
        render: (_, loan) => (
          <>
            <Button
              margin="0px 16px 0px 0px"
              onClick={() => handleEditLoan(loan.id)}
              icon={<EditOutlined />}
            ></Button>
            <Button
              margin="0px 16px 0px 0px"
              onClick={() => handleChangeStatusLoan(loan.id)}
              icon={<CheckOutlined />}
            ></Button>
            <Button
              danger
              onClick={() => handleOpenModalDelete(loan.id)}
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
          name: 'EMPRÉSTIMOS',
        },
      ]}
    >
      <Modal
        title="Atenção"
        open={openModalDelete}
        onOk={handleDeleteLoan}
        onCancel={handleCloseModalDelete}
        okText="Sim"
        cancelText="Cancelar"
      >
        <p>Tem certeza que deseja excluir este emprestimo?</p>
      </Modal>
      <BoxButtons>
        <LimiteSizeInput>
          <Search placeholder="Buscar empréstimo por ID" onSearch={onSearch} enterButton />
        </LimiteSizeInput>
        <LimiteSizeButton>
          <Button type="primary" onClick={() => loanPDF(loansFiltered)} icon={<FilePdfOutlined />}>
            Gerar PDF
          </Button>
        </LimiteSizeButton>
        <LimiteSizeButton>
          <Button type="primary" onClick={handleOnClickInsert}>
            Adicionar
          </Button>
        </LimiteSizeButton>
      </BoxButtons>
      <Table
        // onRow={(record) => ({
        //   onClick: () => navigate(`${LoanRoutesEnum.LOAN_ID}/${record.id}`),
        // })}
        onRow={(record) => ({
          onDoubleClick: () => navigate(`${LoanRoutesEnum.LOAN_DETAIL}/${record.id}`),
        })}
        columns={columns}
        dataSource={loansFiltered}
      />
    </Screen>
  );
};

export default Loan;
