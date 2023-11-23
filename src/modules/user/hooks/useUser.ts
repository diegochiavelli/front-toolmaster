import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_USER_ID, URL_USERR } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useUserReducer } from '../../../store/reducers/userReducer/useUserReducer';
import { UserRoutesEnum } from '../routes';
import { UserType } from '../types/UserType';

export const useUser = () => {
  const [userIdDelete, setUserIdDelete] = useState<number | undefined>();
  const { users, setUsers } = useUserReducer();
  const [usersFiltered, setUsersFiltered] = useState<UserType[]>([]);
  const { request } = useRequests();
  const navigate = useNavigate();

  useEffect(() => {
    setUsersFiltered([...users]);
  }, [users]);

  useEffect(() => {
    request<UserType[]>(URL_USERR, MethodsEnum.GET, setUsers);
  }, []);

  const handleOnClickInsert = () => {
    navigate(UserRoutesEnum.USER_INSERT);
  };

  const onSearch = (value: string) => {
    if (!value) {
      setUsersFiltered([...users]);
    } else {
      setUsersFiltered([
        ...usersFiltered.filter((user) => user.nome.toUpperCase().includes(value.toUpperCase())),
        ...usersFiltered.filter((user) => user.id.toString().includes(value)),
      ]);
    }
  };

  const handleDeleteUser = async () => {
    await request(
      URL_USER_ID.replace('{usuariosId}', `${userIdDelete}`),
      MethodsEnum.DELETE,
      undefined,
      undefined,
      'Usuário excluído!',
    );
    await request<UserType[]>(URL_USERR, MethodsEnum.GET, setUsers);
    setUserIdDelete(undefined);
  };

  const handleEditUser = async (userId: number) => {
    navigate(UserRoutesEnum.USER_EDIT.replace(':userId', `${userId}`));
  };

  const handleCloseModalDelete = () => {
    setUserIdDelete(undefined);
  };
  const handleOpenModalDelete = (userId: number) => {
    setUserIdDelete(userId);
  };

  return {
    usersFiltered,
    openModalDelete: !!userIdDelete,
    handleOnClickInsert,
    onSearch,
    handleDeleteUser,
    handleEditUser,
    handleCloseModalDelete,
    handleOpenModalDelete,
  };
};
