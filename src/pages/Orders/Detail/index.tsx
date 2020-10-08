import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../services/api';

import { Container } from './styles';

const Detail: React.FC = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({} as any);
  useEffect(() => {
    api.get(`/orders/${id}`).then((response) => setOrder(response.data));
  }, [id]);
  return (
    <Container>
      <h1>Detalhes</h1>
      <ul>
        <li>
          <strong>Data da criação: </strong>
          <span>{order.data_criacao}</span>
        </li>
        <li>
          <strong>Descrição: </strong>
          <span>{order.descricao}</span>
        </li>
        <li>
          <strong>Status: </strong>
          <span>{order.local}</span>
        </li>
        <li>
          <strong>Usuário: </strong>
          <span>{order.usuario}</span>
        </li>
        <li>
          <strong>Solucionador: </strong>
          <span>{order.solucionador}</span>
        </li>
      </ul>
    </Container>
  );
};

export default Detail;
