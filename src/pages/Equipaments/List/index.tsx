import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import api from '../../../services/api';
import Pagination from '../../../components/Pagination';
import IEquipament from '../../../interfaces/IEquipament';
import { Container, HeaderContent, Table, Row } from './styles';

const List: React.FC = () => {
  const [equipaments, setEquipaments] = useState<IEquipament[]>([]);
  useEffect(() => {
    api
      .get<IEquipament[]>('equipaments')
      .then((response) => setEquipaments(response.data));
  }, []);
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
            <th>#</th>
            <th>Descrição</th>
            <th>BMP</th>
          </tr>
        </thead>
        <tbody>
          {equipaments.map((equipament) => (
            <Row key={equipament.id}>
              <td>{equipament.id}</td>
              <td>{equipament.description}</td>
              <td>{equipament.bpm}</td>
            </Row>
          ))}
        </tbody>
      </Table>
      <Pagination
        currentPage={1}
        total={100}
        setCurrentPage={() => console.log('alskdf')}
        limit={10}
      />
    </Container>
  );
};

export default List;
