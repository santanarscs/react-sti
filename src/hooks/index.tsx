import React from 'react';

import { AuthProvider } from './auth';
import { DocumentProvider } from './document';
import { ManagerProvider } from './manager';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <DocumentProvider>
      <ManagerProvider>{children}</ManagerProvider>
    </DocumentProvider>
  </AuthProvider>
);

export default AppProvider;
