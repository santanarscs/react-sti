import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/global';
import Routes from './routes';
import AppProvider from './hooks';
import { Container } from './styles/components';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Container>
          <Routes />
        </Container>
        <GlobalStyles />
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
