import React from 'react';
import { Container, Content } from './styles';

interface IProps {
  size: 'big' | 'mediun' | 'small';
}

const Modal: React.FC<IProps> = ({ children, size }) => {
  return (
    <Container>
      <Content size={size}>{children}</Content>
    </Container>
  );
};

export default Modal;
