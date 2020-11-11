import React, { createContext, useState, useCallback, useContext } from 'react';
import api from '../services/api';
import { useToast } from './toast';

interface IUser {
  id: string;
  avatar_url: string;
  name: string;
  email: string;
}

interface IAuthState {
  token: string;
  user: IUser;
}
interface ISignInCredentials {
  email: string;
  password: string;
}
interface IAuthContextData {
  user: IUser;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: IUser): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const { addToast } = useToast();
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@DIRENS-STI:token');
    const user = localStorage.getItem('@DIRENS-STI:user');

    if (token && user) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      api.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          const { response } = error;
          if (response.data?.message === 'Invalid JWT token') {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
            signOut();
            return Promise.reject(error);
          }
        },
      );
      return { token, user: JSON.parse(user) };
    }
    return {} as IAuthState;
  });

  const signOut = useCallback(() => {
    localStorage.removeItem('@DIRENS-STI:token');
    localStorage.removeItem('@DIRENS-STI:user');
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

        localStorage.setItem('@DIRENS-STI:token', token);
        localStorage.setItem('@DIRENS-STI:user', JSON.stringify(user));
        api.defaults.headers.Authorization = `Bearer ${token}`;
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        setupInvalidSessionInterceptor();
        setData({ token, user });
      } catch {
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Usuário ou senha inválidos.',
        });
      }
    },
    [setupInvalidSessionInterceptor, addToast],
  );
  const updateUser = useCallback(
    (user: IUser) => {
      localStorage.setItem('@GoBarber:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <>
      <AuthContext.Provider
        value={{ user: data.user, signIn, signOut, updateUser }}
      >
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
