import {
  CheckOutlined,
  ClockCircleOutlined,
  FilePdfOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { Card as CardAntd, Divider } from 'antd';
import Search from 'antd/es/input/Search';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import Screen from '../../../shared/components/screen/Screen';
import { ScreenContainer2 } from '../../../shared/components/screen/screen.style';
import Table from '../../../shared/components/table/Table';
import { convertStatusToNumber, TagColumn } from '../../loan/components/TagStatusColumn';
import { useLoan } from '../../loan/hooks/useLoan';
import { LoanRoutesEnum } from '../../loan/routes';
import { BoxButtons, LimiteSizeButton, LimiteSizeInput } from '../../loan/styles/loan.style';
import { LoanType } from '../../loan/types/LoanType';
import dashboardPDF from '../reports/dashboardReport';

const Dashboard = () => {
  const { loansFiltered, handleChangeStatusLoan, handleChangeStatusVencidoLoan, onSearch } =
    useLoan();

  const quantPendente = loansFiltered.filter((p) => p.status === 'Pendente');
  const quantVencido = loansFiltered.filter((p) => p.status === 'Vencido');

  const today = moment();

  const navigate = useNavigate();

  useEffect(() => {
    loansFiltered.filter((p) => {
      if (p.status === 'Pendente') {
        const diferencaDevolucao = moment(p.dataDevolucao);
        const diaAtual = diferencaDevolucao.diff(today, 'day');
        if (diaAtual < 0) {
          handleChangeStatusVencidoLoan(p.id);
        }
      }
    });
  }, [loansFiltered]);

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
        render: (_, loan) => (
          <TagColumn category={convertStatusToNumber(loan.status)} status={loan.status} />
        ),
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
              onClick={() => handleChangeStatusLoan(loan.id)}
              icon={<CheckOutlined />}
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
        },
      ]}
    >
      <ScreenContainer2>
        <CardAntd
          title={
            <>
              <ClockCircleOutlined
                style={{ color: 'orange', fontSize: '17px', marginRight: '8px' }}
              />
              Empréstimos Pendentes
            </>
          }
          bordered={false}
          style={{
            width: 270,
            height: 130,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            textAlign: 'center',
            marginRight: '20px',
            fontSize: '20px',
          }}
        >
          <span style={{ fontSize: '20px', fontWeight: 'bold', margin: '10px' }}>
            {quantPendente.length}
          </span>
        </CardAntd>
        <CardAntd
          title={
            <>
              <WarningOutlined style={{ color: 'red', fontSize: '17px', marginRight: '8px' }} />
              Empréstimos Vencidos
            </>
          }
          bordered={false}
          style={{
            width: 270,
            height: 130,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            textAlign: 'center',
            marginRight: '20px',
            fontSize: '20px',
          }}
        >
          <span style={{ fontSize: '20px', fontWeight: 'bold', margin: '10px' }}>
            {quantVencido.length}
          </span>
        </CardAntd>
      </ScreenContainer2>

      <BoxButtons>
        <LimiteSizeInput>
          <Search placeholder="Buscar empréstimo por ID" onSearch={onSearch} enterButton />
        </LimiteSizeInput>
        <LimiteSizeButton>
          <Button
            type="primary"
            onClick={() => dashboardPDF(loansFiltered)}
            icon={<FilePdfOutlined />}
          >
            Gerar PDF
          </Button>
        </LimiteSizeButton>
      </BoxButtons>
      <Divider />
      <Table
        columns={columns}
        onRow={(record) => ({
          onDoubleClick: () => navigate(`${LoanRoutesEnum.LOAN_DETAIL}/${record.id}`),
        })}
        dataSource={[
          ...loansFiltered.filter((loan) => loan.status.includes('Vencido')),
          ...loansFiltered.filter((loan) => loan.status.includes('Pendente')),
        ]}
      />
    </Screen>
  );
};

export default Dashboard;
