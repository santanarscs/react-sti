import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../../services/api';
import { Container, HeaderContent } from './styles';
import ISection from '../../../interfaces/ISection';
import { CONTAINER_ANIMATION } from '../../../animations';

const Detail: React.FC = () => {
  const { id } = useParams();
  const [section, setSection] = useState<ISection>({} as ISection);

  useEffect(() => {
    api.get(`/sections/${id}`).then((response) => setSection(response.data));
  }, [id]);

  if (!section) {
    return (
      <Container>
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
          <Link to="/sections">Voltar</Link>
        </div>
      </HeaderContent>
      <ul>
        <li>
          <strong>Nome: </strong>
          <span>{section.name}</span>
        </li>
        <li>
          <strong>Descrição: </strong>
          <span>{section.description}</span>
        </li>
      </ul>
    </Container>
  );
};

export default Detail;
