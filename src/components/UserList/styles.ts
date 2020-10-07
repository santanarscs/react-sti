import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    thead th {
      font-size: 0.75rem;
      color: #b3b3b3;
      letter-spacing: 1.11px;
      font-weight: normal;
      text-align: left;
      text-transform: uppercase;
      padding: 5px 10px;
    }

    button {
      border: 0;
      border-radius: 3px;
      padding: 5px;
      font-size: 0.75rem;
      background: #bdc3c7;
      color: #333;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.1, '#bdc3c7')};
      }
    }
  }
  overflow-x: auto; /* Horizontal */
`;

export const Item = styled.tr`
  td {
    border-top: 1px solid #282828;
    font-size: 13px;
    padding: 10px;
    background: transparent;
    color: #fff;
  }
  &:hover td {
    opacity: 0.8;
  }
`;

export const RowButtons = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 70px;
  button {
    border: 0;
    border-radius: 3px;
    margin-left: 5px;
    padding: 5px;
    font-size: 0.75rem;
    background: #bdc3c7;
    color: #333;
    transition: background 0.2s;
    &:hover {
      background: ${darken(0.1, `#bdc3c7`)};
    }
  }
  button + button {
    color: #fff;
    background-color: #e74c3c;
    &:hover {
      background: ${darken(0.1, `#e74c3c`)};
    }
  }
`;
