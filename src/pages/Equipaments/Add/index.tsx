import React, { useRef, useEffect, useState, useCallback } from 'react';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import Input from '../../../components/Input';
import api from '../../../services/api';
import Select, { IOptionValue } from '../../../components/Select';
import getValidationErrors from '../../../utils/getValidationErrors';
import DatePicker from '../../../components/Datepicker';
import { useToast } from '../../../hooks/toast';
import { Container } from './styles';

interface IFormData {
  description: string;
  bpm: string;
  service_tag: string;
  movimentation: {
    date: Date;
    section_id: string;
    user_id: string;
  };
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

const Add: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [sections, setSections] = useState<IOptionValue[]>([]);
  const [users, setUsers] = useState<IOptionValue[]>([]);
  const history = useHistory();
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
          description: Yup.string().required('Descrição é obrigatório'),
          bpm: Yup.string().required('BPM é obrigatório'),
          service_tag: Yup.string().required('Service Tag é obrigatório'),
          date: Yup.string().required('Data é obrigatório').nullable(),
          section_id: Yup.string().required('Seção é obrigatório'),
          user_id: Yup.string(),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        const { description, bpm, service_tag, ...rest } = data;
        const { data: equipament } = await api.post('equipaments', {
          description,
          bpm,
          service_tag,
        });
        await api.post('movimentations', {
          ...rest,
          equipament_id: equipament.id,
        });
        addToast({
          type: 'success',
          title: 'Equipamento cadastrado!',
          description: 'Um novo equipamento foi cadastrado com sucesso!',
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
            'Ocorreu um erro ao tentar criar um novo equipamento, tente novamente mais tarde.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <h1>Novo equipamento</h1>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input label="Descrição" placeholder="Descrição" name="description" />
        <Input label="BPM" placeholder="BPM" name="bpm" />
        <Input
          label="Service Tag"
          placeholder="Service Tag"
          name="service_tag"
        />
        {/* <div style={{ paddingTop: '4rem' }}> */}
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
        {/* </div> */}

        <button type="submit">Cadastrar</button>
      </Form>
    </Container>
  );
};

export default Add;
