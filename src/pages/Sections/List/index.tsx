import React, { useState, useEffect, useCallback } from 'react';

import { useHistory } from 'react-router-dom';
import { Container, Row, Table } from './styles';
import Pagination from '../../../components/Pagination';
import Header from '../../../components/Header';
import ISection from '../../../interfaces/ISection';
import api from '../../../services/api';
import { CONTAINER_ANIMATION } from '../../../animations';

interface ISearchFormData {
  term: string;
}

const List: React.FC = () => {
  const [sections, setSections] = useState<ISection[]>([]);

  const [total] = useState<number>(0);
  const [limit] = useState(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [queryName, setQueryName] = useState<string | undefined>();

  const history = useHistory();

  useEffect(() => {
    async function loadSections() {
      const params = { page: currentPage, limit, queryName };
      const response = await api.get<ISection[]>('/sections', { params });
      setSections(response.data);
      // setTotal(Number(response.headers['x-total-count']));
    }
    loadSections();
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
        createPage="/sections/new"
        title="Seções"
        placeholder="Digite um termo de pesquisa"
      />
      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {sections.map((section) => (
            <Row
              key={section.id}
              onClick={() => history.push(`/sections/detail/${section.id}`)}
            >
              <td>{section.name}</td>
              <td>{section.description}</td>
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
