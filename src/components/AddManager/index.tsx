import React, { FormEvent, useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../../services/api';
import { Container, HeaderContent } from './styles';

import Input from '../Input';

import { useManager } from '../../hooks/manager';

interface IAddManagerFormData {
  _id?: string;
  name: string;
  registration: string;
  email: string;
  phone: string;
  cpf: string;
}

interface IAddManagerFormProps {
  selectedId?: string | null;
}

const AddDocument: React.FC<IAddManagerFormProps> = ({ selectedId }) => {
  const [formData, setFormData] = useState<IAddManagerFormData>({
    name: '',
    registration: '',
    email: '',
    phone: '',
    cpf: '',
  });

  const { closeModal, addManager, updateManager } = useManager();
  useEffect(() => {
    if (selectedId) {
      api.get(`managers/${selectedId}`).then((response) => {
        setFormData(response.data);
      });
    }
  }, [selectedId]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    if (selectedId) {
      updateManager(formData);
    } else {
      addManager(formData);
    }

    closeModal();
  }
  return (
    <Container>
      <HeaderContent>
        <h1>Adicionar novo Coordenador</h1>
        <button type="button" onClick={closeModal}>
          <FiX size={25} color="#fff" />
        </button>
      </HeaderContent>

      <form onSubmit={handleSubmit}>
        <Input
          value={formData.name}
          onChange={(e): void =>
            setFormData({ ...formData, name: e.target.value })
          }
          type="text"
          name="Nome"
          label="Nome"
          placeholder="Digite o nome"
        />
        <Input
          value={formData.registration}
          onChange={(e): void =>
            setFormData({ ...formData, registration: e.target.value })
          }
          type="text"
          name="registration"
          label="Matrícula"
          placeholder="Digite a Matrícula"
        />
        <Input
          value={formData.email}
          onChange={(e): void =>
            setFormData({ ...formData, email: e.target.value })
          }
          type="text"
          name="email"
          label="E-mail"
          placeholder="Digite um e-mail"
        />
        <Input
          value={formData.phone}
          onChange={(e): void =>
            setFormData({ ...formData, phone: e.target.value })
          }
          type="text"
          name="phone"
          label="Telefone"
          placeholder="Digite um telefone"
        />
        <Input
          value={formData.cpf}
          onChange={(e): void =>
            setFormData({ ...formData, cpf: e.target.value })
          }
          type="text"
          name="cpf"
          label="CPF"
          placeholder="Digite o CPF"
        />
        <button type="submit">Cadastrar</button>
      </form>
    </Container>
  );
};

export default AddDocument;
