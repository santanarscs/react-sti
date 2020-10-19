import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import Pagination from '../../../components/Pagination';

import IUser from '../../../interfaces/IUser';
import { Container, Table, Row } from './styles';
import Header from '../../../components/Header';

interface ISearchFormData {
  term: string;
}

const Users: React.FC = (): JSX.Element => {
  const [users, setUsers] = useState<IUser[]>([]);

  const [total, setTotal] = useState<number>(0);
  const [limit] = useState(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [queryName, setQueryName] = useState<string | undefined>();

  const history = useHistory();

  useEffect(() => {
    async function loadUsers() {
      const params = { page: currentPage, limit, queryName };
      const response = await api.get<IUser[]>('/users', { params });

      const usersData = response.data.map((user) => ({
        ...user,
        avatar: user.avatar
          ? `${process.env.REACT_APP_SERVER_URL}/uploads/${user.avatar}`
          : `https://ui-avatars.com/api/?name=${user.full_name}`,
      }));
      setUsers(usersData);
      setTotal(Number(response.headers['x-total-count']));
    }
    loadUsers();
  }, [currentPage, limit, queryName]);

  const handleSearchSubmit = useCallback(
    ({ term }: ISearchFormData) => {
      setCurrentPage(1);
      setQueryName(term || undefined);
    },
    [setQueryName, setCurrentPage],
  );

  return (
    <Container>
      <Header
        initialName={queryName}
        onSubmit={handleSearchSubmit}
        createPage="/users/new"
        title="Usuários"
        placeholder="Digite um termo de pesquisa"
      />
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
        currentPage={currentPage}
        total={total}
        setCurrentPage={setCurrentPage}
        limit={limit}
      />
    </Container>
  );
};

export default Users;
