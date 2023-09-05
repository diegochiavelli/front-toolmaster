import {
  FileSearchOutlined,
  HomeOutlined,
  InteractionOutlined,
  ToolOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu as MenuAntd } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CollaboratorRoutesEnum } from '../../../modules/collaborator/routes';
import { ContainerLogoName, ContainerMenu, LogoMenu, NameCompany } from './menu.style';

type MenuItem = Required<MenuProps>['items'][number];

const Menu = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('1');

  const items: MenuItem[] = [
    {
      key: 'home',
      label: 'Principal',
      icon: <HomeOutlined />,
    },
    {
      key: 'collaborators',
      label: 'Colaboradores',
      icon: <UsergroupAddOutlined />,
      children: [
        {
          key: 'collaborators_view',
          label: 'Visualizar',
          onClick: () => navigate(CollaboratorRoutesEnum.COLLABORATOR),
        },
        {
          key: 'collaborators_insert',
          label: 'Adicionar',
          onClick: () => navigate(CollaboratorRoutesEnum.COLLABORATOR_INSERT),
        },
      ],
    },
    {
      key: 'users',
      label: 'Usuários',
      icon: <UserOutlined />,
      children: [
        {
          key: 'users_view',
          label: 'Visualizar',
          onClick: () => null,
        },
        {
          key: 'users_insert',
          label: 'Adicionar',
          onClick: () => null,
        },
      ],
    },
    {
      key: 'equipments',
      label: 'Equipamentos',
      icon: <ToolOutlined />,
    },
    {
      key: 'loan',
      label: 'Empréstimos',
      icon: <InteractionOutlined />,
    },
    {
      key: 'reports',
      label: 'Relatórios',
      icon: <FileSearchOutlined />,
    },
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <ContainerMenu>
      <ContainerLogoName>
        <LogoMenu />
        <NameCompany>TOOLMASTER</NameCompany>
      </ContainerLogoName>
      <MenuAntd
        theme="dark"
        onClick={onClick}
        style={{ width: 240 }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
    </ContainerMenu>
  );
};

export default Menu;
