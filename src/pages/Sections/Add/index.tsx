import React, { useRef, useCallback } from 'react';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import Input from '../../../components/Input';
import api from '../../../services/api';
import getValidationErrors from '../../../utils/getValidationErrors';
import { useToast } from '../../../hooks/toast';
import { Container } from './styles';

interface IFormData {
  name: string;
  description: string;
}

const Add: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit: SubmitHandler<IFormData> = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          description: Yup.string().required('Descrição é obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('sections', data);
        addToast({
          type: 'success',
          title: 'Seção cadastrada!',
          description: 'Uma nova seção foi cadastrada com sucesso!',
        });
        history.push('/sections');
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
            'Ocorreu um erro ao tentar criar uma nova seção, tente novamente mais tarde.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <h1>Novo equipamento</h1>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input label="Nome" placeholder="Nome" name="name" />
        <Input label="Descrição" placeholder="Descrição" name="description" />
        <button type="submit">Cadastrar</button>
      </Form>
    </Container>
  );
};

export default Add;
