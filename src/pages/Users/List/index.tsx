import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import api from '../../../services/api';
import Pagination from '../../../components/Pagination';

import { Container, HeaderContent, Table, Row } from './styles';

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
                <img src={user.image_url} alt={user.nome} />
              </td>
              <td>{`${user.post_grad_id} ${user.nome_guerra}`}</td>
              <td>{user.secao}</td>
              <td>{user.ramal}</td>
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
