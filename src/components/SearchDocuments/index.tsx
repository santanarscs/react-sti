import React, { useState, useEffect } from 'react';

import api from '../../services/api';
import Select from '../Select';
import Input from '../Input';

import { useDocument } from '../../hooks/document';

import { Container, Row } from './styles';

interface IManager {
  _id: string;
  name: string;
}
interface ISearchData {
  number: string;
  author: string;
  numberSEI: string;
  manager: string;
}

const SearchDocuments: React.FC = () => {
  const [managers, setManagers] = useState<{ value: string; label: string }[]>(
    [],
  );
  const [searchData, setSearchData] = useState<ISearchData>({
    number: '',
    author: '',
    numberSEI: '',
    manager: '',
  });
  const { getDocumets } = useDocument();
  useEffect(() => {
    api.get('managers').then((response) => {
      const selectManagers = response.data.map((manager: IManager) => ({
        value: manager._id,
        label: manager.name,
      }));
      setManagers(selectManagers);
    });
  }, []);
  async function handleSearch(): Promise<void> {
    getDocumets(searchData);
  }
  async function handleClearSearch(): Promise<void> {
    setSearchData({
      number: '',
      author: '',
      numberSEI: '',
      manager: '',
    });
    getDocumets();
  }
  return (
    <Container>
      <Row>
        <Input
          value={searchData.numberSEI}
          onChange={(e): void =>
            setSearchData({ ...searchData, numberSEI: e.target.value })
          }
          type="text"
          name="numberSEI"
          label="Número do Processo SEI"
          placeholder="Digite o número do processo SEI"
        />
        <Input
          value={searchData.author}
          onChange={(e): void =>
            setSearchData({ ...searchData, author: e.target.value })
          }
          type="text"
          name="author"
          label="Autor do Processo"
          placeholder="Digite o autor do processo"
        />
      </Row>
      <Row>
        <Select
          value={searchData.manager}
          onChange={(e): void =>
            setSearchData({ ...searchData, manager: e.target.value })
          }
          name="manager"
          label="Preposto"
          placeholder="Selecione o preposto"
          options={managers}
        />
        <Input
          value={searchData.number}
          onChange={(e): void =>
            setSearchData({ ...searchData, number: e.target.value })
          }
          type="text"
          name="number"
          label="Processo Judicial"
          placeholder="Digite o número do processo judicial"
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

export default SearchDocuments;
