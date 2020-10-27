import React, { useState, useEffect, useCallback } from 'react';

import { useHistory } from 'react-router-dom';
import { Container, Table, Row } from './styles';
import api from '../../../services/api';
import Pagination from '../../../components/Pagination';
import Header from '../../../components/Header';

interface ISearchFormData {
  term: string;
}

interface IOrder {
  id: string;
  description: string;
  created_at: Date;
  user: string;
  type: string;
  status: string;
}

const List: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [limit] = useState(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [queryName, setQueryName] = useState<string | undefined>();
  const history = useHistory();

  useEffect(() => {
    async function loadOrders() {
      const params = { page: currentPage, limit, queryName };
      const response = await api.get('/orders', { params });
      setOrders(response.data);
      setTotal(Number(response.headers['x-total-count']));
    }
    loadOrders();
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
        createPage="/orders/new"
        title="Serviços"
        placeholder="Digite um termo de pesquisa"
      />
      <Table>
        <thead>
          <tr>
            <th>Data de criação</th>
            <th>Usuário</th>
            <th>Descrição</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <Row
              key={order.id}
              onClick={() => history.push(`/orders/detail/${order.id}`)}
            >
              <td>{order.created_at}</td>
              <td>{order.user}</td>
              <td>{order.description}</td>
              <td>{order.type}</td>
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

export default List;
