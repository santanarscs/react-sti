import React, { useRef, useState, useCallback, useEffect } from 'react';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import InputTextArea from '../../../components/InputTextarea';
import api from '../../../services/api';
import getValidationErrors from '../../../utils/getValidationErrors';
import { useToast } from '../../../hooks/toast';
import Select, { IOptionValue } from '../../../components/Select';
import { Container } from './styles';
import { CONTAINER_ANIMATION } from '../../../animations';

interface IFormData {
  description: string;
  owner: string;
  type_id: string;
}
interface IUser {
  description: string;
}

interface IType {
  id: string;
  name: string;
}

const Add: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [users, setUsers] = useState<IOptionValue[]>([]);
  const [types, setTypes] = useState<IOptionValue[]>([]);
  const history = useHistory();
  const { addToast } = useToast();

  useEffect(() => {
    api.get<IUser[]>('users/ad').then((response) =>
      setUsers(
        response.data.map((item) => ({
          value: item.description,
          label: item.description,
        })),
      ),
    );
    api.get<IType[]>('types_order').then((response) =>
      setTypes(
        response.data.map((item) => ({
          value: item.id,
          label: item.name,
        })),
      ),
    );
  }, []);

  const handleSubmit: SubmitHandler<IFormData> = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          description: Yup.string().required('Descrição é obrigatório'),
          owner: Yup.string().required('Usuário é obrigatório'),
          type_id: Yup.string().required('Tipo é obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('orders', data);
        addToast({
          type: 'success',
          title: 'Pedido de serviço cadastrado!',
          description: 'Uma novo pedido de serviço foi cadastrado com sucesso!',
        });
        history.push('/orders');
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
            'Ocorreu um erro ao tentar criar um novo pedido de serviço, tente novamente mais tarde.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container
      variants={CONTAINER_ANIMATION}
      initial="unMounted"
      animate="mounted"
      exit="unMounted"
      transition={{ duration: 0.5 }}
    >
      <h1>Novo Pedido de serviço</h1>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Select
          label="Usuário"
          placeholder="Usuário"
          name="owner"
          options={users}
        />
        <Select
          label="Tipo"
          placeholder="Tipo"
          name="type_id"
          options={types}
        />
        <InputTextArea
          label="Descrição"
          placeholder="Descrição"
          name="description"
        />
        <button type="submit">Cadastrar</button>
      </Form>
    </Container>
  );
};

export default Add;
