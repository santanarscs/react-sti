import React, { useCallback, useRef, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Container } from './styles';
import { useModal } from '../../../../hooks/modal';
import { useToast } from '../../../../hooks/toast';
import Select, { IOptionValue } from '../../../../components/Select';
import api from '../../../../services/api';
import getValidationErrors from '../../../../utils/getValidationErrors';
import DatePicker from '../../../../components/Datepicker';

interface IMovimentationProps {
  id: string;
  handleLoadMovimentations: () => void;
}

interface IFormData {
  date: Date;
  section_id: string;
  user_id: string;
}

interface ISection {
  id: string;
  name: string;
  description: string;
}
interface IUser {
  id: string;
  name: string;
  graduation: {
    name: string;
  };
}

const Movimentation: React.FC<IMovimentationProps> = ({
  id,
  handleLoadMovimentations,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [sections, setSections] = useState<IOptionValue[]>([]);
  const [users, setUsers] = useState<IOptionValue[]>([]);
  const { closeModal } = useModal();
  const { addToast } = useToast();

  useEffect(() => {
    api.get<ISection[]>('sections').then((response) =>
      setSections(
        response.data.map((item) => ({
          value: item.id,
          label: item.name,
        })),
      ),
    );
    api.get<IUser[]>('users').then((response) =>
      setUsers(
        response.data.map((item) => ({
          value: item.id,
          label: `${item.graduation.name} ${item.name}`,
        })),
      ),
    );
  }, []);

  const handleSubmit: SubmitHandler<IFormData> = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          date: Yup.string().required('Data é obrigatório'),
          section_id: Yup.string().required('Seção é obrigatório'),
          user_id: Yup.string(),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        const movimentation = {
          ...data,
          equipament_id: id,
        };
        await api.post('movimentations', movimentation);
        addToast({
          type: 'success',
          title: 'Movimentação cadastrada!',
          description: 'Uma nova movimentação foi registrada com sucesso!',
        });
        handleLoadMovimentations();
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
            'Ocorreu um erro ao tentar criar um novo equipamento, tente novamente mais tarde.',
        });
      }
    },
    [addToast, id, closeModal, handleLoadMovimentations],
  );

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <DatePicker
          label="Data da movimentação"
          placeholder="Data da movimentação"
          name="date"
        />
        <Select
          label="Seção"
          placeholder="Seção"
          name="section_id"
          options={sections}
        />
        <Select
          label="Usuário"
          placeholder="Usuário"
          name="user_id"
          options={users}
        />

        <button type="submit">Cadastrar</button>
      </Form>
    </Container>
  );
};

export default Movimentation;
