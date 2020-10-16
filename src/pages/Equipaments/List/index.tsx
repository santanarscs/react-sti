import React, { useState, useEffect, useCallback } from 'react';

import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import Pagination from '../../../components/Pagination';
import IEquipament from '../../../interfaces/IEquipament';
import { Container, Table, Row } from './styles';
import Header from '../../../components/Header';

interface ISearchFormData {
  term: string;
}

const List: React.FC = () => {
  const [equipaments, setEquipaments] = useState<IEquipament[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [limit] = useState(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [queryName, setQueryName] = useState<string | undefined>();
  const history = useHistory();

  useEffect(() => {
    async function loadEquipaments() {
      const params = { page: currentPage, limit, queryName };
      const response = await api.get('/equipaments', { params });
      setEquipaments(response.data);
      setTotal(Number(response.headers['x-total-count']));
    }
    loadEquipaments();
  }, [currentPage, limit, queryName]);

  const handleSearchSubmit = useCallback(
    ({ term }: ISearchFormData) => {
      console.log(term);
      setCurrentPage(1);
      setQueryName(term || undefined);
    },
    [setQueryName, setCurrentPage],
  );

  return (
    <Container>
      <Header
        initialName={queryName}
        onSubmit={handleSearchSubmit}
        createPage="/equipaments/new"
        title="Equipamentos"
        placeholder="Digite um termo de pesquisa"
      />
      <Table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>BMP</th>
            <th>Service Tag</th>
          </tr>
        </thead>
        <tbody>
          {equipaments.map((equipament) => (
            <Row
              key={equipament.id}
              onClick={() =>
                history.push(`/equipaments/detail/${equipament.id}`)
              }
            >
              <td>{equipament.description}</td>
              <td>{equipament.bpm}</td>
              <td>{equipament.service_tag}</td>
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
