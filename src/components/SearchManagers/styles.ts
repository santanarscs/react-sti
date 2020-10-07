import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem;
      border: none;
      background: #e67e22;
      color: #fff;
      height: 40px;
      padding: 0 10px;
      border-radius: 3px;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.1, '#e67e22')};
      }
      & + button {
        background: #3498db;
        &:hover {
          background: ${darken(0.1, '#3498db')};
        }
      }
    }
  }
  @media (max-width: 700px) {
    > div {
      flex-direction: column;
      button {
        margin-top: 1rem;
      }
    }
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  div {
    flex: 1;
  }
  div + div {
    margin-left: 10px;
  }
  @media (max-width: 700px) {
    margin-top: 0;
    div {
      margin-bottom: 1rem;
    }
    div + div {
      margin-left: 0;
    }
  }
`;
