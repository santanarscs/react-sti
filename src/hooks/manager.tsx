import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface IManagerData {
  _id?: string;
  name: string;
  registration: string;
  email: string;
  phone: string;
  cpf: string;
}
interface IManagerSearch {
  name: string;
}

interface IManagerContextData {
  managers: IManagerData[];
  stateModal: boolean;
  openModal(): void;
  closeModal(): void;
  getManagers(search?: IManagerSearch): Promise<void>;
  addManager(data: IManagerData): Promise<void>;
  updateManager(data: IManagerData): Promise<void>;
  removeManager(id: string): Promise<void>;
}

const ManagerContext = createContext<IManagerContextData>(
  {} as IManagerContextData,
);

const ManagerProvider: React.FC = ({ children }) => {
  const [managers, setManagers] = useState<IManagerData[]>([]);
  const [stateModal, setStateModal] = useState<boolean>(false);
  const getManagers = useCallback(async (search?: IManagerData) => {
    const response = await api.get<IManagerData[]>('managers', {
      params: search,
    });

    setManagers(response.data);
  }, []);
  const addManager = useCallback(
    async ({ name, registration, email, phone, cpf }) => {
      await api.post<IManagerData>('managers', {
        name,
        registration,
        email,
        phone,
        cpf,
      });
      await getManagers();
    },
    [getManagers],
  );
  const updateManager = useCallback(
    async ({ _id, name, registration, email, phone, cpf }) => {
      await api.put(`managers/${_id}`, {
        name,
        registration,
        email,
        phone,
        cpf,
      });
      await getManagers();
    },
    [getManagers],
  );
  const removeManager = useCallback(
    async (id: string) => {
      await api.delete(`managers/${id}`);
      await getManagers();
    },
    [getManagers],
  );
  const openModal = useCallback(() => {
    setStateModal(true);
  }, []);
  const closeModal = useCallback(() => {
    setStateModal(false);
  }, []);

  return (
    <>
      <ManagerContext.Provider
        value={{
          managers,
          stateModal,
          getManagers,
          addManager,
          updateManager,
          removeManager,
          openModal,
          closeModal,
        }}
      >
        {children}
      </ManagerContext.Provider>
    </>
  );
};
function useManager(): IManagerContextData {
  const context = useContext(ManagerContext);
  if (!context) {
    throw new Error('useManager must be used within an ManagerProvider');
  }
  return context;
}

export { ManagerProvider, useManager };
