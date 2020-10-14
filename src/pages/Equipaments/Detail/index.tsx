import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import api from '../../../services/api';
import Delete from './Delete';
import { Container, HeaderContent, HistoryContainer } from './styles';
import IEquipament from '../../../interfaces/IEquipament';
import { useModal } from '../../../hooks/modal';

const Detail: React.FC = () => {
  const { id } = useParams();
  const [equipament, setEquipament] = useState<IEquipament>();
  const { openModal } = useModal();
  const history = useHistory();
  useEffect(() => {
    api
      .get(`/equipaments/${id}`)
      .then((response) => setEquipament(response.data));
  }, [id]);

  const handleRedirect = useCallback(() => {
    history.push('/equipaments');
  }, [history]);

  const handleRemoveItem = useCallback(() => {
    openModal({
      title: 'Remover equipamentos',
      container: () => Delete({ id, handleRedirect }),
    });
  }, [id, openModal, handleRedirect]);

  if (!equipament) {
    return (
      <Container>
        <h1>Carregando</h1>
      </Container>
    );
  }

  return (
    <Container>
      <HeaderContent>
        <h1>Detalhes</h1>
        <div>
          <Link to="/equipaments">Voltar</Link>
          <Link to={`/equipaments/edit/${equipament.id}`}>Editar</Link>
          <button type="button" onClick={handleRemoveItem}>
            Remover
          </button>
        </div>
      </HeaderContent>
      <ul>
        <li>
          <strong>Descrição: </strong>
          <span>{equipament.description}</span>
        </li>
        <li>
          <strong>BPM: </strong>
          <span>{equipament.bpm}</span>
        </li>
        <li>
          <strong>Service Tag: </strong>
          <span>{equipament.service_tag}</span>
        </li>
      </ul>
      {equipament.movimentations && (
        <HistoryContainer>
          <div>
            <h2>Histórico de movimentação</h2>
            <button type="button">Movimentar</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Seção</th>
                <th>Usuário</th>
              </tr>
            </thead>
            <tbody>
              {equipament.movimentations.map((movimentation) => (
                <tr key={movimentation.id}>
                  <td>{movimentation.date}</td>
                  <td>{movimentation.section.name}</td>
                  {movimentation.user ? (
                    <td>{`${movimentation.user.graduation.name} ${movimentation.user.name}`}</td>
                  ) : (
                    <td>Usuário não informado</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </HistoryContainer>
      )}
    </Container>
  );
};

export default Detail;
