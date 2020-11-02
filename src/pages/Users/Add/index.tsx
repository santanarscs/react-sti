import React, { useRef } from 'react';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import Input from '../../../components/Input';
import { Container } from './styles';
import api from '../../../services/api';
import getValidationErrors from '../../../utils/getValidationErrors';
import { useToast } from '../../../hooks/toast';
import { CONTAINER_ANIMATION } from '../../../animations';

interface IFormData {
  id: string;
  name: string;
  email: string;
  password: string;
}

const Add: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit: SubmitHandler<IFormData> = async (data) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome de guerra é obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('O e-mail é obrigatório'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('users', {
        ...data,
        password: '123456',
      });
      addToast({
        type: 'success',
        title: 'Usuário cadastrado!',
        description: 'Um novo usuário foi cadastrado com sucesso!',
      });
      history.push('/users');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }
      addToast({
        type: 'error',
        title: 'Erro na operação',
        description:
          'Ocorreu um erro ao tentar criar um novo usuário, tente novamente mais tarde.',
      });
    }
  };
  return (
    <Container
      variants={CONTAINER_ANIMATION}
      initial="unMounted"
      animate="mounted"
      exit="unMounted"
      transition={{ duration: 0.5 }}
    >
      <h1>Novo usuário</h1>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input label="Nome completo" placeholder="Nome completo" name="name" />
        <Input label="E-mail" placeholder="E-mail" name="email" />
        <button type="submit">Cadastrar</button>
      </Form>
    </Container>
  );
};

export default Add;
