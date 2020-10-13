import React, { useState, useEffect } from 'react';

import { Container, Table, Row } from './styles';
import api from '../../../services/api';
import Pagination from '../../../components/Pagination';
import IEquipament from '../../../interfaces/IEquipament';

const List: React.FC = () => {
  const [equipaments, setEquipaments] = useState<IEquipament[]>([]);
  useEffect(() => {
    api
      .get<IEquipament[]>('equipaments')
      .then((response) => setEquipaments(response.data));
  }, []);
  return (
    <Container>
      <h1>Equipamentos</h1>
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
