import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiPlus } from 'react-icons/fi';
import api from '../../../services/api';
import Pagination from '../../../components/Pagination';
import Dropdown from '../../../components/Dropdown';
import Delete from './Delete';

import { Container, HeaderContent, Table, Row, MenuActionItem } from './styles';
import { useModal } from '../../../hooks/modal';

interface IUser {
  id: string;
  nome: string;
  nome_guerra: string;
  post_grad_id: string;
  secao: string;
  ramal: string;
  email: string;
  image_url: string;
}

const Users: React.FC = (): JSX.Element => {
  const [users, setUsers] = useState<IUser[]>([]);
  const { openModal } = useModal();

  useEffect(() => {
    api.get('/users').then((response) => setUsers(response.data));
  }, []);

  const handleRemoveUserList = useCallback((id: string) => {
    setUsers((state) => state.filter((user) => user.id !== id));
  }, []);

  const handleRemoveItem = useCallback(
    (user: IUser) => {
      openModal({
        title: 'Remover usuário',
        container: () => Delete({ user, handleRemoveUserList }),
      });
    },
    [openModal, handleRemoveUserList],
  );
  return (
    <Container>
      <HeaderContent>
        <Link to="/users/new">
          <FiPlus size={20} />
          Cadastrar
        </Link>
        <h1>Lista de usuários</h1>
      </HeaderContent>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome de guerra</th>
            <th>Seção</th>
            <th>Ramal</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <Row key={user.id}>
              <td>
                <img src={user.image_url} alt={user.nome} />
              </td>
              <td>{`${user.post_grad_id} ${user.nome_guerra}`}</td>
              <td>{user.secao}</td>
              <td>{user.ramal}</td>
              <td>{user.email}</td>
              <td>
                <Dropdown icon={FiMenu}>
                  <MenuActionItem>
                    <Link to={`/users/detail/${user.id}`}>
                      <span>Detalhes</span>
                    </Link>
                  </MenuActionItem>
                  <MenuActionItem>
                    <Link to={`/users/edit/${user.id}`}>
                      <span>Editar</span>
                    </Link>
                  </MenuActionItem>
                  <MenuActionItem>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(user)}
                    >
                      <span>Remover</span>
                    </button>
                  </MenuActionItem>
                </Dropdown>
              </td>
            </Row>
          ))}
        </tbody>
      </Table>
      <Pagination
        currentPage={1}
        total={100}
        setCurrentPage={() => console.log('alskdf')}
        limit={10}
      />
    </Container>
  );
};

export default Users;
