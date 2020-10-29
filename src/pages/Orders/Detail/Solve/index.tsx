import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Container } from './styles';
import { useModal } from '../../../../hooks/modal';
import { useToast } from '../../../../hooks/toast';
import api from '../../../../services/api';
import getValidationErrors from '../../../../utils/getValidationErrors';
import InputTextArea from '../../../../components/InputTextarea';

interface ISolveProps {
  id: string;
  handleRedirect: () => void;
}

interface IFormData {
  resolution: string;
}

const ISolvedProps: React.FC<ISolveProps> = ({ id, handleRedirect }) => {
  const formRef = useRef<FormHandles>(null);
  const { closeModal } = useModal();
  const { addToast } = useToast();

  const handleSubmit: SubmitHandler<IFormData> = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          resolution: Yup.string().required('Uma solução é obrigatoria'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put(`/orders/${id}`, { ...data, status: 'FECHADO' });
        addToast({
          type: 'success',
          title: 'Solução cadastrada!',
          description: 'Uma solução foi registrada com sucesso!',
        });
        handleRedirect();
        closeModal();
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
            'Ocorreu um erro ao solucionar este serviço, tente novamente mais tarde.',
        });
      }
    },
    [addToast, id, closeModal, handleRedirect],
  );

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <InputTextArea label="Solução" name="resolution" />

        <button type="submit">Cadastrar</button>
      </Form>
    </Container>
  );
};

export default ISolvedProps;
