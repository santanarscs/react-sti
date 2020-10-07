import React, { createContext, useState, useCallback, useContext } from 'react';
import api from '../services/api';

interface IAuthState {
  token: string;
  user: {
    name: string;
    email: string;
  };
}
interface ISignInCredentials {
  email: string;
  password: string;
}
interface IAuthContextData {
  user: {
    name: string;
    email: string;
  };
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@GCac:token');
    const user = localStorage.getItem('@GCac:user');

    if (token && user) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      api.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          const { response } = error;
          if (response.data.error === 'Token invalid') {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            signOut();
          }
          return Promise.reject(error);
        },
      );
      return { token, user: JSON.parse(user) };
    }
    return {} as IAuthState;
  });

  const signOut = useCallback(() => {
    localStorage.removeItem('@GCac:token');
    localStorage.removeItem('@GCac:user');
    setData({} as IAuthState);
  }, []);

  const setupInvalidSessionInterceptor = useCallback(() => {
    api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const { response } = error;
        if (response.data.message === 'Token invalid') {
          signOut();
        }
        return Promise.reject(error);
      },
    );
  }, [signOut]);

  const signIn = useCallback(
    async ({ email, password }: ISignInCredentials) => {
      try {
        const response = await api.post<IAuthState>('sessions', {
          email,
          password,
        });
        const { token, user } = response.data;

        localStorage.setItem('@GCac:token', token);
        localStorage.setItem('@GCac:user', JSON.stringify(user));
        api.defaults.headers.Authorization = `Bearer ${token}`;
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        setupInvalidSessionInterceptor();
        setData({ token, user });
      } catch {
        alert('Problema na autenticação, contate o administrador');
      }
    },
    [setupInvalidSessionInterceptor],
  );

  return (
    <>
      <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
export { AuthProvider, useAuth };
