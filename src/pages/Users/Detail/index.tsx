import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { Container } from './styles';
import api from '../../../services/api';

const Detail: React.FC = () => {
  const { id } = useParams();
  const [user, setUser] = useState({} as any);
  useEffect(() => {
    api.get(`/users/${id}`).then((response) => setUser(response.data));
  }, [id]);
  return (
    <Container>
      <h1>{`${user.post_grad_id} ${user.nome_guerra}`}</h1>
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
