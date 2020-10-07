import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { Container, Item, RowButtons } from './styles';

interface IUser {
  _id: string;
  name: string;
  email: string;
}

interface IUserListProps {
  users: IUser[];
  handleOpenModalWithId: any;
  handleremoveItem: any;
}

const UserList: React.FC<IUserListProps> = ({
  users,
  handleOpenModalWithId,
  handleremoveItem,
}) => {
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <Item key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>

              <td>
                <RowButtons>
                  <button
                    type="button"
                    onClick={(): void => handleOpenModalWithId(user._id)}
                  >
                    <FiEdit size={10} />
                  </button>
                  <button
                    type="button"
                    onClick={(): void => handleremoveItem(user._id)}
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

export default UserList;
