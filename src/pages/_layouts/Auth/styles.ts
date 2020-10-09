import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  form {
    h1 {
      font-size: 3rem;
    }
    padding: 3rem;
    background: #323846;
    border-radius: ${({ theme }) => theme.radii.default};
    display: flex;
    flex-direction: column;
    button {
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
      font-weight: bold;
      &:hover {
        background: ${({ theme }) => darken(0.1, theme.colors.primary)};
      }
      svg {
        margin-right: 0.3rem;
      }
    }
  }
`;
