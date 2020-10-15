import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import api from '../../../services/api';
import Delete from './Delete';
import Movimentation from './Movimentation';
import { Container, HeaderContent, HistoryContainer } from './styles';
import IEquipament from '../../../interfaces/IEquipament';
import { useModal } from '../../../hooks/modal';
import IMovimentation from '../../../interfaces/IMovimentation';

const Detail: React.FC = () => {
  const { id } = useParams();
  const [equipament, setEquipament] = useState<IEquipament>({} as IEquipament);
  const [movimentations, setMovimentations] = useState<IMovimentation[]>();
  const { openModal } = useModal();
  const history = useHistory();

  const handleLoadMovimentations = useCallback(async () => {
    const response = await api.get<IMovimentation[]>(
      `/movimentations/equipaments/${id}`,
    );
    const data = response.data.map((movimentation) => {
      const date = new Date(movimentation.date);
      const dateFormated = date.toLocaleDateString('pt-BR');
      return {
        ...movimentation,
        date: dateFormated,
      };
    });
    setMovimentations(data);
  }, [id]);
  useEffect(() => {
    api
      .get(`/equipaments/${id}`)
      .then((response) => setEquipament(response.data));
    handleLoadMovimentations();
  }, [id, handleLoadMovimentations]);

  const handleRedirect = useCallback(() => {
    history.push('/equipaments');
  }, [history]);

  const handleRemoveItem = useCallback(() => {
    openModal({
      title: 'Remover equipamentos',
      container: () => Delete({ id, handleRedirect }),
    });
  }, [id, openModal, handleRedirect]);

  const handlOpenModalMovimentation = useCallback(() => {
    openModal({
      title: 'Adicionar Movimentação',
      container: () => Movimentation({ id, handleLoadMovimentations }),
    });
  }, [openModal, id, handleLoadMovimentations]);

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
      {movimentations && (
        <HistoryContainer>
          <div>
            <h2>Histórico de movimentação</h2>
            <button type="button" onClick={handlOpenModalMovimentation}>
              Movimentar
            </button>
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
              {movimentations.map((movimentation) => (
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
