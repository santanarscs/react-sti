import React, { useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import api from '../../../services/api';
import Pagination from '../../../components/Pagination';
import IEquipament from '../../../interfaces/IEquipament';
import { Container, HeaderContent, Table, Row } from './styles';

const List: React.FC = () => {
  const [equipaments, setEquipaments] = useState<IEquipament[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const history = useHistory();

  useEffect(() => {
    async function loadEquipaments() {
      const params = { page: currentPage, limit };
      const response = await api.get('/equipaments', { params });
      setEquipaments(response.data);
      setTotal(Number(response.headers['x-total-count']));
    }
    loadEquipaments();
  }, [currentPage, limit]);

  return (
    <Container>
      <HeaderContent>
        <Link to="/equipaments/new">
          <FiPlus size={20} />
          Cadastrar
        </Link>
        <h1>Lista de equipamentos</h1>
      </HeaderContent>
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
