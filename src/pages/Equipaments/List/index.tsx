import React, { useState, useEffect } from 'react';

import { Container, Table, Row } from './styles';
import api from '../../../services/api';
import Pagination from '../../../components/Pagination';

const List: React.FC = () => {
  const [equipaments, setEquipaments] = useState([]);
  useEffect(() => {
    api.get('equipaments').then((response) => setEquipaments(response.data));
  }, []);
  return (
    <Container>
      <h1>Equipamentos</h1>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>BMP</th>
            <th>Descrição</th>
            <th>Local</th>
            <th>Usuário</th>
          </tr>
        </thead>
        <tbody>
          {equipaments.map((equipament: any) => (
            <Row key={equipament.id}>
              <td>{equipament.id}</td>
              <td>{equipament.bpm}</td>
              <td>{equipament.descricao}</td>
              <td>{equipament.local}</td>
              <td>{equipament.usuario}</td>
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
