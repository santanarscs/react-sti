import styled, { css } from 'styled-components';
import { FiX } from 'react-icons/fi';

interface IContainerProps {
  isField: boolean;
  isErrored: boolean;
  isDisabled: boolean;
}

export const Container = styled.div<IContainerProps>`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: ${({ theme }) => theme.radii.default};
  border: 0.1rem solid rgba(0, 0, 0, 0.3);
  padding: 1rem 1.6rem;
  color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  display: flex;
  align-items: center;
  & + div {
    margin-top: 0.8rem;
  }
  ${(props) =>
    props.isErrored &&
    css`
      color: ${props.theme.colors.error};
    `}
  ${(props) =>
    props.isField &&
    css`
      color: ${props.theme.colors.secondary};
    `}
  cursor: ${(props) => (props.isDisabled ? 'not-allowed' : 'default')};
  &:focus-within {
    color: ${({ theme }) => theme.colors.secondary};
  }
  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: ${({ theme }) => theme.colors.white};
    &::placeholder {
      color: ${({ theme }) => theme.colors.grey};
    }
    &:disabled {
      cursor: not-allowed;
    }
    margin: 0 1.6rem;
  }
`;

export const ClearIcon = styled(FiX)`
  color: ${({ theme }) => theme.colors.error};
  height: 2rem;
  width: 2rem;
  cursor: pointer;
`;
