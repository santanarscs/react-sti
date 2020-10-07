import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    margin-bottom: 20px;
  }
  input[type='text'] {
    margin-bottom: 5px;
    width: 100%;
  }
  form {
    button {
      height: 40px;
      border: none;
      border-radius: 3px;
      background: #3498db;
      color: #fff;
      font-size: 1rem;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.1, '#3498db')};
      }
    }
    > div {
      display: flex;
      flex-direction: column;
      label {
        font-size: 1rem;
      }
      input {
        height: 40px;
        padding: 10px;
        border-radius: 3px;
        border: 1px solid rgba(0, 0, 0, 0.3);
        background-color: rgba(0, 0, 0, 0.1);
        color: #f6f6f6;
        margin-top: 8px;
        transition: border 0.15s ease;
        &:focus {
          border-color: #7289da;
        }
      }
    }
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > button {
    border: none;
    background: transparent;
    padding: 10px;
    border-radius: 5px;
  }
`;
