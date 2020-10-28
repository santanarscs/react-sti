import React, {
  InputHTMLAttributes,
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import { Container, ContainerInput } from './styles';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  containerStyle?: object;
}

const Input: React.FC<IInputProps> = ({
  name,
  icon: Icon,
  label,
  containerStyle = {},
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isField, setIsField] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  const hanlderInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsField(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <ContainerInput
        style={containerStyle}
        // isErrored={!!error}
        isFocused={isFocused}
        isField={isField}
      >
        {Icon && <Icon size={20} />}
        <input
          onFocus={handleInputFocus}
          onBlur={hanlderInputBlur}
          defaultValue={defaultValue}
          ref={inputRef}
          {...rest}
        />
      </ContainerInput>
      {error && <span>{`* ${error}`}</span>}
    </Container>
  );
};

export default Input;
