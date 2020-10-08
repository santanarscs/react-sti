import React, { useEffect, useState } from 'react';
import api from '../../../services/api';

import { Container, ContentTable } from './styles';
import Pagination from '../../../components/Pagination';

const Users: React.FC = (): JSX.Element => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/users').then((response) => setUsers(response.data));
  }, []);
  return (
    <Container>
      <h1>Lista de usuários</h1>
      <ContentTable>
        <table>
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
            {users.map((user: any) => (
              <tr key={user.id}>
                <td>
                  <img src={user.image_url} alt={user.nome} />
                </td>
                <td>{`${user.post_grad_id} ${user.nome_guerra}`}</td>
                <td>{user.secao}</td>
                <td>{user.ramal}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ContentTable>
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
