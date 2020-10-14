import React, { useCallback } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';
import { Container } from './styles';
import { useModal } from '../../../../hooks/modal';
import api from '../../../../services/api';
import { useToast } from '../../../../hooks/toast';

interface IEquipamentDeleteProps {
  id: string;
  handleRedirect: () => void;
}

const Delete: React.FC<IEquipamentDeleteProps> = ({ id, handleRedirect }) => {
  const { closeModal } = useModal();
  const { addToast } = useToast();

  const handleDecline = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const handleConfirm = useCallback(async () => {
    await api.delete(`/equipaments/${id}`);
    addToast({
      type: 'success',
      title: 'Equipamento removido',
      description: 'O equipamento foi removido com sucesso',
    });
    closeModal();
    handleRedirect();
  }, [closeModal, id, handleRedirect, addToast]);
  return (
    <Container>
      <p>Deseja remover este equipamento?</p>
      <div>
        <button type="button" onClick={handleDecline}>
          <FiX size={20} />
          Não, me tire daqui
        </button>
        <button type="button" onClick={() => handleConfirm()}>
          <FiCheck size={20} />
          Sim, tenho certeza!
        </button>
      </div>
    </Container>
  );
};

export default Delete;
