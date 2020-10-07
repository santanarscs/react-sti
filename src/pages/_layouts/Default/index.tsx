import React from 'react';

import { Container, Content } from './styles';
import Sidebar from '../../../components/Sidebar';
import Header from '../../../components/Header';

const Default: React.FC = ({ children }): JSX.Element => {
  return (
    <Container>
      <Sidebar />
      <Content>
        <Header />
        {children}
      </Content>
    </Container>
  );
};

export default Default;
