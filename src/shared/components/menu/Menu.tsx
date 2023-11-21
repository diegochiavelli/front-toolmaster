import {
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
import { DashboardRoutesEnum } from '../../../modules/dashboard/routes';
import { EntryRoutesEnum } from '../../../modules/entry/routes';
import { EquipmentRoutesEnum } from '../../../modules/equipment/routes';
import { ExiteRoutesEnum } from '../../../modules/exite/routes';
import { LoanRoutesEnum } from '../../../modules/loan/routes';
import { UserRoutesEnum } from '../../../modules/user/routes';
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
      onClick: () => navigate(DashboardRoutesEnum.DASHBOARD),
    },
    {
      key: 'collaborators',
      label: 'Colaboradores',
      icon: <UsergroupAddOutlined />,
      onClick: () => navigate(CollaboratorRoutesEnum.COLLABORATOR),
    },
    {
      key: 'loan',
      label: 'Empréstimos',
      icon: <InteractionOutlined />,
      onClick: () => navigate(LoanRoutesEnum.LOAN),
    },
    {
      key: 'equipments',
      label: 'Equipamentos',
      icon: <ToolOutlined />,
      children: [
        {
          key: 'estoque',
          label: 'Estoque',
          onClick: () => navigate(EquipmentRoutesEnum.EQUIPMENT),
        },
        {
          key: 'entry',
          label: 'Entradas',
          onClick: () => navigate(EntryRoutesEnum.ENTRY),
        },
        {
          key: 'exite',
          label: 'Saídas',
          onClick: () => navigate(ExiteRoutesEnum.EXITE),
        },
      ],
    },
    {
      key: 'users',
      label: 'Usuários',
      icon: <UserOutlined />,
      onClick: () => navigate(UserRoutesEnum.USER),
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
