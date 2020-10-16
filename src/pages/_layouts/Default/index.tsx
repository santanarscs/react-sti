import React from 'react';

import { Container, Content } from './styles';
import Sidebar from '../../../components/Sidebar';

const Default: React.FC = ({ children }): JSX.Element => {
  return (
    <Container>
      <Sidebar />
      <Content>{children}</Content>
    </Container>
  );
};

export default Default;
