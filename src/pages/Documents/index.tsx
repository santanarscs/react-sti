import React, { useEffect, useState } from 'react';
import { FiPlus, FiDownload, FiLoader } from 'react-icons/fi';

import api from '../../services/api';
import AddDocument from '../../components/AddForm';
import SearchDocuments from '../../components/SearchDocuments';

import { useDocument } from '../../hooks/document';
import Modal from '../../components/Modal';
import {
  Container,
  HeadContent,
  SearchContent,
  Content,
  LoadingContainer,
} from './styles';

const DocumentList = React.lazy<any>(() =>
  import('../../components/DocumentList'),
);

const ListDocuments: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const {
    documents,
    stateModal,
    getDocumets,
    removeDocument,
    openModal,
  } = useDocument();
  useEffect(() => {
    async function loadDocuments(): Promise<void> {
      await getDocumets();
    }
    loadDocuments();
  }, [getDocumets]);

  const handleOpenModal = (): void => {
    setSelectedId(null);
    openModal();
  };
  const handleOpenModalWithId = (id: string): void => {
    setSelectedId(id);
    openModal();
  };
  const handleremoveItem = (id: string): void => {
    removeDocument(id);
  };
  const handleUploadFile = async (file: any): Promise<void> => {
    const data = new FormData();
    if (file[0].type !== 'text/csv') {
      alert('Importe apenas arquivos CSV');
      return;
    }
    data.append('file', file[0]);
    try {
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
      };
      await api.post('/documents/import', data, config);
    } catch (err) {
      alert(err);
    }
  };
  return (
    <Container>
      <HeadContent>
        <h1>Lista de audiências</h1>
        <div>
          <label htmlFor="file">
            <input
              id="file"
              type="file"
              onChange={(e): Promise<void> => handleUploadFile(e.target.files)}
            />
            <FiDownload size={20} color="#FFF" />
            Importar arquivo
          </label>
          <button type="button" onClick={handleOpenModal}>
            <FiPlus size={20} color="#FFF" />
            Nova audiência
          </button>
        </div>
      </HeadContent>
      <SearchContent>
        <SearchDocuments />
      </SearchContent>
      <Content>
        <React.Suspense
          fallback={(
            <LoadingContainer>
              <FiLoader />
            </LoadingContainer>
          )}
        >
          <DocumentList
            documents={documents}
            handleOpenModalWithId={handleOpenModalWithId}
            handleremoveItem={handleremoveItem}
          />
        </React.Suspense>
      </Content>
      {stateModal && (
        <Modal size="big">
          <AddDocument selectedId={selectedId} />
        </Modal>
      )}
    </Container>
  );
};

export default ListDocuments;
