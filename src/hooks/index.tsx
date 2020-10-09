import React from 'react';

import { AuthProvider } from './auth';
import { ModalProvider } from './modal';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <ModalProvider>{children}</ModalProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
