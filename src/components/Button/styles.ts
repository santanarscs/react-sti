import styled from 'styled-components';
import { darken } from 'polished';

interface IContainerProps {
  isLoading: number;
}

export const Container = styled.button<IContainerProps>`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  height: 5rem;
  border-radius: ${({ theme }) => theme.radii.default};
  text-transform: uppercase;

  transition: background 0.2s;
  letter-spacing: 0.2rem;

  &:hover {
    background: ${({ theme }) => darken(0.1, theme.colors.primary)};
  }
  svg {
    margin-right: 0.3rem;
  }
  cursor: ${({ isLoading }) => (isLoading ? 'not-allowed' : 'pointer')};
`;
