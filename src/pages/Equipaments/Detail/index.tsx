import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../services/api';

import { Container } from './styles';

const Detail: React.FC = () => {
  const { id } = useParams();
  const [equipament, setEquipament] = useState({} as any);
  useEffect(() => {
    api
      .get(`/equipaments/${id}`)
      .then((response) => setEquipament(response.data));
  }, [id]);
  return (
    <Container>
      <h1>Detalhes</h1>
      <ul>
        <li>
          <strong>BPM: </strong>
          <span>{equipament.bpm}</span>
        </li>
        <li>
          <strong>Descrição: </strong>
          <span>{equipament.descricao}</span>
        </li>
        <li>
          <strong>Local: </strong>
          <span>{equipament.local}</span>
        </li>
        <li>
          <strong>Usuário: </strong>
          <span>{equipament.usuario}</span>
        </li>
      </ul>
    </Container>
  );
};

export default Detail;
