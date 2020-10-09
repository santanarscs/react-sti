import React, { useCallback } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';
import { Container } from './styles';
import { useModal } from '../../../../hooks/modal';
import api from '../../../../services/api';

interface IUser {
  id: string;
  nome: string;
  nome_guerra: string;
  post_grad_id: string;
  secao: string;
  ramal: string;
  email: string;
  image_url: string;
}
interface IUserDeleteProps {
  user: IUser;
  handleRemoveUserList: (id: string) => void;
}

const Delete: React.FC<IUserDeleteProps> = ({ user, handleRemoveUserList }) => {
  const { closeModal } = useModal();

  const handleDecline = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const handleConfirm = useCallback(
    async (id: string) => {
      await api.delete(`/users/${id}`);
      // addToast({
      //   type: 'success',
      //   title: 'Cliente removido',
      //   description: 'O cliente foi removido com sucesso',
      // });
      closeModal();
      handleRemoveUserList(id);
    },
    [closeModal, handleRemoveUserList],
  );
  return (
    <Container>
      <p>Deseja remover este militar?</p>
      <div>
        <button type="button" onClick={handleDecline}>
          <FiX size={20} />
          Não, me tire daqui
        </button>
        <button type="button" onClick={() => handleConfirm(user.id)}>
          <FiCheck size={20} />
          Sim, tenho certeza!
        </button>
      </div>
    </Container>
  );
};

export default Delete;
