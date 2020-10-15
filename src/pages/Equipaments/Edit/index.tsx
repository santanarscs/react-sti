import React, { useRef, useEffect, useState, useCallback } from 'react';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, useParams } from 'react-router-dom';
import Input from '../../../components/Input';
import { Container } from './styles';
import api from '../../../services/api';
import getValidationErrors from '../../../utils/getValidationErrors';
import { useToast } from '../../../hooks/toast';

interface IFormData {
  description: string;
  bpm: string;
  service_tag: string;
}

const Add: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [initialData, setInitialData] = useState<IFormData>();
  const history = useHistory();
  const { addToast } = useToast();
  const { id } = useParams();

  useEffect(() => {
    api
      .get(`/equipaments/${id}`)
      .then((response) => setInitialData(response.data));
  }, [id]);

  const handleSubmit: SubmitHandler<IFormData> = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          description: Yup.string().required('Descrição é obrigatório'),
          bpm: Yup.string().required('BPM é obrigatório'),
          service_tag: Yup.string().required('Service Tag é obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        await api.put(`equipaments/${id}`, data);

        addToast({
          type: 'success',
          title: 'Equipamento atualizado!',
          description: 'O equipamento foi atualizado com sucesso!',
        });
        history.push('/equipaments');
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
            'Ocorreu um erro ao tentar atualizar um equipamento, tente novamente mais tarde.',
        });
      }
    },
    [addToast, history, id],
  );

  return (
    <Container>
      <h1>Editar equipamento</h1>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={initialData}>
        <Input label="Descrição" placeholder="Descrição" name="description" />
        <Input label="BPM" placeholder="BPM" name="bpm" />
        <Input
          label="Service Tag"
          placeholder="Service Tag"
          name="service_tag"
        />
        <button type="submit">Atualizar</button>
      </Form>
    </Container>
  );
};

export default Add;
