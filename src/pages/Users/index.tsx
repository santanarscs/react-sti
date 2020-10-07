import React, { useEffect, useState, useCallback, FormEvent } from 'react';
import { FiPlus, FiLoader, FiX } from 'react-icons/fi';
import {
  Container,
  HeadContent,
  LoadingContainer,
  Content,
  HeaderModalContent,
} from './styles';
import api from '../../services/api';
import Modal from '../../components/Modal';
import Input from '../../components/Input';

interface IUser {
  _id: string;
  name: string;
  email: string;
}
interface IAddFormData {
  name: string;
  email: string;
  password: string;
}

const UserList = React.lazy<any>(() => import('../../components/UserList'));

const Users: React.FC = (): JSX.Element => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [stateModal, setStateModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<IAddFormData>({
    name: '',
    email: '',
    password: '',
  });
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>();

  useEffect(() => {
    api.get('/users').then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleOpenModal = useCallback(async () => {
    setStateModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setStateModal(false);
    setFormData({
      name: '',
      email: '',
      password: '',
    });
    setSelectedUserId(undefined);
  }, []);

  const handleOpenModalWithId = useCallback(async (userId) => {
    if (userId) {
      const response = await api.get(`/users/${userId}`);
      const { name, email } = response.data;
      setFormData((state) => ({ ...state, name, email }));
      setSelectedUserId(userId);
      setStateModal(true);
    }
  }, []);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    if (selectedUserId) {
      const response = await api.put(`/users/${selectedUserId}`, formData);
      setUsers((state) => state.filter((user) => user._id !== selectedUserId));
      setUsers((state) => [...state, response.data]);
    } else {
      const response = await api.post('/users', formData);
      setUsers((state) => [...state, response.data]);
    }
    handleCloseModal();
  }

  const handleremoveItem = useCallback(async (userId) => {
    await api.delete(`/users/${userId}`);
    setUsers((state) => state.filter((user) => user._id !== userId));
  }, []);
  return (
    <Container>
      <HeadContent>
        <h1>Lista de Usuários</h1>
        <div>
          <button type="button" onClick={handleOpenModal}>
            <FiPlus size={20} color="#FFF" />
            Novo usuário
          </button>
        </div>
      </HeadContent>
      <Content>
        <React.Suspense
          fallback={
            <LoadingContainer>
              <FiLoader />
            </LoadingContainer>
          }
        >
          <UserList
            users={users}
            handleOpenModalWithId={handleOpenModalWithId}
            handleremoveItem={handleremoveItem}
          />
        </React.Suspense>
      </Content>
      {stateModal && (
        <Modal size="big">
          <HeaderModalContent>
            <h1>Novo Usuário</h1>
            <button type="button" onClick={handleCloseModal}>
              <FiX size={25} color="#fff" />
            </button>
          </HeaderModalContent>
          <form onSubmit={handleSubmit}>
            <Input
              value={formData.name}
              onChange={(e): void =>
                setFormData({ ...formData, name: e.target.value })
              }
              type="text"
              name="name"
              label="Nome"
              placeholder="Nome do usuário"
            />
            <Input
              value={formData.email}
              onChange={(e): void =>
                setFormData({ ...formData, email: e.target.value })
              }
              type="email"
              name="email"
              label="E-mail"
              placeholder="E-mail do usuário"
            />
            <Input
              value={formData.password}
              onChange={(e): void =>
                setFormData({ ...formData, password: e.target.value })
              }
              type="password"
              name="password"
              label="Senha"
              placeholder="Senha do usuário"
            />
            <button type="submit">Cadastrar</button>
          </form>
        </Modal>
      )}
    </Container>
  );
};

export default Users;
