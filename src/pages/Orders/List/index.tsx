import React, { useState, useEffect } from 'react';

import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Container, Table, Row, MenuActionItem } from './styles';
import api from '../../../services/api';
import Pagination from '../../../components/Pagination';
import Dropdown from '../../../components/Dropdown';

const List: React.FC = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    api.get('orders').then((response) => setOrders(response.data));
  }, []);
  return (
    <Container>
      <h1>Ordem de serviços</h1>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Data de criação</th>
            <th>Usuário</th>
            <th>Descrição</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: any) => (
            <Row key={order.id}>
              <td>{order.id}</td>
              <td>{order.data_criacao}</td>
              <td>{order.usuario}</td>
              <td>{order.descricao}</td>
              <td>{order.tipo}</td>
              <td>
                <Dropdown icon={FiMenu}>
                  <MenuActionItem>
                    <Link to={`orders/detail/${order.id}`}>
                      <span>Detalhes</span>
                    </Link>
                  </MenuActionItem>
                  <MenuActionItem>
                    <Link to={`orders/edit/${order.id}`}>
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

export default List;
