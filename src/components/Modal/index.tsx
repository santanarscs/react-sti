import React from 'react';
import { FiXCircle } from 'react-icons/fi';
import { IModalContainer, useModal } from '../../hooks/modal';
import { Container, Content, HeaderContent } from './styles';

interface IModalContainerProps {
  modalData: IModalContainer;
}
const Modal: React.FC<IModalContainerProps> = ({ modalData }) => {
  const { container: Component, title } = modalData;
  const { closeModal } = useModal();
  return (
    <Container>
      <Content>
        <HeaderContent>
          <h1>{title}</h1>
          <button type="button" onClick={closeModal}>
            <FiXCircle size={20} />
          </button>
        </HeaderContent>
        {Component && <Component />}
      </Content>
    </Container>
  );
};
export default Modal;
