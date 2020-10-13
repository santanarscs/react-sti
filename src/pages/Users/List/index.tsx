import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import api from '../../../services/api';
import Pagination from '../../../components/Pagination';

import { Container, HeaderContent, Table, Row } from './styles';
import IUser from '../../../interfaces/IUser';

const Users: React.FC = (): JSX.Element => {
  const [users, setUsers] = useState<IUser[]>([]);
  const history = useHistory();
  useEffect(() => {
    api.get<IUser[]>('/users').then((response) => setUsers(response.data));
  }, []);

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
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <Row
              key={user.id}
              onClick={() => history.push(`/users/detail/${user.id}`)}
            >
              <td>
                <img src={user.avatar} alt={user.name} />
              </td>
              <td>{`${user.graduation.name} ${user.name}`}</td>
              <td>{user.section.name}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
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
