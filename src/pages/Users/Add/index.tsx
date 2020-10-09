import React, { useRef, useEffect, useState } from 'react';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import Input from '../../../components/Input';
import { Container, Row } from './styles';
import api from '../../../services/api';
import Select, { IOptionValue } from '../../../components/Select';
import getValidationErrors from '../../../utils/getValidationErrors';
import DatePicker from '../../../components/Datepicker';
import { useToast } from '../../../hooks/toast';
import IUser from '../../../interfaces/IUser';

type IFormData = Omit<IUser, 'id'>;

interface ISpecialty {
  id: string;
  name: string;
  description: string;
}
interface IGraduations {
  id: string;
  name: string;
  description: string;
}

const Add: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [specialties, setSpecialties] = useState<IOptionValue[]>([]);
  const [graduations, setGraduations] = useState<IOptionValue[]>([]);
  const [sections, setSections] = useState<IOptionValue[]>([]);

  const history = useHistory();
  const { addToast } = useToast();

  useEffect(() => {
    api.get<ISpecialty[]>('specialties').then((response) =>
      setSpecialties(
        response.data.map((item) => ({
          value: item.id,
          label: item.name,
        })),
      ),
    );
    api.get<IGraduations[]>('graduations').then((response) =>
      setGraduations(
        response.data.map((item) => ({
          value: item.id,
          label: item.name,
        })),
      ),
    );
    api.get<ISpecialty[]>('sections').then((response) =>
      setSections(
        response.data.map((item) => ({
          value: item.id,
          label: item.name,
        })),
      ),
    );
  }, []);

  const handleSubmit: SubmitHandler<IFormData> = async (data) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome de guerra é obrigatório'),
        full_name: Yup.string().required('O nome completo é obrigatório'),
        graduation: Yup.string().required('Posto/ graduação é obrigatório'),
        specialty: Yup.string().required('A especialidade é obrigatório'),
        mail: Yup.string()
          .email('Digite um e-mail válido')
          .required('O e-mail é obrigatório'),
        section: Yup.string().required('A seção é obrigatório'),
        situation: Yup.string().required('A situação é obrigatório'),
        phone: Yup.string().required('O ramal é obrigatório'),
        birthday: Yup.string().required('A data de aniversário é obrigatório'),
        last_promotion: Yup.string().required(
          'A data da última promoção é obrigatório',
        ),
        sequence: Yup.string().required('A antiguidade na turma é obrigatório'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      await api.post('users', data);
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
    <Container>
      <h1>Novo usuário</h1>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Row>
          <Select
            label="Posto/Graduação"
            placeholder="Posto ou graduação"
            name="graduation"
            options={graduations}
          />
          <Select
            label="Especialidade"
            placeholder="Especialidade"
            name="specialty"
            options={specialties}
          />
          <Input
            label="Nome de guerra"
            placeholder="Nome de guerra"
            name="name"
          />
          <Input label="Saram" placeholder="Saram" name="saram" />
        </Row>
        <Row>
          <Input
            label="Nome completo"
            placeholder="Nome completo"
            name="full_name"
          />
          <Input label="E-mail" placeholder="E-mail" name="mail" />
        </Row>
        <Row>
          <Select
            label="Seção"
            placeholder="Seção"
            name="section"
            options={sections}
          />

          <Select
            label="Situação"
            placeholder="Situação"
            name="situation"
            options={[
              { value: 1, label: 'Ativa' },
              { value: 1, label: 'Reserva' },
              { value: 1, label: 'R1' },
            ]}
          />
          <Input label="Ramal" placeholder="Ramal" name="phone" />
        </Row>
        <Row>
          <DatePicker
            label="Data de nascimento"
            placeholder="Data de nascimento"
            name="birthday"
          />
          <DatePicker
            label="Data da última promoção"
            placeholder="Data da última promoção"
            name="last_promotion"
          />
          <Input
            label="Antiguidade na turma"
            placeholder="Antiguidade na turma"
            name="sequence"
          />
        </Row>
        <button type="submit">Cadastrar</button>
      </Form>
    </Container>
  );
};

export default Add;
