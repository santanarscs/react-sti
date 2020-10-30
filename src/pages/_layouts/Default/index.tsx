import React from 'react';

import { Container, Content } from './styles';
import Sidebar from '../../../components/Sidebar';
import TopBar from '../../../components/TopBar';

const Default: React.FC = ({ children }): JSX.Element => {
  return (
    <Container>
      <Sidebar />
      <Content>
        <TopBar />
        {children}
      </Content>
    </Container>
  );
};

export default Default;
