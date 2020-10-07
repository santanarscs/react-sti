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
      color: ${({ theme }) => theme.colors.darkGrey};
    }
    padding: 3rem;
    background: ${({ theme }) => theme.colors.lightGrey};
    border-radius: 0.3px;
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
      color: ${({ theme }) => theme.colors.darkGrey};
      height: 4rem;
      padding: 0 1rem;
      border-radius: 0.3rem;
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
