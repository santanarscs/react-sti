import React, { FormEvent, useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../../services/api';
import { Container, HeaderContent } from './styles';

import Input from '../Input';
import Select from '../Select';

import { useDocument } from '../../hooks/document';

interface IAddDocumentFormData {
  _id?: string;
  number: string;
  author: string;
  numberSEI: string;
  manager: string;
  address: string;
  dateAudience: Date | null;
  status: string;
}

interface IAddFormProps {
  selectedId?: string | null;
}

const AddDocument: React.FC<IAddFormProps> = ({ selectedId }) => {
  const [managers, setManagers] = useState<{ value: string; label: string }[]>(
    [],
  );
  const [formData, setFormData] = useState<IAddDocumentFormData>({
    numberSEI: '',
    number: '',
    author: '',
    address: '',
    dateAudience: null,
    manager: '',
    status: 'open',
  });

  const { closeModal, addDocument, updateDocument } = useDocument();
  useEffect(() => {
    if (selectedId) {
      api.get(`documents/${selectedId}`).then((response) => {
        const data = {
          ...response.data,
          dateAudience: response.data.dateAudience
            ? new Date(response.data.dateAudience)
            : null,
        };
        setFormData(data);
      });
    }
    api.get('managers').then((response) => {
      const selectManagers = response.data.map(
        (manager: { _id: string; name: string }) => ({
          value: manager._id,
          label: manager.name,
        }),
      );
      setManagers(selectManagers);
    });
  }, [selectedId]);

  const handleChange = (date: Date): void => {
    setFormData({
      ...formData,
      dateAudience: date,
    });
  };

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    if (selectedId) {
      updateDocument(formData);
    } else {
      addDocument(formData);
    }

    closeModal();
  }
  return (
    <Container>
      <HeaderContent>
        <h1>Adicionar nova audiência</h1>
        <button type="button" onClick={closeModal}>
          <FiX size={25} color="#fff" />
        </button>
      </HeaderContent>

      <form onSubmit={handleSubmit}>
        <Input
          value={formData.numberSEI}
          onChange={(e): void =>
            setFormData({ ...formData, numberSEI: e.target.value })
          }
          type="text"
          name="numberSEI"
          label="Número do Processo SEI"
          placeholder="Digite o número do processo SEI"
        />
        <Input
          value={formData.author}
          onChange={(e): void =>
            setFormData({ ...formData, author: e.target.value })
          }
          type="text"
          name="author"
          label="Autor do Processo"
          placeholder="Digite o autor do processo"
        />
        <Select
          value={formData.manager}
          onChange={(e): void =>
            setFormData({ ...formData, manager: e.target.value })
          }
          name="manager"
          label="Preposto"
          placeholder="Selecione o preposto"
          options={managers}
        />

        <Input
          value={formData.number}
          onChange={(e): void =>
            setFormData({ ...formData, number: e.target.value })
          }
          type="text"
          name="number"
          label="Processo Judicial"
          placeholder="Digite o número do processo judicial"
        />
        <Input
          value={formData.address}
          onChange={(e): void =>
            setFormData({ ...formData, address: e.target.value })
          }
          type="text"
          name="address"
          label="Endereço"
          placeholder="Digite o endereço da audiência"
        />
        <div>
          <label htmlFor="dateAudience">Data da audiência</label>
          <DatePicker
            id="dateAudience"
            name="dateAudience"
            selected={formData.dateAudience}
            onChange={handleChange}
            showTimeSelect
            dateFormat="dd/MM/yyyy hh:mm aa"
          />
        </div>
        <Select
          value={formData.status}
          onChange={(e): void =>
            setFormData({ ...formData, status: e.target.value })
          }
          name="status"
          label="Preposto"
          placeholder="Selecione o preposto"
          options={[
            { value: 'open', label: 'Aberto' },
            { value: 'done', label: 'Fechada' },
          ]}
        />
        <button type="submit">Cadastrar</button>
      </form>
    </Container>
  );
};

export default AddDocument;
