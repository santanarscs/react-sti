import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import Pagination from '../../../components/Pagination';

import { Container, Table, Row } from './styles';
import Header from '../../../components/Header';

import { CONTAINER_ANIMATION } from '../../../animations';

interface ISpot {
  id: string;
  name: string;
  description: string;
  places: string;
}
interface ISearchFormData {
  term: string;
}

const List: React.FC = (): JSX.Element => {
  const [spots, setSpots] = useState<ISpot[]>([]);

  const [total, setTotal] = useState<number>(0);
  const [limit] = useState(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [queryName, setQueryName] = useState<string | undefined>();

  const history = useHistory();

  useEffect(() => {
    async function loadSpots() {
      const params = { page: currentPage, limit, queryName };
      const response = await api.get<ISpot[]>('/spots', { params });

      setSpots(response.data);
      setTotal(Number(response.headers['x-total-count']));
    }
    loadSpots();
  }, [currentPage, limit, queryName]);

  const handleSearchSubmit = useCallback(
    ({ term }: ISearchFormData) => {
      setCurrentPage(1);
      setQueryName(term || undefined);
    },
    [setQueryName, setCurrentPage],
  );

  return (
    <Container
      variants={CONTAINER_ANIMATION}
      initial="unMounted"
      animate="mounted"
      exit="unMounted"
      transition={{ duration: 0.5 }}
    >
      <Header
        initialName={queryName}
        onSubmit={handleSearchSubmit}
        createPage="/spots/new"
        title="Locais"
        placeholder="Digite um termo de pesquisa"
      />
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Capacidade</th>
          </tr>
        </thead>
        <tbody>
          {spots.map((spot) => (
            <Row
              key={spot.id}
              onClick={() => history.push(`/spots/detail/${spot.id}`)}
            >
              <td />
              <td>{spot.name}</td>
              <td>{spot.description}</td>
              <td>{spot.places}</td>
            </Row>
          ))}
        </tbody>
      </Table>
      <Pagination
        currentPage={currentPage}
        total={total}
        setCurrentPage={setCurrentPage}
        limit={limit}
      />
    </Container>
  );
};

export default List;
