import React, { SelectHTMLAttributes } from 'react';
import { Container } from './styles';

interface IOptionValue {
  value: string | number;
  label: string;
}

interface IInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  options: IOptionValue[];
}

const Select: React.FC<IInputProps> = ({ label, name, options, ...rest }) => {
  return (
    <Container>
      {label && <label htmlFor={name}>{label}</label>}
      <select name={name} {...rest}>
        <option value="null">Selecione...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Container>
  );
};
export default Select;
