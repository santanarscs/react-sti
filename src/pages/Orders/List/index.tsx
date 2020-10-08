import React, { useState, useEffect } from 'react';

import { Container, ContentTable } from './styles';
import api from '../../../services/api';
import Pagination from '../../../components/Pagination';

const List: React.FC = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    api.get('orders').then((response) => setOrders(response.data));
  }, []);
  return (
    <Container>
      <h1>Ordem de serviços</h1>
      <ContentTable>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Data de criação</th>
              <th>Usuário</th>
              <th>Descrição</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.data_criacao}</td>
                <td>{order.usuario}</td>
                <td>{order.descricao}</td>
                <td>{order.tipo}</td>
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

export default List;
