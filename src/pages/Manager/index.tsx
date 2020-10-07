import React, { useState, useEffect } from 'react';

import { FiPlus } from 'react-icons/fi';
import ManagersList from '../../components/ManagersList';
import SearchManagers from '../../components/SearchManagers';
import AddManager from '../../components/AddManager';

import { useManager } from '../../hooks/manager';
import Modal from '../../components/Modal';
import { Container, HeadContent, Content } from './styles';

const ListManagers: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const {
    managers,
    stateModal,
    getManagers,
    removeManager,
    openModal,
  } = useManager();

  useEffect(() => {
    async function loadManagers(): Promise<void> {
      await getManagers();
    }
    loadManagers();
  }, [getManagers]);

  const handleOpenModal = (): void => {
    setSelectedId(null);
    openModal();
  };
  const handleOpenModalWithId = (id: string): void => {
    setSelectedId(id);
    openModal();
  };
  const handleRemoveItem = (id: string): void => {
    removeManager(id);
  };
  return (
    <Container>
      <HeadContent>
        <h1>Lista de coordenador</h1>
        <div>
          <button type="button" onClick={handleOpenModal}>
            <FiPlus size={20} color="#FFF" />
            Novo Coordenador
          </button>
        </div>
      </HeadContent>
      <Content>
        <SearchManagers />
      </Content>
      <Content>
        <ManagersList
          managers={managers}
          handleOpenModalWithId={handleOpenModalWithId}
          handleRemoveItem={handleRemoveItem}
        />
      </Content>
      {stateModal && (
        <Modal size="big">
          <AddManager selectedId={selectedId} />
        </Modal>
      )}
    </Container>
  );
};

export default ListManagers;
