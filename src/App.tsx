import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/global';
import Routes from './routes';
import AppProvider from './hooks';
import { Container } from './styles/components';
import { dark } from './styles/themes';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={dark}>
      <BrowserRouter>
        <AppProvider>
          <Container>
            <Routes />
          </Container>
          <GlobalStyles />
        </AppProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
