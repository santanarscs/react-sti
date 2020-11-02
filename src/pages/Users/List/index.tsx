import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import Pagination from '../../../components/Pagination';

import IUser from '../../../interfaces/IUser';
import { Container, Table, Row } from './styles';
import Header from '../../../components/Header';

import { CONTAINER_ANIMATION } from '../../../animations';

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

      setUsers(response.data);
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
    <Container
      variants={CONTAINER_ANIMATION}
      initial="unMounted"
      animate="mounted"
      exit="unMounted"
      transition={{ duration: 0.5 }}
    >
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
            <th>Nome</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <Row
              key={user.id}
              onClick={() => history.push(`/users/detail/${user.id}`)}
            >
              <td />
              <td>{user.name}</td>
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
