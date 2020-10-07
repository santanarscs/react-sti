import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { Container, Item, RowButtons } from './styles';

interface IDocument {
  _id: number;
  number: string;
  author: string;
  numberSEI: string;
  manager?: {
    name: string;
  };
  address: string;
  dateAudience?: Date | null;
  formattedDate?: string;
  status?: 'open' | 'done' | undefined;
}

interface IDocumentListProps {
  documents: IDocument[];
  handleOpenModalWithId: any;
  handleremoveItem: any;
}

const DocumentList: React.FC<IDocumentListProps> = ({
  documents,
  handleOpenModalWithId,
  handleremoveItem,
}) => {
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Processo SEI </th>
            <th>Autor</th>
            <th>Preposto</th>
            <th>Processo Judicial</th>
            <th>Data da audiência</th>
            <th>Endereço</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document) => (
            <Item key={document._id} type={document.status}>
              <td>{document.numberSEI}</td>
              <td>{document.author}</td>
              <td>{document.manager?.name}</td>
              <td>{document.number}</td>
              <td>{document.formattedDate}</td>
              <td>{document.address}</td>
              <td>
                <RowButtons>
                  <button
                    type="button"
                    onClick={(): void =>
                      handleOpenModalWithId(document._id.toString())
                    }
                  >
                    <FiEdit size={10} />
                  </button>
                  <button
                    type="button"
                    onClick={(): void =>
                      handleremoveItem(document._id.toString())
                    }
                  >
                    <FiTrash size={10} />
                  </button>
                </RowButtons>
              </td>
            </Item>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default DocumentList;
