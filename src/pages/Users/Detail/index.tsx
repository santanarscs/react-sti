import React, { useState, useEffect, useCallback } from 'react';

import { useParams, Link, useHistory } from 'react-router-dom';
import api from '../../../services/api';
import Delete from './Delete';
import { useModal } from '../../../hooks/modal';
import { Container, HeaderContent } from './styles';

interface IUser {
  id: string;
  nome: string;
  nome_guerra: string;
  post_grad_id: string;
  secao: string;
  ramal: string;
  email: string;
  image_url: string;
}

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
        <h1>{`${user.post_grad_id} ${user.nome_guerra}`}</h1>
        <div>
          <Link to="/users">Voltar</Link>
          <Link to={`/users/edit/${user.id}`}>Editar</Link>
          <button type="button" onClick={handleRemoveItem}>
            Remover
          </button>
        </div>
      </HeaderContent>
      <div>
        <ul>
          <li>
            <strong>Nome Completo:</strong>
            <span>{user.nome}</span>
          </li>
          <li>
            <strong>Posto/Graduação:</strong>
            <span>{user.post_grad_id}</span>
          </li>
          <li>
            <strong>Seção:</strong>
            <span>{user.secao}</span>
          </li>
        </ul>
        <img src={user.image_url} alt="" />
      </div>
    </Container>
  );
};

export default Detail;
