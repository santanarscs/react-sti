import React, { useRef, useEffect, useState } from 'react';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useHistory, useParams } from 'react-router-dom';
import Input from '../../../components/Input';
import { Container } from './styles';
import api from '../../../services/api';
import getValidationErrors from '../../../utils/getValidationErrors';
import { useToast } from '../../../hooks/toast';
import { CONTAINER_ANIMATION } from '../../../animations';

interface IFormData {
  id: string;
  name: string;
  description: string;
  places: number;
}

const Edit: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [initialData, setInitialData] = useState<IFormData>();
  const history = useHistory();
  const { id } = useParams();
  const { addToast } = useToast();

  useEffect(() => {
    api.get(`/spots/${id}`).then((response) => {
      setInitialData(response.data);
    });
  }, [id]);

  const handleSubmit: SubmitHandler<IFormData> = async (data) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        description: Yup.string().required('A descrição é obrigatória'),
        places: Yup.string().required(
          'Informe a capacidade de lugares do local',
        ),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      await api.put(`/spots/${id}`, data);
      addToast({
        type: 'success',
        title: 'Local alterado!',
        description: 'O local foi alterado com sucesso!',
      });
      history.push('/spots');
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
          'Ocorreu um erro ao tentar alterar o local, tente novamente mais tarde.',
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
      <h1>Editar local</h1>
      {initialData && (
        <Form ref={formRef} onSubmit={handleSubmit} initialData={initialData}>
          <Input label="Nome" placeholder="Nome" name="name" />
          <Input label="Descrição" placeholder="Descrição" name="description" />
          <Input
            label="Lugares"
            placeholder="Lugares"
            name="places"
            type="number"
          />
          <button type="submit">Cadastrar</button>
        </Form>
      )}
    </Container>
  );
};

export default Edit;
