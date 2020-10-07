import React, { createContext, useCallback, useContext, useState } from 'react';
// eslint-disable-next-line import/no-duplicates
import { format } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import ptBR from 'date-fns/locale/pt-BR';
import api from '../services/api';

interface IDocumentData {
  _id: number;
  number: string;
  author: string;
  numberSEI: string;
  manager: {
    name: string;
  };
  address: string;
  dateAudience: Date | null;
  formattedDate?: string;
  status: 'open' | 'done';
}
interface IDocumentDataRequest {
  _id?: string;
  number: string;
  author: string;
  numberSEI: string;
  manager: string;
  address?: string;
  dateAudience?: Date | null;
  formattedDate?: string;
}

interface IDocumentContextData {
  documents: IDocumentData[];
  stateModal: boolean;
  openModal(): void;
  closeModal(): void;
  getDocumets(search?: IDocumentDataRequest): Promise<void>;
  addDocument(data: IDocumentDataRequest): Promise<void>;
  removeDocument(id: string): Promise<void>;
  updateDocument(data: IDocumentDataRequest): Promise<void>;
}

const DocumentContext = createContext<IDocumentContextData>(
  {} as IDocumentContextData,
);

const DocumentProvider: React.FC = ({ children }) => {
  const [documents, setDocuments] = useState<IDocumentData[]>([]);
  const [stateModal, setStateModal] = useState<boolean>(false);
  const getDocumets = useCallback(async (search?: IDocumentDataRequest) => {
    const response = await api.get<IDocumentData[]>('documents', {
      params: search,
    });

    const formattedDocuments = response.data.map((document) => ({
      ...document,
      formattedDate: document.dateAudience
        ? format(
            new Date(document.dateAudience),
            "'Dia' dd 'de' MMMM 'de' yyyy, 'às ' HH:mm'h'",
            { locale: ptBR },
          )
        : 'Data não informada',
    }));

    setDocuments(formattedDocuments);
  }, []);
  const addDocument = useCallback(
    async ({
      number,
      author,
      numberSEI,
      manager,
      address,
      dateAudience,
      status,
    }) => {
      await api.post<IDocumentData>('documents', {
        number,
        author,
        numberSEI,
        manager,
        address,
        dateAudience,
        status,
      });
      await getDocumets();
    },
    [getDocumets],
  );
  const updateDocument = useCallback(
    async ({
      _id,
      number,
      author,
      numberSEI,
      manager,
      address,
      dateAudience,
      status,
    }) => {
      console.log(dateAudience);
      await api.put(`documents/${_id}`, {
        number,
        author,
        numberSEI,
        manager,
        address,
        dateAudience,
        status,
      });
      await getDocumets();
    },
    [getDocumets],
  );
  const removeDocument = useCallback(
    async (id: string) => {
      await api.delete(`documents/${id}`);
      await getDocumets();
    },
    [getDocumets],
  );
  const openModal = useCallback(() => {
    setStateModal(true);
  }, []);
  const closeModal = useCallback(() => {
    setStateModal(false);
  }, []);

  return (
    <>
      <DocumentContext.Provider
        value={{
          documents,
          stateModal,
          getDocumets,
          addDocument,
          updateDocument,
          removeDocument,
          openModal,
          closeModal,
        }}
      >
        {children}
      </DocumentContext.Provider>
    </>
  );
};
function useDocument(): IDocumentContextData {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocument must be used within an DocumentProvider');
  }
  return context;
}

export { DocumentProvider, useDocument };
