import styled from 'styled-components';
import { Form as UForm } from '@unform/web';
import { shade } from 'polished';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3.2rem;
  h1 {
    font-weight: normal;
    margin-left: auto;
  }
`;

export const Form = styled(UForm)`
  display: flex;
  max-width: 41.5rem;
  width: 100%;
`;

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0 1.6rem;
  margin-left: 1.6rem;
  border-radius: ${({ theme }) => theme.radii.default};
  background: ${({ theme }) => theme.colors.primary};
  transition: ${({ theme }) => theme.transition.default};
  color: ${({ theme }) => theme.colors.white};
  &:hover {
    background: ${({ theme }) => shade(0.2, theme.colors.primary)};
  }
  &:disabled {
    cursor: not-allowed;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

export const ContainerLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4.5rem;
  margin-left: 1.6rem;
  font-weight: 500;
  border: none;
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 0 1.6rem;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  transition: ${({ theme }) => theme.transition.default};
  &:hover {
    background: ${({ theme }) => shade(0.1, theme.colors.primary)};
  }
  svg {
    margin-right: 0.8rem;
  }
`;
