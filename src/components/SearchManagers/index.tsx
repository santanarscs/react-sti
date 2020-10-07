import React, { useState } from 'react';

import Input from '../Input';

import { useManager } from '../../hooks/manager';

import { Container, Row } from './styles';

interface ISearchData {
  name: string;
}

const SearchManagers: React.FC = () => {
  const [searchData, setSearchData] = useState<ISearchData>({
    name: '',
  });
  const { getManagers } = useManager();

  async function handleSearch(): Promise<void> {
    getManagers(searchData);
  }
  async function handleClearSearch(): Promise<void> {
    setSearchData({
      name: '',
    });
    getManagers();
  }
  return (
    <Container>
      <Row>
        <Input
          value={searchData.name}
          onChange={(e): void =>
            setSearchData({ ...searchData, name: e.target.value })
          }
          type="text"
          name="name"
          label="Nome do coordenador"
          placeholder="Digite o nome do coordenador"
        />
      </Row>
      <div>
        <button type="button" onClick={handleClearSearch}>
          Limpar
        </button>
        <button type="button" onClick={handleSearch}>
          Buscar
        </button>
      </div>
    </Container>
  );
};

export default SearchManagers;
