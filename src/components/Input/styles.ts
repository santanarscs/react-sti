import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 1rem;
  }
  margin-bottom: 1.5rem;
`;

interface IContainerInputProps {
  isFocused: boolean;
  isField: boolean;
  isErrored: boolean;
}
export const ContainerInput = styled.div<IContainerInputProps>`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: ${({ theme }) => theme.radii.default};
  border: 0.1rem solid rgba(0, 0, 0, 0.3);
  padding: 1rem 1.6rem;
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  & + div {
    margin-top: 0.8rem;
  }
  input {
    flex: 1;
    border: 0;
    background: transparent;
    color: ${({ theme }) => theme.colors.white};
    &::placeholder {
      color: ${({ theme }) => theme.colors.grey};
    }
  }
  svg {
    color: ${({ theme }) => theme.colors.grey};
    margin-right: 1rem;
  }
  ${({ isErrored, theme }) =>
    isErrored &&
    css`
      border-color: ${theme.colors.error};
      svg {
        color: ${theme.colors.error};
      }
    `}
  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      color: ${theme.colors.primary};
      border-color: ${theme.colors.primary};
      svg {
        color: ${theme.colors.primary};
      }
    `}
  ${({ theme, isField }) =>
    isField &&
    css`
      color: ${theme.colors.primary};
    `}
`;

export const Error = styled(Tooltip)`
  height: 2rem;
  margin-left: 1.6rem;
  svg {
    margin-right: 0;
  }
  span {
    background: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.white};
    &::before {
      border-color: ${({ theme }) => theme.colors.error} transparent;
    }
  }
`;
