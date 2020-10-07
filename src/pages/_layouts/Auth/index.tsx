import React, { FormEvent, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../hooks/auth';

import Input from '../../../components/Input';
import { Container } from './styles';

interface ISignInFormData {
  email: string;
  password: string;
}

const Auth: React.FC = ({ children }): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<ISignInFormData>({
    email: '',
    password: '',
  });
  const history = useHistory();
  const { signIn } = useAuth();

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    setLoading(true);
    const { email, password } = formData;

    if (!email && !password) {
      alert('informe as credenciais');
      return;
    }
    await signIn({ email, password });
    setLoading(false);
    history.push('/dashboard');
  }
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <h1>Entre com suas credenciais</h1>
        <Input
          value={formData.email}
          onChange={(e): void =>
            setFormData({ ...formData, email: e.target.value })
          }
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
        />
        <Input
          type="password"
          name="password"
          placeholder="Digite sua senha"
          value={formData.password}
          onChange={(e): void =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button type="submit">{loading ? 'Aguarde' : 'Entrar'}</button>
      </form>
    </Container>
  );
};

export default Auth;
