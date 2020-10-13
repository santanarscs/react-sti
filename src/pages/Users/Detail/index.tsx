import React, { useState, useEffect, useCallback } from 'react';

import { useParams, Link, useHistory } from 'react-router-dom';
import api from '../../../services/api';
import Delete from './Delete';
import { useModal } from '../../../hooks/modal';
import { Container, HeaderContent } from './styles';
import IUser from '../../../interfaces/IUser';

const Detail: React.FC = () => {
  const { id } = useParams();
  const [user, setUser] = useState<IUser>();
  const { openModal } = useModal();
  const history = useHistory();
  useEffect(() => {
    api.get(`/users/${id}`).then((response) => setUser(response.data));
  }, [id]);
  const handleRedirect = useCallback(() => {
    history.push('/users');
  }, [history]);

  const handleRemoveItem = useCallback(() => {
    openModal({
      title: 'Remover usuário',
      container: () => Delete({ id, handleRedirect }),
    });
  }, [id, openModal, handleRedirect]);

  if (!user) {
    return (
      <Container>
        <h1>Carregando</h1>
      </Container>
    );
  }
  return (
    <Container>
      <HeaderContent>
        <h1>{`${user.graduation.name} ${user.name}`}</h1>
        <div>
          <Link to="/users">Voltar</Link>
          <Link to={`/users/edit/${user.id}`}>Editar</Link>
          <button type="button" onClick={handleRemoveItem}>
            Remover
          </button>
        </div>
      </HeaderContent>
      <div>
        <img src={user.avatar} alt="" />
        <ul>
          <li>
            <strong>Nome Completo:</strong>
            <span>{user.full_name}</span>
          </li>
          <li>
            <strong>Posto/Graduação:</strong>
            <span>{user.graduation.name}</span>
          </li>
          <li>
            <strong>Seção:</strong>
            <span>{user.section.name}</span>
          </li>
        </ul>
      </div>
    </Container>
  );
};

export default Detail;
