import { Input } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import Screen from '../../../shared/components/screen/Screen';
import Table from '../../../shared/components/table/Table';
import { URL_COLLABORATOR } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useCollaboratorReducer } from '../../../store/reducers/collaboratorReducer/useCollaboratorReducer';
import { CollaboratorRoutesEnum } from '../routes';
import { BoxButtons, LimiteSizeButton, LimiteSizeInput } from '../styles/collaborator.style';
import { CollaboratorType } from '../types/CollaboratorType';

const { Search } = Input;

const columns: ColumnsType<CollaboratorType> = [
  {
    title: 'Id',
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
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Telefone',
    dataIndex: 'telefone',
    key: 'telefone',
    render: (text) => <a>{text}</a>,
  },
];

const Collaborator = () => {
  const { collaborators, setCollaborators } = useCollaboratorReducer();

  const [collaboratorsFiltered, setCollaboratorsFiltered] = useState<CollaboratorType[]>([]);
  const { request } = useRequests();
  const navigate = useNavigate();

  useEffect(() => {
    setCollaboratorsFiltered([...collaborators]);
  }, [collaborators]);

  useEffect(() => {
    request<CollaboratorType[]>(URL_COLLABORATOR, MethodsEnum.GET, setCollaborators);
  }, []);

  const handleOnClickInsert = () => {
    navigate(CollaboratorRoutesEnum.COLLABORATOR_INSERT);
  };

  const onSearch = (value: string) => {
    if (!value) {
      setCollaboratorsFiltered([...collaborators]);
    } else {
      setCollaboratorsFiltered([
        ...collaboratorsFiltered.filter((collaborator) => collaborator.nome.includes(value)),
      ]);
    }
  };
  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'HOME',
        },
        {
          name: 'COLABORADORES',
        },
      ]}
    >
      <BoxButtons>
        <LimiteSizeInput>
          <Search placeholder="Buscar colaborador" onSearch={onSearch} enterButton />
        </LimiteSizeInput>

        <LimiteSizeButton>
          <Button type="primary" onClick={handleOnClickInsert}>
            Adicionar
          </Button>
        </LimiteSizeButton>
      </BoxButtons>
      <Table columns={columns} dataSource={collaboratorsFiltered} />;
    </Screen>
  );
};

export default Collaborator;
