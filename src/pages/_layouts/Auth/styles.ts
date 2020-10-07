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
      font-size: 1.5rem;
      color: #fff;
    }
    padding: 30px;
    background: #36393f;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    button {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem;
      border: none;
      background: #3498db;
      color: #fff;
      height: 40px;
      padding: 0 10px;
      border-radius: 3px;
      text-transform: uppercase;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.1, '#3498db')};
      }
      svg {
        margin-right: 0.3rem;
      }
    }
  }
`;
