import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import api from '../../../services/api';
import { Container, Table, Row, MenuActionItem } from './styles';
import Pagination from '../../../components/Pagination';
import Dropdown from '../../../components/Dropdown';

const Users: React.FC = (): JSX.Element => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/users').then((response) => setUsers(response.data));
  }, []);
  return (
    <Container>
      <h1>Lista de usuários</h1>
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
                    <button type="button" onClick={() => alert('remover')}>
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
