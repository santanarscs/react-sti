import React, { useRef, useEffect, InputHTMLAttributes } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

interface IProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
}

const InputTextArea: React.FC<IProps> = ({ name, label, ...rest }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { fieldName, registerField, defaultValue = '', error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [registerField, fieldName]);

  return (
    <Container>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <textarea ref={inputRef} defaultValue={defaultValue} {...rest} />
      {error && <span>{`* ${error}`}</span>}
    </Container>
  );
};

export default InputTextArea;
