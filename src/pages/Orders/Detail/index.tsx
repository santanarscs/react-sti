import React, { useState, useEffect, useCallback } from 'react';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import Delete from './Delete';
import { useModal } from '../../../hooks/modal';
import Solve from './Solve';
import parseDate from '../../../utils/parseDate';
import { Container, HeaderContent, SolvedButton, DeleteButton } from './styles';
import { CONTAINER_ANIMATION } from '../../../animations';

interface IType {
  name: string;
  color: string;
}

interface IUser {
  name: string;
}

interface IOrder {
  id: string;
  description: string;
  created_at: string;
  owner: string;
  type: IType;
  solver: IUser;
  status: string;
  resolution_date: string;
  resolution: string;
}

const Detail: React.FC = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<IOrder>();
  const { openModal } = useModal();
  const history = useHistory();

  useEffect(() => {
    api.get(`/orders/${id}`).then((response) =>
      setOrder({
        ...response.data,
        created_at: formatDistance(
          parseISO(response.data.created_at),
          new Date(),
          {
            addSuffix: true,
            locale: pt,
          },
        ),
      }),
    );
  }, [id]);

  const handleRedirect = useCallback(() => {
    history.push('/orders');
  }, [history]);

  const handleRemoveItem = useCallback(() => {
    openModal({
      title: 'Remover serviço',
      container: () => Delete({ id, handleRedirect }),
    });
  }, [id, openModal, handleRedirect]);

  const handleOpenSolveModal = useCallback(() => {
    openModal({
      title: 'Resolver serviço',
      container: () => Solve({ id, handleRedirect }),
    });
  }, [openModal, id, handleRedirect]);

  if (!order) {
    return (
      <Container
        variants={CONTAINER_ANIMATION}
        initial="unMounted"
        animate="mounted"
        exit="unMounted"
        transition={{ duration: 0.5 }}
      >
        <h1>Carregando</h1>
      </Container>
    );
  }
  return (
    <Container
      variants={CONTAINER_ANIMATION}
      initial="unMounted"
      animate="mounted"
      exit="unMounted"
      transition={{ duration: 0.5 }}
    >
      <HeaderContent>
        <h1>Detalhes</h1>
        <div>
          <Link to="/orders">Voltar</Link>
          {order.status !== 'FECHADO' && (
            <>
              <Link to={`/orders/edit/${order.id}`}>Editar</Link>
              <SolvedButton type="button" onClick={handleOpenSolveModal}>
                Resolver
              </SolvedButton>
              <DeleteButton type="button" onClick={handleRemoveItem}>
                Remover
              </DeleteButton>
            </>
          )}
        </div>
      </HeaderContent>
      <ul>
        <li>
          <strong>Data da criação: </strong>
          <span>{order.created_at}</span>
        </li>
        <li>
          <strong>Tipo: </strong>
          <span>{order.type.name}</span>
        </li>
        <li>
          <strong>Usuário: </strong>
          <span>{order.owner}</span>
        </li>
        <li>
          <strong>Status: </strong>
          <span>{order.status}</span>
        </li>

        <li>
          <strong>Descrição: </strong>
          <span>{order.description}</span>
        </li>
        {order.status === 'FECHADO' && (
          <>
            <li>
              <strong>Solucionador: </strong>
              <span>{order.solver.name}</span>
            </li>
            <li>
              <strong>Data da solução: </strong>
              <span>{parseDate(order.resolution_date)}</span>
            </li>
            <li>
              <strong>Solução: </strong>
              <span>{order.resolution}</span>
            </li>
          </>
        )}
      </ul>
    </Container>
  );
};

export default Detail;
