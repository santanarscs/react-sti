import React, { useRef, useCallback } from 'react';
import { FormHelpers, FormHandles } from '@unform/core';
import { FiSearch, FiPlus } from 'react-icons/fi';
import InputSearch from '../InputSearch';
import { Container, Form, SearchButton, ContainerLink } from './styles';

interface ISearchFormData {
  term: string;
}

interface IHeaderProps {
  onSubmit(data: ISearchFormData, options?: FormHelpers): void;
  disabled?: boolean;
  initialName?: string | null;
  createPage: string;
  title: string;
  placeholder?: string;
}

const Header: React.FC<IHeaderProps> = ({
  initialName,
  onSubmit,
  disabled = false,
  createPage,
  title,
  placeholder,
}) => {
  const formRef = useRef<FormHandles>(null);
  const clearValue = useCallback(() => {
    formRef.current?.reset();
    onSubmit({ term: '' });
  }, [onSubmit]);
  return (
    <Container>
      <Form
        ref={formRef}
        initialData={{ term: initialName }}
        onSubmit={onSubmit}
      >
        <InputSearch
          placeholder={placeholder}
          name="term"
          disabled={disabled}
          clearValue={clearValue}
        />
        <SearchButton type="submit">
          <FiSearch size={24} />
        </SearchButton>
      </Form>
      <ContainerLink to={createPage}>
        <FiPlus size={24} />
        CADASTRAR
      </ContainerLink>
      <h1>{title}</h1>
    </Container>
  );
};

export default Header;
