import React, { useRef } from 'react';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { Container } from './styles';
import Input from '../../../components/Input';

interface IFormData {
  nome: string;
  nome_completo: string;
}

const Add: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const handleSubmit: SubmitHandler<IFormData> = (data) => {
    console.log(formRef);
  };
  return (
    <Container>
      <h1>Novo usuário</h1>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          label="Nome de guerra"
          placeholder="Nome de guerra"
          name="nome"
        />
        <Input
          label="Nome completo"
          placeholder="Nome completo"
          name="nome_completo"
        />
        <button type="submit">Cadastrar</button>
      </Form>
    </Container>
  );
};

export default Add;
