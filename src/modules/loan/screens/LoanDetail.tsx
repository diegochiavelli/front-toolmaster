import { CheckOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Descriptions, Divider } from 'antd';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import Loading from '../../../shared/components/loading/Loading';
import Screen from '../../../shared/components/screen/Screen';
import { insertMaskInPhone } from '../../../shared/functions/phone';
import { DashboardRoutesEnum } from '../../dashboard/routes';
import { useLoan } from '../hooks/useLoan';
import { useLoanDetail } from '../hooks/useLoanDetail';
import loanDetailPDF from '../reports/loanDetailReport';
import { LoanRoutesEnum } from '../routes';
import { BoxButtons2, LimiteSizeButton } from '../styles/loan.style';

const LoanDetail = () => {
  const { loanId } = useParams<{ loanId: string }>();
  const { loan, loading } = useLoanDetail(loanId);
  const { handleChangeStatusLoan } = useLoan();
  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'HOME',
          navigateTo: DashboardRoutesEnum.DASHBOARD,
        },
        {
          name: 'EMPRÉSTIMOS',
          navigateTo: LoanRoutesEnum.LOAN,
        },
        {
          name: 'DETALHES',
        },
      ]}
    >
      {!loan || loading ? (
        <Loading size="large" />
      ) : (
        <>
          <Descriptions title="Empréstimo" bordered>
            <Descriptions.Item label="ID empréstimo" span={4}>
              {loan.emprestimo?.id}
            </Descriptions.Item>
            <Descriptions.Item label="Data saída">
              {moment(loan.emprestimo?.dataSaida).format('DD-MM-YYYY')}
            </Descriptions.Item>
            <Descriptions.Item label="Data devolução" span={2}>
              {moment(loan.emprestimo?.dataDevolucao).format('DD-MM-YYYY')}
            </Descriptions.Item>
            <Descriptions.Item label="Observação">{loan.emprestimo?.observacao} </Descriptions.Item>
            <Descriptions.Item label="Status">{loan.emprestimo?.status}</Descriptions.Item>
          </Descriptions>
          <Divider />
          <Descriptions title="Item" bordered>
            {loan.item?.map((item) => (
              <>
                <Divider />
                <Divider />
                <Divider />
                <Descriptions.Item label="ID equipamento">{item.id_equipamento}</Descriptions.Item>
                <Descriptions.Item label="Quantidade" span={1}>
                  {item.quantidade}
                </Descriptions.Item>
                <Descriptions.Item label="Nome">
                  {loan.equipamento?.map((test) => {
                    if (test.id == item.id_equipamento) {
                      return test.nome;
                    }
                  })}
                </Descriptions.Item>
                <Descriptions.Item label="Modelo">
                  {loan.equipamento?.map((test) => {
                    if (test.id == item.id_equipamento) {
                      return test.modelo;
                    }
                  })}
                </Descriptions.Item>
                <Descriptions.Item label="Marca">
                  {loan.equipamento?.map((test) => {
                    if (test.id == item.id_equipamento) {
                      return test.marca;
                    }
                  })}
                </Descriptions.Item>
                <Divider />
              </>
            ))}
          </Descriptions>
          <Divider />
          <Descriptions title="Colaborador" bordered>
            <Descriptions.Item label="ID colaborador" span={4}>
              {loan.colaborador?.id}
            </Descriptions.Item>
            <Descriptions.Item label="Nome">{loan.colaborador?.nome}</Descriptions.Item>
            <Descriptions.Item label="Telefone">
              {insertMaskInPhone(loan.colaborador?.telefone || '')}
            </Descriptions.Item>
            <Descriptions.Item label="Cargo">{loan.colaborador?.cargo}</Descriptions.Item>
          </Descriptions>
        </>
      )}

      <Divider />
      <BoxButtons2>
        {loan?.emprestimo &&
          (loan?.emprestimo.status === 'Pendente' || loan?.emprestimo.status === 'Vencido') && (
            <LimiteSizeButton>
              <Button
                margin="0px 16px 0px 0px"
                onClick={() => handleChangeStatusLoan(loan?.emprestimo?.id ?? 0)}
                icon={<CheckOutlined />}
              >
                Concluir
              </Button>
            </LimiteSizeButton>
          )}

        <LimiteSizeButton>
          <Button
            type="primary"
            onClick={() => loan && loanDetailPDF([loan])}
            icon={<FilePdfOutlined />}
          >
            Gerar PDF
          </Button>
        </LimiteSizeButton>
      </BoxButtons2>
    </Screen>
  );
};

export default LoanDetail;
