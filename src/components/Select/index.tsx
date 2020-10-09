import React, { useRef, useEffect } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
  StylesConfig,
  Theme,
} from 'react-select';
import { useField } from '@unform/core';
import { Container } from './styles';

export interface IOptionValue {
  value: string;
  label: string;
}

interface IProps extends SelectProps<OptionTypeBase> {
  name: string;
  label: string;
}

const SelectInput: React.FC<IProps> = ({ name, label, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  const colourStyles: StylesConfig = {
    control: (styles) => ({
      ...styles,
      borderRadius: 8,
      borderColor: '#1F232C',
      fontSize: 16,
      height: 45,
    }),
    option: (styels) => ({
      ...styels,
      color: '#F4EDE8',
    }),
  };

  const themeProps = (theme: Theme): Theme => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary: '#386ae8',
        neutral0: '#2C323E',
        primary25: '#666360',
        primary50: '#999591',
        neutral80: '#F4EDE8',
        neutral30: '#386ae8',
      },
    };
  };

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: IOptionValue) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
      setValue: (ref: ReactSelect, value: IOptionValue) => {
        ref.select.selectOption(value);
      },
      clearValue: (ref: ReactSelect) => {
        ref.select.clearValue();
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container>
      <label htmlFor={name}>{label}</label>
      <ReactSelect
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        styles={colourStyles}
        theme={themeProps}
        maxMenuHeight={250}
        {...rest}
      />
    </Container>
  );
};

export default SelectInput;
