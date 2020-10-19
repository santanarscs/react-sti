import React, { useRef, useEffect, useState, useCallback } from 'react';
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
import IBoard from '../../../interfaces/IBoard';
import Upload from '../../../components/Upload';

interface IFormData {
  id: string;
  name: string;
  email: string;
  password: string;
  specialty_id: string;
  board_id: string;
  graduation_id: string;
  section_id: string;
  saram: string;
  full_name: string;
  situation: string;
  phone: string;
  birthday: string;
  last_promotion: string;
  sequence: string;
  provider: boolean;
}

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
  const [boards, setBoards] = useState<IOptionValue[]>([]);
  const [sections, setSections] = useState<IOptionValue[]>([]);
  const [avatar, setAvatar] = useState<File>();

  const history = useHistory();
  const { addToast } = useToast();

  const submitFile = useCallback((file: File[]) => {
    setAvatar(file[0]);
  }, []);

  useEffect(() => {
    api.get<ISpecialty[]>('specialties').then((response) =>
      setSpecialties(
        response.data.map((item) => ({
          value: item.id,
          label: item.name,
        })),
      ),
    );
    api.get<IBoard[]>('boards').then((response) =>
      setBoards(
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
        board_id: Yup.string().required('Quadro é obrigatório'),
        graduation_id: Yup.string().required('Posto/graduação é obrigatório'),
        specialty_id: Yup.string().required('A especialidade é obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('O e-mail é obrigatório'),
        section_id: Yup.string().required('A seção é obrigatório'),
        situation: Yup.string().required('A situação é obrigatório'),
        phone: Yup.string().required('O ramal é obrigatório'),
        birthday: Yup.string()
          .required('A data de aniversário é obrigatório')
          .nullable(),
        last_promotion: Yup.string()
          .required('A data da última promoção é obrigatório')
          .nullable(),
        sequence: Yup.string().required('A antiguidade na turma é obrigatório'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      const formData = new FormData();

      formData.append('name', data.name);
      formData.append('board_id', data.board_id);
      formData.append('graduation_id', data.graduation_id);
      formData.append('specialty_id', data.specialty_id);
      formData.append('email', data.email);
      formData.append('section_id', data.section_id);
      formData.append('phone', data.phone);
      formData.append('birthday', data.birthday);
      formData.append('last_promotion', data.last_promotion);
      formData.append('sequence', data.sequence);
      formData.append('full_name', data.full_name);
      formData.append('saram', data.saram);
      formData.append('situation', data.situation);
      formData.append('password', '123456');
      formData.append('provider', 'true');

      if (avatar) {
        formData.append('avatar', avatar);
      }

      await api.post('users', formData);
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
            name="graduation_id"
            options={graduations}
          />
          <Select
            label="Quadro"
            placeholder="Quadro"
            name="board_id"
            options={boards}
          />
          <Select
            label="Especialidade"
            placeholder="Especialidade"
            name="specialty_id"
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
          <Input label="E-mail" placeholder="E-mail" name="email" />
        </Row>
        <Row>
          <Select
            label="Seção"
            placeholder="Seção"
            name="section_id"
            options={sections}
          />

          <Select
            label="Situação"
            placeholder="Situação"
            name="situation"
            options={[
              { value: 'Ativa', label: 'Ativa' },
              { value: 'Reserva', label: 'Reserva' },
              { value: '1', label: 'R1' },
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
        <Upload onUpload={submitFile} />
        <button type="submit">Cadastrar</button>
      </Form>
    </Container>
  );
};

export default Add;
