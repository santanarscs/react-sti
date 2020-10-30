import React, { useState, useEffect, useCallback } from 'react';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { useHistory } from 'react-router-dom';
import Switch from 'react-switch';
import { Container, Table, Row, SwitchContainer } from './styles';
import api from '../../../services/api';
import Pagination from '../../../components/Pagination';
import Header from '../../../components/Header';

interface ISearchFormData {
  term: string;
}

interface IType {
  name: string;
  color: string;
}

interface IOrder {
  id: string;
  description: string;
  created_at: string;
  user: string;
  type: IType;
  status: 'ABERTO' | 'FECHADO';
}

const List: React.FC = () => {
  const [isOld, setIsOld] = useState<boolean>(false);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [limit] = useState(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [queryName, setQueryName] = useState<string | undefined>();
  const history = useHistory();

  useEffect(() => {
    async function loadOrders() {
      const params = { page: currentPage, limit, queryName };
      const response = await api.get('/orders', {
        params: { ...params, isOld },
      });
      const dataOrders = response.data.map((order: IOrder) => ({
        ...order,
        created_at: formatDistance(parseISO(order.created_at), new Date(), {
          addSuffix: true,
          locale: pt,
        }),
      }));
      setOrders(dataOrders);
      setTotal(Number(response.headers['x-total-count']));
    }
    loadOrders();
  }, [currentPage, limit, queryName, isOld]);

  const handleSearchSubmit = useCallback(
    ({ term }: ISearchFormData) => {
      setCurrentPage(1);
      setQueryName(term || undefined);
    },
    [setQueryName, setCurrentPage],
  );
  const handleChangeIsOld = useCallback((status: boolean) => {
    setIsOld(status);
  }, []);

  return (
    <Container>
      <Header
        initialName={queryName}
        onSubmit={handleSearchSubmit}
        createPage="/orders/new"
        title="Serviços"
        placeholder="Digite um termo de pesquisa"
      />
      <SwitchContainer>
        <Switch onChange={handleChangeIsOld} checked={isOld} />
        <span>Fecahdos?</span>
      </SwitchContainer>
      <Table>
        <thead>
          <tr>
            <th>Data de criação</th>
            <th>Usuário</th>
            <th>Tipo</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <Row
              status={order.status}
              key={order.id}
              onClick={() => history.push(`/orders/detail/${order.id}`)}
            >
              <td>{order.created_at}</td>
              <td>{order.user}</td>
              <td>{order.type.name}</td>
              <td>{order.description}</td>
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
