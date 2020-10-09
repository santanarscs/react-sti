import React, { FormEvent, useState, useRef, useCallback } from 'react';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useHistory } from 'react-router-dom';
import { FiLock, FiMail } from 'react-icons/fi';
import { useAuth } from '../../../hooks/auth';

import Input from '../../../components/Input';
import { Container } from './styles';
import getValidationErrors from '../../../utils/getValidationErrors';
import { useToast } from '../../../hooks/toast';

interface ISignInFormData {
  email: string;
  password: string;
}

const Auth: React.FC = (): JSX.Element => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<ISignInFormData>({
    email: '',
    password: '',
  });
  const history = useHistory();
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const handleSubmit = useCallback(
    async (data: ISignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um email válido'),
          password: Yup.string().required('Senha é obrigatória'),
        });
        await schema.validate(data, { abortEarly: false });
        await signIn({
          email: data.email,
          password: data.password,
        });
        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um error ao fazer login, cheque as credenciais.',
        });
      }
    },
    [signIn, addToast, history],
  );
  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Entre com suas credenciais</h1>
        <Input
          icon={FiMail}
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
        />
        <Input
          icon={FiLock}
          type="password"
          name="password"
          placeholder="Digite sua senha"
        />
        <button type="submit">{loading ? 'Aguarde' : 'Entrar'}</button>
      </Form>
    </Container>
  );
};

export default Auth;
