import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { Container, RowButtons } from './styles';

interface IManager {
  _id?: string;
  name: string;
  registration: string;
  email: string;
  phone: string;
  cpf: string;
}

interface IManagerListProps {
  managers: IManager[];
  handleOpenModalWithId: any;
  handleRemoveItem: any;
}

const ManagersList: React.FC<IManagerListProps> = ({
  managers,
  handleOpenModalWithId,
  handleRemoveItem,
}) => {
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Registro</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>CPF</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {managers.map((manager) => (
            <tr key={manager._id}>
              <td>{manager.name}</td>
              <td>{manager.registration}</td>
              <td>{manager.email}</td>
              <td>{manager.phone}</td>
              <td>{manager.cpf}</td>
              <td>
                <RowButtons>
                  <button
                    type="button"
                    onClick={(): void =>
                      handleOpenModalWithId(manager._id?.toString())
                    }
                  >
                    <FiEdit size={10} />
                  </button>
                  <button
                    type="button"
                    onClick={(): void =>
                      handleRemoveItem(manager._id?.toString())
                    }
                  >
                    <FiTrash size={10} />
                  </button>
                </RowButtons>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default ManagersList;
