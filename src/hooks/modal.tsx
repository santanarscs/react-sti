import React, { createContext, useCallback, useState, useContext } from 'react';
import { uuid } from 'uuidv4';
import Modal from '../components/Modal';

export interface IModalContainer {
  id: string;
  type?: string;
  title: string;
  container: React.ComponentType;
}

interface IModalContextData {
  openModal(container: Omit<IModalContainer, 'id'>): void;
  closeModal(): void;
}
const ModalContext = createContext<IModalContextData>({} as IModalContextData);

const ModalProvider: React.FC = ({ children }) => {
  const [modal, setModal] = useState<IModalContainer>({} as IModalContainer);
  const openModal = useCallback(
    ({ title, container }: Omit<IModalContainer, 'id'>) => {
      const modalProps = {
        id: uuid(),
        title,
        type: 'default',
        container,
      };
      setModal(modalProps);
    },
    [],
  );
  const closeModal = useCallback(() => {
    setModal({} as IModalContainer);
  }, []);
  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <div style={{ display: modal.id ? 'block' : 'none' }}>
        <Modal modalData={modal} />
      </div>
    </ModalContext.Provider>
  );
};
function useModal(): IModalContextData {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used whitin a ModalProvider');
  }
  return context;
}

export { ModalProvider, useModal };
