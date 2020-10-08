import React, { useState, useEffect } from 'react';

import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Container, Table, Row, MenuActionItem } from './styles';
import api from '../../../services/api';
import Pagination from '../../../components/Pagination';
import Dropdown from '../../../components/Dropdown';

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
            <th>Ações</th>
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
              <td>
                <Dropdown icon={FiMenu}>
                  <MenuActionItem>
                    <Link to={`/equipaments/detail/${equipament.id}`}>
                      <span>Detalhes</span>
                    </Link>
                  </MenuActionItem>
                  <MenuActionItem>
                    <Link to={`/equipaments/edit/${equipament.id}`}>
                      <span>Editar</span>
                    </Link>
                  </MenuActionItem>
                  <MenuActionItem>
                    <button type="button" onClick={() => alert('remover')}>
                      <span>Remover</span>
                    </button>
                  </MenuActionItem>
                </Dropdown>
              </td>
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
