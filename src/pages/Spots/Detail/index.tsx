import React, { useState, useEffect, useCallback } from 'react';

import { useParams, Link, useHistory } from 'react-router-dom';
import api from '../../../services/api';
import Delete from './Delete';
import { useModal } from '../../../hooks/modal';
import { Container, HeaderContent } from './styles';
import { CONTAINER_ANIMATION } from '../../../animations';

interface ISpot {
  id: string;
  name: string;
  description: string;
  places: number;
}

const Detail: React.FC = () => {
  const { id } = useParams();
  const [spot, setSpot] = useState<ISpot>();
  const { openModal } = useModal();
  const history = useHistory();
  useEffect(() => {
    api.get(`/spots/${id}`).then((response) => setSpot(response.data));
  }, [id]);
  const handleRedirect = useCallback(() => {
    history.push('/spots');
  }, [history]);

  const handleRemoveItem = useCallback(() => {
    openModal({
      title: 'Remover Local',
      container: () => Delete({ id, handleRedirect }),
    });
  }, [id, openModal, handleRedirect]);

  if (!spot) {
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
        <h1>{spot.name}</h1>
        <div>
          <Link to="/spots">Voltar</Link>
          <Link to={`/spots/edit/${spot.id}`}>Editar</Link>
          <button type="button" onClick={handleRemoveItem}>
            Remover
          </button>
        </div>
      </HeaderContent>
      <div>
        <ul>
          <li>
            <strong>Nome:</strong>
            <span>{spot.name}</span>
          </li>
          <li>
            <strong>Descrição:</strong>
            <span>{spot.description}</span>
          </li>
          <li>
            <strong>Capacidade:</strong>
            <span>{spot.places}</span>
          </li>
        </ul>
      </div>
    </Container>
  );
};

export default Detail;
